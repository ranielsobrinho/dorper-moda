import { SalesModel } from '../../../../domain/models/sales'

export interface CreateSalesRepository {
  execute(
    data: CreateSalesRepository.Params
  ): Promise<CreateSalesRepository.Result>
}

export namespace CreateSalesRepository {
  export type Params = Omit<SalesModel, 'id'>
  export type Result = void
}
