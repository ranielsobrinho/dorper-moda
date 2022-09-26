import { CreateSale } from '../../../../domain/usecases/sales/create-sales'
import { CreateSalesController } from './create-sales-controller'
import MockDate from 'mockdate'
import { HttpRequest } from '../../../protocols'

const makeFakeSaleRequest = (): HttpRequest => ({
  body: {
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
})

describe('CreateSalesController', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
  test('Should call CreateSale with correct values', async () => {
    class CreateSalesStub implements CreateSale {
      async execute(params: CreateSale.Params): Promise<CreateSale.Result> {
        return Promise.resolve()
      }
    }
    const createSalesStub = new CreateSalesStub()
    const sut = new CreateSalesController(createSalesStub)
    const createSalesSpy = jest.spyOn(createSalesStub, 'execute')
    await sut.handle(makeFakeSaleRequest())
    expect(createSalesSpy).toHaveBeenCalledWith(makeFakeSaleRequest().body)
  })
})
