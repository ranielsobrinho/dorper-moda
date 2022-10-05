import { SalesModel } from '../../../../domain/models/sales'
import { GetSaleById } from '../../../../domain/usecases/sales/get-sale-by-id'
import { GetSaleByIdRepository } from '../../../protocols/db/sales/get-sale-by-id-repository'

export class GetSaleByIdUseCase implements GetSaleById {
  constructor(private readonly getSaleByIdRepository: GetSaleByIdRepository) {}

  async getById(saleId: string): Promise<SalesModel | null> {
    const saleData = await this.getSaleByIdRepository.getById(saleId)
    if (!saleData) {
      return null
    }
    const makeGetSale = (): GetSaleByIdRepository.Result => ({
      id: 'any_id',
      clientName: 'any_client_name',
      deliveryFee: 25,
      paymentForm: 'CREDIT CARD',
      products: [
        {
          modelName: 'any_model_name',
          color: 'any_color_name',
          quantity: 1
        }
      ],
      soldAt: new Date(),
      total: 110
    })

    return Promise.resolve(makeGetSale())
  }
}
