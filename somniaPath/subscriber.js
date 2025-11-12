const { SDK, SchemaEncoder } = require("@somnia-chain/streams");
const { createPublicClient, http } = require("viem");
const { dreamChain } = require("./dream-chain");
require('dotenv').config();

async function main() {
  const publisherWallet = process.env.PUBLIC_KEY;
  const publicClient = createPublicClient({ chain: dreamChain, transport: http() });
  const sdk = new SDK({ public: publicClient });

  const somniaPathSchema = `address playerAddress, uint256 levelCompleted, uint256 startTime, uint256 endTime`;
  const schemaId = await sdk.streams.computeSchemaId(somniaPathSchema);

  const schemaEncoder = new SchemaEncoder(somniaPathSchema);
  const seen = new Set();

  setInterval(async () => {
    const allData = await sdk.streams.getAllPublisherDataForSchema(schemaId, publisherWallet);
    for (const dataItem of allData) {
      let playerAddress = "", levelCompleted = "", startTime = "", endTime = "";
      for (const field of dataItem) {
        const val = field.value?.value ?? field.value;
        if (field.name === "playerAddress") playerAddress = val.toString();
        if (field.name === "levelCompleted") levelCompleted = val.toString();
        if (field.name === "startTime") startTime = val.toString();
        if (field.name === "endTime") endTime = val.toString();
      }

      const id = `${playerAddress}-${levelCompleted}`;
      if (!seen.has(id)) {
        seen.add(id);
        console.log(`🆕 ${playerAddress} completed level ${levelCompleted} at ${endTime - startTime}`);
      }
    }
  }, 3000);
}

main();