import { DeleteStock } from '../../../../domain/usecases/stock/delete-stock'
import { DeleteStockRepository } from '../../../protocols/db/stock/deleteStockRepository'

export class DeleteStockUseCase implements DeleteStock {
  constructor(private readonly deleteStockRepository: DeleteStockRepository) {}

  async execute(stockId: string): Promise<void> {
    await this.deleteStockRepository.delete(stockId)
  }
}
