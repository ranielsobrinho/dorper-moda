export interface CheckQuantityStockRepository {
  checkStockQuantity(
    data: CheckQuantityStockRepository.Params
  ): Promise<CheckQuantityStockRepository.Result>
}

export namespace CheckQuantityStockRepository {
  export type Params = params[]
  export type Result = boolean
}

type params = {
  modelName: string
  description: {
    color: string
    quantity: number
  }
}
