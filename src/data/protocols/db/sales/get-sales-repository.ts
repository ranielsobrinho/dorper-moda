import { SalesModel } from '../../../../domain/models/sales'

export interface GetSalesRepository {
  getAll(): Promise<GetSalesRepository.Result>
}

export namespace GetSalesRepository {
  export type Result = SalesModel[]
}
