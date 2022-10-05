import { SalesModel } from '../../../../domain/models/sales'
import { GetSaleById } from '../../../../domain/usecases/sales/get-sale-by-id'
import { GetSaleByIdRepository } from '../../../protocols/db/sales/get-sale-by-id-repository'

export class GetSaleByIdUseCase implements GetSaleById {
  constructor(private readonly getSaleByIdRepository: GetSaleByIdRepository) {}

  async getById(saleId: string): Promise<SalesModel | null> {
    const saleData = await this.getSaleByIdRepository.getById(saleId)

    if (!saleData) {
      return null
    }

    return saleData
  }
}
