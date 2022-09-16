import { AddStock } from '../../../../domain/usecases/stock/add-stock'
import { AddStockRepository } from '../../../protocols/db/stock/addStockRepository'
import { LoadStockByNameRepository } from '../../../protocols/db/stock/loadStockByNameRepository'

export class AddStockUseCase implements AddStock {
  constructor(
    private readonly addStockRepository: AddStockRepository,
    private readonly loadStockByNameRepository: LoadStockByNameRepository
  ) {}
  async execute(stockData: AddStock.Params): Promise<AddStock.Result> {
    await this.loadStockByNameRepository.loadByName(stockData.modelName)
    await this.addStockRepository.add(stockData)
    return
  }
}
