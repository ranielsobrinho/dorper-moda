import { DeleteStock } from '../../../../domain/usecases/stock/delete-stock'
import { DeleteStockRepository } from '../../../protocols/db/stock/deleteStockRepository'
import { GetStockByIdRepository } from '../../../protocols/db/stock/getStockByIdRepository'

export class DeleteStockUseCase implements DeleteStock {
  constructor(
    private readonly deleteStockRepository: DeleteStockRepository,
    private readonly getStockByIdRepository: GetStockByIdRepository
  ) {}

  async execute(stockId: string): Promise<void> {
    await this.getStockByIdRepository.getById(stockId)
    await this.deleteStockRepository.delete(stockId)
  }
}
