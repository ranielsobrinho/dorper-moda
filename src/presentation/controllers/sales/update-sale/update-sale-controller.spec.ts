import { UpdateSale } from '../../../../domain/usecases/sales/update-sale'
import { HttpRequest } from '../../../protocols'
import { UpdateSaleController } from './update-sale-controller'
import MockDate from 'mockdate'

const makeFakeSaleRequest = (): HttpRequest => ({
  params: {
    saleId: 'any_id'
  },
  body: {
    data: {
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
  }
})

const makeUpdateSaleRequest = (): UpdateSale.Params => ({
  saleId: 'any_id',
  data: {
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

describe('UpdateSaleController', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call UpdateSale with correct values', async () => {
    class UpdateSaleStub implements UpdateSale {
      async execute(params: UpdateSale.Params): Promise<UpdateSale.Result> {
        return Promise.resolve('ok')
      }
    }
    const updateSaleStub = new UpdateSaleStub()
    const sut = new UpdateSaleController(updateSaleStub)
    const updateSaleSpy = jest.spyOn(updateSaleStub, 'execute')
    await sut.handle(makeFakeSaleRequest())
    expect(updateSaleSpy).toHaveBeenCalledWith(makeUpdateSaleRequest())
  })
})
