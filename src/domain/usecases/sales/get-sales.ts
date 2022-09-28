import { SalesModel } from '../../models/sales'

export interface GetSales {
  getAll(): Promise<SalesModel[]>
}
