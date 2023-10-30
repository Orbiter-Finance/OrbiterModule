if (!process.env["MAKER_FILE"]) {
  console.error('Missing maker file configuration')
  process.exit(1);
}
const makers = require(`./${process.env["MAKER_FILE"]}`)
export const makerList = makers as any;
export const makerListHistory = []
