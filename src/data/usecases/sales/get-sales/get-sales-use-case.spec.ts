import { SalesModel } from '../../../../domain/models/sales'
import { GetSalesRepository } from '../../../protocols/db/sales/get-sales-repository'
import { GetSalesUseCase } from './get-sales-use-case'
import MockDate from 'mockdate'

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
          description: [
            {
              color: 'any_color_name',
              quantity: 1
            }
          ]
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
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
  test('Should call GetSalesRepository once', async () => {
    const { sut, getSalesRepositoryStub } = makeSut()
    const getSpy = jest.spyOn(getSalesRepositoryStub, 'getAll')
    await sut.getAll()
    expect(getSpy).toHaveBeenCalledTimes(1)
  })

  test('Should throw if GetSalesRepository throws', async () => {
    const { sut, getSalesRepositoryStub } = makeSut()
    jest
      .spyOn(getSalesRepositoryStub, 'getAll')
      .mockRejectedValueOnce(new Error())
    const promise = sut.getAll()
    await expect(promise).rejects.toThrow()
  })

  test('Should return sales on success', async () => {
    const { sut } = makeSut()
    const sales = await sut.getAll()
    expect(sales).toEqual(makeGetSales())
  })
})
