import { LoadStocks } from '../../../../domain/usecases/stock/load-stock'
import { LoadStocksRepository } from '../../../protocols/db/stock/loadStocksRepository'

export class LoadStocksUseCase implements LoadStocks {
  constructor(private readonly loadStocksRepository: LoadStocksRepository) {}

  async loadAll(): Promise<LoadStocks.Result> {
    const stock = await this.loadStocksRepository.loadAll()
    return stock
  }
}
