import { CreateSale } from '../../../../domain/usecases/sales/create-sales'
import { CheckNameStockRepository } from '../../../protocols/db/stock/checkNameStockRepository'
import { CheckQuantityStockRepository } from '../../../protocols/db/stock/checkQuantityStockRepository'

export class CreateSalesUseCase implements CreateSale {
  constructor(
    private readonly checkNameStockRepository: CheckNameStockRepository,
    private readonly checkQuantityStockRepository: CheckQuantityStockRepository
  ) {}

  async execute(params: CreateSale.Params): Promise<CreateSale.Result> {
    const products = params.products.map((product) => {
      return {
        modelName: product.modelName,
        quantity: product.quantity
      }
    })

    const allModelNames = await this.checkNameStockRepository.checkStock(
      products.map(({ modelName }) => modelName)
    )

    if (!allModelNames) {
      throw new Error('Algum nome de modelo não existe.')
    }

    await this.checkQuantityStockRepository.checkStock(products)
  }
}
