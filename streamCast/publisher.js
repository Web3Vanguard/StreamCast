const { SDK, SchemaEncoder, zeroBytes32 } = require("@somnia-chain/streams")
const { createPublicClient, http, createWalletClient, toHex } = require("viem")
const { privateKeyToAccount } = require("viem/accounts")
const { waitForTransactionReceipt } = require("viem/actions")
const { dreamChain } = require("./dream-chain")
require("dotenv").config()

const playerWallet = process.env.PUBLIC_KEY;

async function main() {
  const publicClient = createPublicClient({ chain: dreamChain, transport: http() })
  const walletClient = createWalletClient({
    account: privateKeyToAccount(process.env.PRIVATE_KEY),
    chain: dreamChain,
    transport: http(),
  })

  const sdk = new SDK({ public: publicClient, wallet: walletClient })

  // 1️⃣ Define schema
  const createEventSchema = `address creatorAddress, string eventTitle, string eventDescription, string eventStatus, string eventWinner, string[] eventOptions`
  const schemaId = await sdk.streams.computeSchemaId(createEventSchema)
  console.log("Schema ID:", schemaId)

  // 2️⃣ Safer schema registration
  const ignoreAlreadyRegistered = false

  try {
    const txHash = await sdk.streams.registerDataSchemas(
      [
        {
          id: 'createEventSchema1',
          schema: createEventSchema,
          parentSchemaId: zeroBytes32
        },
      ],
      ignoreAlreadyRegistered
    )

    if (txHash) {
      await waitForTransactionReceipt(publicClient, { hash: txHash })
      console.log(`✅ Schema registered or confirmed, Tx: ${txHash}`)
    } else {
      console.log('ℹ️ Schema already registered — no action required.')
    }
  } catch (err) {
    // fallback: if the SDK doesn’t support the flag yet
    if (String(err).includes('SchemaAlreadyRegistered')) {
      console.log('⚠️ Schema already registered. Continuing...')
    } else {
      throw err
    }
  }

  // 3️⃣ Publish messages
  const encoder = new SchemaEncoder(createEventSchema)
  let count = 0

  setInterval(async () => {
    count++
    const data = encoder.encodeData([
      { name: 'creatorAddress', value: `${playerWallet}`, type: 'address' },
      { name: 'eventTitle', value: `Donald Trump will become president the second time`, type: 'string' },
      { name: 'eventDescription', value: `American Politics`, type: 'string' },
      { name: 'eventStatus', value: `active`, type: 'string' },
      { name: 'eventWinner', value: `true`, type: 'string' },
      { name: 'eventOptions', value: ['true', 'false'], type: 'string[]' },
    ])

    const dataStreams = [{ id: toHex(`streamCast-${count}`, { size: 32 }), schemaId, data }]
    const tx = await sdk.streams.set(dataStreams)
    console.log(`✅ Published: streamCast event prediction data #${count} (Tx: ${tx})`)
  }, 3000)
}

main()
