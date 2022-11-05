import { AddStock } from '../../../../domain/usecases/stock/add-stock'
import { AddStockRepository } from '../../../protocols/db/stock/add-stock-repository'

export class AddStockUseCase implements AddStock {
  constructor(private readonly addStockRepository: AddStockRepository) {}

  async execute(stockData: AddStock.Params): Promise<AddStock.Result> {
    await this.addStockRepository.add(stockData)
  }
}
