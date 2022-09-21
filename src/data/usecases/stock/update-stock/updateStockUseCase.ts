import { UpdateStock } from '../../../../domain/usecases/stock/update-stock'
import { UpdateStockRepository } from '../../../protocols/db/stock/updateStockRepository'

export class UpdateStockUseCase implements UpdateStock {
  constructor(private readonly updateStockRepository: UpdateStockRepository) {}

  async execute(params: UpdateStock.Params): Promise<UpdateStock.Result> {
    await this.updateStockRepository.update(params)
  }
}
