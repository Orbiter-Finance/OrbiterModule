// my service codes
export enum ServiceErrorCodes {
  'success' = 0,
  'token miss' = 1001,
  'token expired' = 1002,
  'data no exist' = 3001,
  'data collision' = 3002,
  'arguments invalid' = 4001,
  'unknown' = 5001
}

export class ServiceError extends Error {
  public code: ServiceErrorCodes

  constructor(
    message?: string,
    code: ServiceErrorCodes = ServiceErrorCodes.unknown
  ) {
    super(message)
    this.code = code
  }
}
