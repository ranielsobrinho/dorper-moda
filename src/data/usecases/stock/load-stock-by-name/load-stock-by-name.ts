import { LoadStockByName } from '../../../../domain/usecases/stock/load-stock-by-name'
import { LoadStockByNameRepository } from '../../../protocols/db/stock/load-stock-by-name-repository'

export class LoadStockByNameUseCase implements LoadStockByName {
  constructor(
    private readonly loadStockByNameRepository: LoadStockByNameRepository
  ) {}

  async loadByName(stockName: string): Promise<LoadStockByName.Result> {
    const stock = await this.loadStockByNameRepository.loadByName(stockName)
    if (stock) {
      return stock
    }
    return null
  }
}
