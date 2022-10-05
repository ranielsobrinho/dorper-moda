import { SalesModel } from '../../../../domain/models/sales'

export interface GetSaleByIdRepository {
  getById(saleId: string): Promise<GetSaleByIdRepository.Result>
}

export namespace GetSaleByIdRepository {
  export type Result = SalesModel
}
