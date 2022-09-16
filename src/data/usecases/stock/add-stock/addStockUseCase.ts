import { AddStock } from '../../../../domain/usecases/stock/add-stock'
import { AddStockRepository } from '../../../protocols/db/stock/addStockRepository'
import { LoadStockByNameRepository } from '../../../protocols/db/stock/loadStockByNameRepository'

export class AddStockUseCase implements AddStock {
  constructor(
    private readonly addStockRepository: AddStockRepository,
    private readonly loadStockByNameRepository: LoadStockByNameRepository
  ) {}
  async execute(stockData: AddStock.Params): Promise<AddStock.Result> {
    const stock = await this.loadStockByNameRepository.loadByName(
      stockData.modelName
    )
    if (stock && stock.color === stockData.color) {
      throw new Error('A stock with this name already exists')
    }
    await this.addStockRepository.add(stockData)
  }
}
