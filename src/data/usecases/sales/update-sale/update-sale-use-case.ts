import { UpdateSale } from '../../../../domain/usecases/sales/update-sale'
import { GetSaleByIdRepository } from '../../../protocols/db/sales/get-sale-by-id-repository'
import { UpdateSaleRepository } from '../../../protocols/db/sales/update-sale-repository'

export class UpdateSaleUseCase implements UpdateSale {
  constructor(
    private readonly getSaleByIdRepository: GetSaleByIdRepository,
    private readonly updateSaleRepository: UpdateSaleRepository
  ) {}

  async execute(params: UpdateSale.Params): Promise<UpdateSale.Result> {
    const existingSale = await this.getSaleByIdRepository.getById(params.saleId)
    if (!existingSale) {
      return null
    }
    await this.updateSaleRepository.update(params)
    return 'ok'
  }
}
