import { sendStarknetTx } from './src/service/starknet/send'
function test() {
  sendStarknetTx(
    'goerli-alpha',
    '122260880352299898228917090461822350263699440923649776301664096165207397048',
    {
      from: '0x03b6da1627bf56996a2cc03934b9fbe94f43a36bc14d97be3cf7ef916e14fe9d',
      to: '0x05259a5ee4726e0a199326d1d709fb13ac57f486ba097cd0ee6d8f26798601c1',
      amount: '0.000001',
      tokenAddress: '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7'
    },
    '0x0457bf9a97e854007039c43a6cc1a81464bd2a4b907594dabc9132c162563eb3',// tokenAddress
    '0x0000000000'
  )
}
test()
// 1930776163786754
