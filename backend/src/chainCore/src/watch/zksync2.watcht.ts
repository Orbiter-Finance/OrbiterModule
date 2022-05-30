import EVMWatchBase from './evm.watch'
export default class ZKSync2Watch extends EVMWatchBase {
    readonly minConfirmations: number = 3
}
