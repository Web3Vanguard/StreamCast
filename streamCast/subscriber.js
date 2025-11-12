const { SDK, SchemaEncoder } = require("@somnia-chain/streams");
const { createPublicClient, http } = require("viem");
const { dreamChain } = require("./dream-chain");
require('dotenv').config();

async function main() {
  const publisherWallet = process.env.PUBLIC_KEY;
  const publicClient = createPublicClient({ chain: dreamChain, transport: http() });
  const sdk = new SDK({ public: publicClient });

  const createEventSchema = `address creatorAddress, string eventTitle, string eventDescription, string eventStatus, string eventWinner, string[] eventOptions`;
  const schemaId = await sdk.streams.computeSchemaId(createEventSchema);

  const schemaEncoder = new SchemaEncoder(createEventSchema);
  const seen = new Set();

  setInterval(async () => {
    const allData = await sdk.streams.getAllPublisherDataForSchema(schemaId, publisherWallet);
    for (const dataItem of allData) {
      let creatorAddress = "", eventTitle = "", eventDescription = "", eventStatus = "", eventWinner = "", eventOptions = "";
      for (const field of dataItem) {
        const val = field.value?.value ?? field.value;
        if (field.name === "creatorAddress") creatorAddress = val.toString();
        if (field.name === "eventTitle") eventTitle = val;
        if (field.name === "eventDescription") eventDescription = val;
        if (field.name === "eventStatus") eventStatus = val;
        if (field.name === "eventWinner") eventWinner = val;
        if (field.name === "eventOptions") eventOptions = val;
      }

      const id = `${creatorAddress}-${eventTitle}${Date.now()}`;
      if (!seen.has(id)) {
        seen.add(id);
        console.log(`🆕 ${creatorAddress} created prediction event named ${eventTitle} with options ${eventOptions}`);
      }
    }
  }, 3000);
}

main();