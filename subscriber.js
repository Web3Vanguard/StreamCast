const { SDK, SchemaEncoder } = require("@somnia-chain/streams");
const { createPublicClient, http } = require("viem");
const { dreamChain } = require("./dream-chain");
require('dotenv').config();

async function main() {
  const publisherWallet = process.env.PUBLIC_KEY;
  const publicClient = createPublicClient({ chain: dreamChain, transport: http() });
  const sdk = new SDK({ public: publicClient });

  const somniaPathSchema = `string player, string sessionId, uint256 timeFrame, uint256 gameScore`;
  const schemaId = await sdk.streams.computeSchemaId(somniaPathSchema);

  const schemaEncoder = new SchemaEncoder(somniaPathSchema);
  const seen = new Set();

  setInterval(async () => {
    const allData = await sdk.streams.getAllPublisherDataForSchema(schemaId, publisherWallet);
    for (const dataItem of allData) {
      let player = "", sessionId = "", timeFrame = "", gameScore = "";
      for (const field of dataItem) {
        const val = field.value?.value ?? field.value;
        if (field.name === "player") player = val;
        if (field.name === "sessionId") sessionId = val;
        if (field.name === "timeFrame") timeFrame = val.toString();
        if (field.name === "gameScore") gameScore = val.toString();
      }

      const id = `${player}-${sessionId}`;
      if (!seen.has(id)) {
        seen.add(id);
        console.log(`🆕 ${player} with session ${sessionId} at ${new Date(Number(timeFrame) * 1000).toLocaleTimeString()}`);
      }
    }
  }, 3000);
}

main();