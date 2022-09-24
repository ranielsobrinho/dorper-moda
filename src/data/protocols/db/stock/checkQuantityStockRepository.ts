export interface CheckQuantityStockRepository {
  checkStock(
    data: CheckQuantityStockRepository.Params
  ): Promise<CheckQuantityStockRepository.Result>
}

export namespace CheckQuantityStockRepository {
  export type Params = params[]
  export type Result = boolean
}

type params = {
  modelName: string
  quantity: number
}
