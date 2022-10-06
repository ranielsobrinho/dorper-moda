import { UpdateSale } from '../../../../domain/usecases/sales/update-sale'
import { GetSaleByIdRepository } from '../../../protocols/db/sales/get-sale-by-id-repository'

export class UpdateSaleUseCase implements UpdateSale {
  constructor(private readonly getSaleByIdRepository: GetSaleByIdRepository) {}

  async execute(params: UpdateSale.Params): Promise<UpdateSale.Result> {
    const existingSale = await this.getSaleByIdRepository.getById(params.saleId)
    if (!existingSale) {
      return null
    }
    return 'ok'
  }
}
