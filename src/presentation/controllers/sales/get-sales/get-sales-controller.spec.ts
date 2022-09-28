import { SalesModel } from '../../../../domain/models/sales'
import { GetSales } from '../../../../domain/usecases/sales/get-sales'
import { GetSalesController } from './get-sales-controller'

const makeGetSales = (): SalesModel[] => {
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

const makeGetSalesUseCase = (): GetSales => {
  class GetSalesStub implements GetSales {
    async getAll(): Promise<SalesModel[]> {
      return Promise.resolve(makeGetSales())
    }
  }
  return new GetSalesStub()
}

type SutTypes = {
  sut: GetSalesController
  getSalesStub: GetSales
}

const makeSut = (): SutTypes => {
  const getSalesStub = makeGetSalesUseCase()
  const sut = new GetSalesController(getSalesStub)
  return {
    sut,
    getSalesStub
  }
}

describe('GetSalesController', () => {
  test('Should call GetSales once', async () => {
    const { sut, getSalesStub } = makeSut()
    const getSpy = jest.spyOn(getSalesStub, 'getAll')
    await sut.handle({})
    expect(getSpy).toHaveBeenCalledTimes(1)
  })
})
