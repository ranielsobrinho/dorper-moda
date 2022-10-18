import { CancelSale } from '../../../../domain/usecases/sales/cancel-sale'
import { GetSaleByIdRepository } from '../../../protocols/db/sales/get-sale-by-id-repository'

export class CancelSaleUseCase implements CancelSale {
  constructor(private readonly getSaleByIdRepository: GetSaleByIdRepository) {}

  async cancel(saleId: string): Promise<void | Error> {
    await this.getSaleByIdRepository.getById(saleId)
  }
}
