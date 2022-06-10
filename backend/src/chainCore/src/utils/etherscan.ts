import { stringify } from 'qs'
import axios from 'axios';
export interface EtherscanAPIResponse {
  message: 'NOTOK' | 'OK'
  result: any
  status: '1' | '0'
}

interface Input {
  readonly name: string
  readonly type: string
  readonly indexed?: boolean
}

interface Output {
  readonly name: string
  readonly type: string
}

export interface Tuple extends Output {
  readonly type: 'tuple'
  readonly components: ReadonlyArray<Output>
}

interface ContractMember {
  readonly constant?: boolean
  readonly inputs?: ReadonlyArray<Input>
  readonly name?: string
  readonly outputs?: ReadonlyArray<Output | Tuple>
  readonly type: string
  readonly payable?: boolean
  readonly stateMutability?: string
  readonly anonymous?: boolean
}

export type ContractABI = ReadonlyArray<ContractMember>
export enum EtherscanApiAction {
  AccountBalance = 'account_balance',
  AccountBalancemulti = 'account_balancemulti',
  AccountTxlist = 'account_txlist',
  AccountTxlistinternal = 'account_txlistinternal',
  AccountTokentx = 'account_tokentx',
  AccountGetminedblocks = 'account_getminedblocks',
  ContractGetAbi = 'contract_getabi',
  TransactionGetstatus = 'transaction_getstatus',
  TransactionGettxreceiptstatus = 'transaction_gettxreceiptstatus',
  BlockGetblockreward = 'block_getblockreward',
  LogsGetLogs = 'logs_getLogs',
  StatsEthsupply = 'stats_ethsupply',
  StatsEthprice = 'stats_ethprice',
}

/**
 * This is the default export of the library, a client that can be constructed for interacting with the
 * Etherscan API.
 */
export default class EtherscanClient {
  private readonly apiUrl: string
  private readonly apiKey?: string
  private readonly debug?: boolean
  private readonly maxRequestsPerSecond: number
  private lastRequestTime: number | null = null

  public constructor(
    apiUrl: string,
    opts?: Partial<{ apiKey: string; maxRequestsPerSecond: number, debug:boolean }>
  ) {
    this.apiUrl = apiUrl
    this.apiKey = opts && opts.apiKey
    this.maxRequestsPerSecond = (opts && opts.maxRequestsPerSecond) || 5
    this.debug = this.debug;
  }

  public async getAbi(address: string): Promise<ContractABI | null> {
    const etherscanResponse = await this.call(
      EtherscanApiAction.ContractGetAbi,
      {
        address,
      }
    )

    // Etherscan gives us 'NOTOK' and '0' if the ABI is not found
    if (
      etherscanResponse.message === 'NOTOK' &&
      etherscanResponse.status === '0' &&
      etherscanResponse.result === ''
    ) {
      return null
    }

    let abi: ContractABI
    try {
      abi = JSON.parse(etherscanResponse.result)
    } catch (err) {
      throw new Error(
        `failed to parse the ABI json for address ${address}: ${err.message}`
      )
    }
    return abi
  }

  public async call(
    actionEnum: EtherscanApiAction,
    params: { [key: string]: string | number | boolean | undefined } = {}
  ): Promise<EtherscanAPIResponse> {
    await this.throttle()
    const [module, action] = actionEnum.split('_')
    const fullApi =  `${this.apiUrl}?${stringify({
      ...params,
      action,
      apikey: this.apiKey,
      module,
    })}`
    this.debug && console.debug(`request api debug：`, fullApi)
    const response = await axios.get(fullApi, {
      timeout: 1000 * 30
    })
    // 403 responses are not usually expected
    if (response.status !== 200) {
      throw new Error(`response status was not 200: ${response.status}`)
    }
    const responseJson = await response.data
    if (responseJson.message.includes('transactions found') || responseJson.message.includes('No token transfers found')) {
      responseJson.status = '1'
      responseJson.result = []
    }
    return responseJson
  }

  private async throttle(): Promise<void> {
    const now = Date.now()

    if (this.lastRequestTime === null) {
      this.lastRequestTime = now
      return
    }

    const sleepMs = 1000 / this.maxRequestsPerSecond
    const executionTime = this.lastRequestTime + sleepMs

    if (executionTime <= now) {
      this.lastRequestTime = now
      return
    }

    this.lastRequestTime = executionTime

    return new Promise<void>((resolve) => {
      setTimeout(() => resolve(), executionTime - now)
    })
  }
}
