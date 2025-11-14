import { SDK, SchemaEncoder, zeroBytes32 } from "@somnia-chain/streams";
import { createPublicClient, http, keccak256, stringToHex, type Address } from "viem";
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
// This is optional - if schema is already registered, we continue
export async function registerEventSchema(sdk: SDK) {
  const schemaId = await sdk.streams.computeSchemaId(createEventSchema);
  
  try {
    // Try with ignoreAlreadyRegistered = true to avoid errors if already registered
    const txHash = await sdk.streams.registerDataSchemas(
      [
        {
          id: "createEventSchema",
          schema: createEventSchema,
          parentSchemaId: zeroBytes32,
        },
      ],
      true // ignoreAlreadyRegistered = true
    );

    if (txHash) {
      return { schemaId, txHash };
    }
    return { schemaId, txHash: null };
  } catch (err: any) {
    // If registration fails for any reason, log it but don't throw
    // The schema might already be registered or there might be a network issue
    console.warn("Schema registration failed (might already be registered):", err);
    return { schemaId, txHash: null };
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

  // Generate unique stream ID by hashing the creator address, title, and end time
  // This ensures a deterministic 32-byte ID
  const uniqueString = `streamcast-${params.creatorAddress}-${params.eventTitle}-${params.endTime}`;
  const streamId = keccak256(stringToHex(uniqueString)) as `0x${string}`;

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

