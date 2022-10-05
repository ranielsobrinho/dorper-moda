import { SalesModel } from '../../../../domain/models/sales'
import { GetSaleById } from '../../../../domain/usecases/sales/get-sale-by-id'
import { HttpRequest } from '../../../protocols'
import { GetSaleByIdController } from './get-sale-by-id-controller'

const makeGetSale = (): SalesModel => ({
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

const httpRequest = (): HttpRequest => ({
  body: {
    saleId: 1
  }
})

describe('GetSaleByIdController', () => {
  test('Should call GetSaleById with correct values', async () => {
    class GetSaleByIdStub implements GetSaleById {
      async getById(saleId: string): Promise<SalesModel | null> {
        return Promise.resolve(makeGetSale())
      }
    }
    const getSaleByIdStub = new GetSaleByIdStub()
    const sut = new GetSaleByIdController(getSaleByIdStub)
    const getSaleSpy = jest.spyOn(getSaleByIdStub, 'getById')
    await sut.handle(httpRequest())
    expect(getSaleSpy).toHaveBeenCalledWith(httpRequest().body.saleId)
  })
})
