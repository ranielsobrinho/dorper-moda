import { UpdateStock } from '../../../../domain/usecases/stock/update-stock'
import { GetStockByIdRepository } from '../../../protocols/db/stock/getStockByIdRepository'
import { UpdateStockRepository } from '../../../protocols/db/stock/updateStockRepository'

export class UpdateStockUseCase implements UpdateStock {
  constructor(
    private readonly updateStockRepository: UpdateStockRepository,
    private readonly getStockByIdRepository: GetStockByIdRepository
  ) {}

  async execute(params: UpdateStock.Params): Promise<UpdateStock.Result> {
    await this.getStockByIdRepository.getById(params.stockId)
    await this.updateStockRepository.update(params)
  }
}
