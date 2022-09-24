import { StockModel } from './stock'

export type SalesModel = {
  id: string
  clientName: string
  deliveryFee: number
  paymentForm: string
  products: StockModelRequest[]
  soldAt: Date
  total: number
}

export type StockModelRequest = Omit<StockModel, 'id'>
