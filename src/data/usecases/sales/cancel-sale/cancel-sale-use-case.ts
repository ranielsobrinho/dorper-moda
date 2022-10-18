import { CancelSale } from '../../../../domain/usecases/sales/cancel-sale'
import { CancelSaleRepository } from '../../../protocols/db/sales/cancel-sale-repository'
import { GetSaleByIdRepository } from '../../../protocols/db/sales/get-sale-by-id-repository'
import { RefundStockRepository } from '../../../protocols/db/stock/refund-stock-repository'

export class CancelSaleUseCase implements CancelSale {
  constructor(
    private readonly getSaleByIdRepository: GetSaleByIdRepository,
    private readonly refundStockRepository: RefundStockRepository,
    private readonly cancelSaleRepository: CancelSaleRepository
  ) {}

  async cancel(saleId: string): Promise<void | Error> {
    const saleData = await this.getSaleByIdRepository.getById(saleId)
    if (saleData) {
      const products = saleData.products.map((stock) => {
        return {
          modelName: stock.modelName,
          description: stock.description
        }
      })
      const refundStock = await this.refundStockRepository.refundStock(products)
      if (!refundStock) {
        throw new Error(
          'Não foi possível retornar os valores iniciais do produto'
        )
      }
    }
  }
}
