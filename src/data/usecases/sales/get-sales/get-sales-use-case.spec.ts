import { SalesModel } from '../../../../domain/models/sales'
import { GetSalesRepository } from '../../../protocols/db/sales/get-sales-repository'
import { GetSalesUseCase } from './get-sales-use-case'

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

const makeGetSalesRepositoryStub = (): GetSalesRepository => {
  class GetSalesRepositoryStub implements GetSalesRepository {
    async getAll(): Promise<GetSalesRepository.Result> {
      return Promise.resolve(makeGetSales())
    }
  }
  return new GetSalesRepositoryStub()
}

type SutTypes = {
  sut: GetSalesUseCase
  getSalesRepositoryStub: GetSalesRepository
}

const makeSut = (): SutTypes => {
  const getSalesRepositoryStub = makeGetSalesRepositoryStub()
  const sut = new GetSalesUseCase(getSalesRepositoryStub)
  return {
    sut,
    getSalesRepositoryStub
  }
}

describe('GetSalesUseCase', () => {
  test('Should call GetSalesRepository once', async () => {
    const { sut, getSalesRepositoryStub } = makeSut()
    const getSpy = jest.spyOn(getSalesRepositoryStub, 'getAll')
    await sut.getAll()
    expect(getSpy).toHaveBeenCalledTimes(1)
  })
})
