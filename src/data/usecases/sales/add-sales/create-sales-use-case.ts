import { CreateSale } from '../../../../domain/usecases/sales/create-sales'
import { LoadStockByNameRepository } from '../../../protocols/db/stock/loadStockByNameRepository'

export class CreateSalesUseCase implements CreateSale {
  constructor(
    private readonly loadStockByNameRepository: LoadStockByNameRepository
  ) {}

  async execute(params: CreateSale.Params): Promise<CreateSale.Result> {
    const productNames = params.products.map((product) => product.modelName)
    for (const name of productNames) {
      const stockData = await this.loadStockByNameRepository.loadByName(name)
      if (!stockData) {
        return null
      }
    }
  }
}
