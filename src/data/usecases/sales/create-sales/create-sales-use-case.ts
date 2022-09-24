import { CreateSale } from '../../../../domain/usecases/sales/create-sales'
import { CheckNameStockRepository } from '../../../protocols/db/stock/checkNameStockRepository'

export class CreateSalesUseCase implements CreateSale {
  constructor(
    private readonly checkNameStockRepository: CheckNameStockRepository
  ) {}

  async execute(params: CreateSale.Params): Promise<CreateSale.Result> {
    const allModelNames = await this.checkNameStockRepository.checkStock(
      params.products.map(({ modelName }) => modelName)
    )
    if (!allModelNames) {
      throw new Error('Algum nome de modelo não existe.')
    }
  }
}
