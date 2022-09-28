import { SalesModel } from '../../../../domain/models/sales'
import { GetSales } from '../../../../domain/usecases/sales/get-sales'
import { GetSalesRepository } from '../../../protocols/db/sales/get-sales-repository'

export class GetSalesUseCase implements GetSales {
  constructor(private readonly getSalesRepository: GetSalesRepository) {}

  async getAll(): Promise<SalesModel[]> {
    const sales = await this.getSalesRepository.getAll()

    return sales
  }
}
