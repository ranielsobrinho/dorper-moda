import { GetStockById } from '../../../../domain/usecases/stock/get-stock-by-id'
import { GetStockByIdRepository } from '../../../protocols/db/stock/getStockByIdRepository'

export class GetStockByIdUseCase implements GetStockById {
  constructor(
    private readonly getStockByIdRepository: GetStockByIdRepository
  ) {}

  async execute(stockId: string): Promise<GetStockById.Result> {
    await this.getStockByIdRepository.getById(stockId)
    return Promise.resolve({
      id: 'any_id',
      modelName: 'any_name',
      color: 'any_color',
      quantity: 1
    })
  }
}
