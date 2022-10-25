import { CreateSale } from '../../../../domain/usecases/sales/create-sales'
import { CreateSalesRepository } from '../../../protocols/db/sales/createSalesRepository'
import { CheckNameStockRepository } from '../../../protocols/db/stock/checkNameStockRepository'
import { CheckQuantityStockRepository } from '../../../protocols/db/stock/checkQuantityStockRepository'

export class CreateSalesUseCase implements CreateSale {
  constructor(
    private readonly checkNameStockRepository: CheckNameStockRepository,
    private readonly checkQuantityStockRepository: CheckQuantityStockRepository,
    private readonly createSalesRepository: CreateSalesRepository
  ) {}

  async execute(params: CreateSale.Params): Promise<CreateSale.Result> {
    const products = params.products.map((product) => {
      return {
        modelName: product.modelName
      }
    })

    const allModelNames = await this.checkNameStockRepository.checkStock(
      products.map(({ modelName }) => modelName)
    )
    if (!allModelNames) {
      return null
    }

    const quantityModels =
      await this.checkQuantityStockRepository.checkStockQuantity(
        params.products
      )
    if (!quantityModels) {
      return null
    }

    await this.createSalesRepository.create(params)
  }
}
