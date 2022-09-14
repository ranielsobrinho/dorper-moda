import { StockModel } from "../../models/stock"

export interface AddStock {
  execute(params: AddStock.Params): Promise<AddStock.Result>
}

export namespace AddStock {
  export type Params = Omit<StockModel, 'id'>
  export type Result = void
}
