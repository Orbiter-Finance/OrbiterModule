import EVMWatchBase from './evm.watch'
export default class PolygonWatch extends EVMWatchBase {
    readonly minConfirmations: number = 3
}
