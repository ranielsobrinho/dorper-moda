import { GetStockById } from '../../../../domain/usecases/stock/get-stock-by-id'
import { GetStockByIdRepository } from '../../../protocols/db/stock/getStockByIdRepository'

export class GetStockByIdUseCase implements GetStockById {
  constructor(
    private readonly getStockByIdRepository: GetStockByIdRepository
  ) {}

  async execute(stockId: string): Promise<GetStockById.Result> {
    const stockData = await this.getStockByIdRepository.getById(stockId)
    if (!stockData) {
      return null
    }
    return stockData
  }
}
