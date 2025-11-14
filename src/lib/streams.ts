import { SDK, SchemaEncoder, zeroBytes32 } from "@somnia-chain/streams";
import { createPublicClient, http, toHex, type Address } from "viem";
import { somniaTestnet } from "./chains";
import type { WalletClient } from "viem";

// Event creation schema
export const createEventSchema = `address creatorAddress, string eventTitle, string eventDescription, string eventStatus, string eventWinner, string[] eventOptions, string currency, uint256 endTime`;

// Get SDK instance with wallet client
export function getStreamsSDK(walletClient?: WalletClient) {
  const publicClient = createPublicClient({
    chain: somniaTestnet,
    transport: http(),
  });

  if (walletClient) {
    return new SDK({ public: publicClient, wallet: walletClient });
  }

  return new SDK({ public: publicClient });
}

// Register event creation schema
export async function registerEventSchema(sdk: SDK) {
  const schemaId = await sdk.streams.computeSchemaId(createEventSchema);
  
  try {
    const txHash = await sdk.streams.registerDataSchemas(
      [
        {
          id: "createEventSchema",
          schema: createEventSchema,
          parentSchemaId: zeroBytes32,
        },
      ],
      false // ignoreAlreadyRegistered
    );

    if (txHash) {
      return { schemaId, txHash };
    }
    return { schemaId, txHash: null };
  } catch (err: any) {
    if (String(err).includes("SchemaAlreadyRegistered")) {
      return { schemaId, txHash: null };
    }
    throw err;
  }
}

// Create a new prediction event
export async function createEvent(
  sdk: SDK,
  params: {
    creatorAddress: Address;
    eventTitle: string;
    eventDescription: string;
    currency: "USDC" | "USDT";
    endTime: bigint;
  }
) {
  const schemaId = await sdk.streams.computeSchemaId(createEventSchema);
  const encoder = new SchemaEncoder(createEventSchema);

  const data = encoder.encodeData([
    { name: "creatorAddress", value: params.creatorAddress, type: "address" },
    { name: "eventTitle", value: params.eventTitle, type: "string" },
    { name: "eventDescription", value: params.eventDescription, type: "string" },
    { name: "eventStatus", value: "active", type: "string" },
    { name: "eventWinner", value: "", type: "string" },
    { name: "eventOptions", value: ["yes", "no"], type: "string[]" },
    { name: "currency", value: params.currency, type: "string" },
    { name: "endTime", value: params.endTime, type: "uint256" },
  ]);

  // Generate unique stream ID
  const streamId = toHex(
    `streamcast-${params.creatorAddress}-${Date.now()}`,
    { size: 32 }
  );

  const dataStreams = [{ id: streamId, schemaId, data }];
  const txHash = await sdk.streams.set(dataStreams);

  return { streamId, txHash };
}

// Fetch all events for a schema
export async function getAllEvents(sdk: SDK, publisherAddress?: Address) {
  const schemaId = await sdk.streams.computeSchemaId(createEventSchema);
  
  if (publisherAddress) {
    return await sdk.streams.getAllPublisherDataForSchema(schemaId, publisherAddress);
  }
  
  // Note: This might need to be adjusted based on SDK capabilities
  // For now, we'll fetch by publisher address
  return [];
}

