import { SalesModel } from '../../../../domain/models/sales'

export interface UpdateSaleRepository {
  update(
    params: UpdateSaleRepository.Params
  ): Promise<UpdateSaleRepository.Result>
}

export namespace UpdateSaleRepository {
  export type Params = {
    saleId: string
    data: Omit<SalesModel, 'id'>
  }
  export type Result = void
}
