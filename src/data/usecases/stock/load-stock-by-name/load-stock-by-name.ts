import { LoadStockByName } from '../../../../domain/usecases/stock/load-stock-by-name'
import { LoadStockByNameRepository } from '../../../protocols/db/stock/loadStockByNameRepository'

export class LoadStockByNameUseCase implements LoadStockByName {
  constructor(
    private readonly loadStockByNameRepository: LoadStockByNameRepository
  ) {}

  async loadByName(stockName: string): Promise<LoadStockByName.Result> {
    await this.loadStockByNameRepository.loadByName(stockName)
    return null
  }
}
