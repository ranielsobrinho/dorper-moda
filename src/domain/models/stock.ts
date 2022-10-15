export type StockModel = {
  id: string
  modelName: string
  description: Description[]
}

type Description = {
  color: string
  quantity: number
}
