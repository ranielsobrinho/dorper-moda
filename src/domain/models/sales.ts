import { StockModel } from './stock'

export type SalesModel = {
  id: string
  clientName: string
  deliveryFee: number
  paymentForm: string
  products: StockModel[]
  soldAt: Date
  total: number
}
