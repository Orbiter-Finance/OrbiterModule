import EVMWatchBase from './evm.watch'
export default class MetisWatch extends EVMWatchBase {
    readonly minConfirmations: number = 3
}
