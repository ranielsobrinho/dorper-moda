export interface CheckNameStockRepository {
  checkStock(
    data: CheckNameStockRepository.Params
  ): Promise<CheckNameStockRepository.Result>
}

export namespace CheckNameStockRepository {
  export type Params = string[]
  export type Result = boolean
}
