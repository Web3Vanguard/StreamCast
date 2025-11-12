const { SDK, SchemaEncoder, zeroBytes32 } = require("@somnia-chain/streams")
const { createPublicClient, http, createWalletClient, toHex } = require("viem")
const { privateKeyToAccount } = require("viem/accounts")
const { waitForTransactionReceipt } = require("viem/actions")
const { dreamChain } = require("./dream-chain")
require("dotenv").config()

async function main() {
  const publicClient = createPublicClient({ chain: dreamChain, transport: http() })
  const walletClient = createWalletClient({
    account: privateKeyToAccount(process.env.PRIVATE_KEY),
    chain: dreamChain,
    transport: http(),
  })

  const sdk = new SDK({ public: publicClient, wallet: walletClient })

  // 1️⃣ Define schema
  const somniaPathSchema = `string player, string sessionId, uint256 timeFrame, uint256 gameScore`
  const schemaId = await sdk.streams.computeSchemaId(somniaPathSchema)
  console.log("Schema ID:", schemaId)

  // 2️⃣ Safer schema registration
  const ignoreAlreadyRegistered = false

  try {
    const txHash = await sdk.streams.registerDataSchemas(
      [
        {
          id: 'somniaPath',
          schema: somniaPathSchema,
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
  const encoder = new SchemaEncoder(somniaPathSchema)
  let count = 0

  setInterval(async () => {
    count++
    const data = encoder.encodeData([
      { name: 'player', value: `suleiman7`, type: 'string' },
      { name: 'sessionId', value: BigInt(Math.floor(Date.now() * 7)), type: 'string' },
      { name: 'timeFrame', value: BigInt(Math.floor(Date.now() + 3)), type: 'uint256' },
      { name: 'gameScore', value: BigInt(7), type: 'uint256' },
    ])

    const dataStreams = [{ id: toHex(`somniaPath-${count}`, { size: 32 }), schemaId, data }]
    const tx = await sdk.streams.set(dataStreams)
    console.log(`✅ Published: somniaPath game session details #${count} (Tx: ${tx})`)
  }, 3000)
}

main()
