import fetch from 'cross-fetch'
import { logger } from 'ethers'
import { stringify } from 'qs'

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
  private readonly maxRequestsPerSecond: number
  private lastRequestTime: number | null = null

  public constructor(
    apiUrl: string,
    opts?: Partial<{ apiKey: string; maxRequestsPerSecond: number }>
  ) {
    this.apiUrl = apiUrl
    this.apiKey = opts && opts.apiKey
    this.maxRequestsPerSecond = (opts && opts.maxRequestsPerSecond) || 5
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
    // const { error, value } = JoiContractABI.validate(abi, {
    //   allowUnknown: true,
    // })

    // if (error && error.details && error.details.length) {
    //   throw new Error(
    //     `ABI received from etherscan did not match expected schema for address ${address}: ${JSON.stringify(
    //       error.details
    //     )}`
    //   )
    // }

    // return value
  }

  public async call(
    actionEnum: EtherscanApiAction,
    params: { [key: string]: string | number | boolean | undefined } = {}
  ): Promise<EtherscanAPIResponse> {
    await this.throttle()
    const [module, action] = actionEnum.split('_')
    const mergeUrl =  `${this.apiUrl}?${stringify({
      ...params,
      action,
      apikey: this.apiKey,
      module,
    })}`
    console.debug(`request api debug ${this.apiUrl} `, mergeUrl)
    const response = await fetch(mergeUrl)

    // 403 responses are not usually expected
    if (response.status === 403) {
      let msg: string

      try {
        msg = await response.text()
      } catch (err) {
        throw new Error(
          `unexpected status code 403 and could not parse response body`
        )
      }

      throw new Error(`unexpected status code 403: ${msg}`)
    }

    if (response.status !== 200) {
      throw new Error(`response status was not 200: ${response.status}`)
    }

    let text: string
    try {
      text = await response.text()
    } catch (err) {
      throw new Error(`failed to read response text: ${err.message}`)
    }

    let responseJson: EtherscanAPIResponse
    try {
      responseJson = JSON.parse(text)
    } catch (err) {
      throw new Error(`failed to parse json in response body: ${err.message}`)
    }
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
