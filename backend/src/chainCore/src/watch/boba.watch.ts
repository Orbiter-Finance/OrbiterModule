import EVMWatchBase from './evm.watch'
export default class BobaWatch extends EVMWatchBase {
    readonly minConfirmations: number = 1
}
