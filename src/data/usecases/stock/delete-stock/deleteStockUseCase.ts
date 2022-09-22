import { DeleteStock } from '../../../../domain/usecases/stock/delete-stock'
import { DeleteStockRepository } from '../../../protocols/db/stock/deleteStockRepository'

export class DeleteStockUseCase implements DeleteStock {
  constructor(private readonly deleteStockRepository: DeleteStockRepository) {}

  async execute(stockId: string): Promise<string | null> {
    const deletedData = await this.deleteStockRepository.delete(stockId)
    if (!deletedData) {
      return null
    }
    return 'Deleted'
  }
}
