import { SalesModel } from '../../models/sales'

export interface GetSaleById {
  getById(saleId: string): Promise<SalesModel>
}
