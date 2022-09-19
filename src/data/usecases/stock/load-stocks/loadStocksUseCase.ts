import { LoadStocks } from '../../../../domain/usecases/stock/load-stock'
import { LoadStocksRepository } from '../../../protocols/db/stock/loadStocksRepository'

export class LoadStocksUseCase implements LoadStocks {
  constructor(private readonly loadStocksRepository: LoadStocksRepository) {}

  async loadAll(): Promise<LoadStocks.Result> {
    await this.loadStocksRepository.loadAll()
    return Promise.resolve([
      {
        id: 'any_id',
        modelName: 'any_name',
        color: 'any_color',
        quantity: 1
      }
    ])
  }
}
