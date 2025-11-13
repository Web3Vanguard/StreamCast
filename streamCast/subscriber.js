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

async function streamCast() {
  const publisherWallet = process.env.PUBLIC_KEY;
  const publicClient = createPublicClient({ chain: dreamChain, transport: http() });
  const sdk = new SDK({ public: publicClient });

  const eventParticipationSchema = `address participantAddress, uint256 numberOfParticipant, string selectedOption`;
  const schemaId = await sdk.streams.computeSchemaId(eventParticipationSchema);

  const schemaEncoder = new SchemaEncoder(eventParticipationSchema);
  const seen = new Set();

  setInterval(async () => {
    const allData = await sdk.streams.getAllPublisherDataForSchema(schemaId, publisherWallet);
    for (const dataItem of allData) {
      let participantAddress = "", numberOfParticipant = "", selectedOption = "";
      for (const field of dataItem) {
        const val = field.value?.value ?? field.value;
        if (field.name === "participantAddress") participantAddress = val.toString();
        if (field.name === "numberOfParticipant") numberOfParticipant = val;
        if (field.name === "selectedOption") selectedOption = val;
      }

      const id = `${participantAddress}-${numberOfParticipant}${Date.now()}`;
      if (!seen.has(id)) {
        seen.add(id);
        console.log(`🆕 ${participantAddress} participated in a event with number participants ${numberOfParticipant} with selected options ${selectedOption}`);
      }
    }
  }, 3000);
}


// main();
streamCast();