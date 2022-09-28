import { SalesModel } from '../../../../domain/models/sales'
import { GetSales } from '../../../../domain/usecases/sales/get-sales'
import { GetSalesRepository } from '../../../protocols/db/sales/get-sales-repository'

export class GetSalesUseCase implements GetSales {
  constructor(private readonly getSalesRepository: GetSalesRepository) {}

  async getAll(): Promise<SalesModel[]> {
    await this.getSalesRepository.getAll()

    return [
      {
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
      }
    ]
  }
}
