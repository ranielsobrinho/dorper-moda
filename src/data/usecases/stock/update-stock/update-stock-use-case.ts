import { UpdateStock } from '../../../../domain/usecases/stock/update-stock'
import { GetStockByIdRepository } from '../../../protocols/db/stock/get-stock-by-id-repository'
import { UpdateStockRepository } from '../../../protocols/db/stock/update-stock-repository'

export class UpdateStockUseCase implements UpdateStock {
  constructor(
    private readonly updateStockRepository: UpdateStockRepository,
    private readonly getStockByIdRepository: GetStockByIdRepository
  ) {}

  async execute(params: UpdateStock.Params): Promise<UpdateStock.Result> {
    const stockData = await this.getStockByIdRepository.getById(params.stockId)
    if (!stockData) {
      return null
    }
    await this.updateStockRepository.update(params)
    return 'Updated'
  }
}
