import { StockModel } from '../../../../domain/models/stock'
import { GetStockByIdRepository } from '../../../protocols/db/stock/get-stock-by-id-repository'
import { GetStockByIdUseCase } from './get-stock-by-id-use-case'

const makeFakeStockData = (): StockModel => ({
  id: 'any_id',
  modelName: 'any_name',
  description: [
    {
      color: 'any_color',
      quantity: 1
    }
  ]
})

const makeGetStockByIdRepositoryStub = (): GetStockByIdRepository => {
  class GetStockByIdRepositoryStub implements GetStockByIdRepository {
    async getById(stockId: string): Promise<GetStockByIdRepository.Result> {
      return Promise.resolve(makeFakeStockData())
    }
  }
  return new GetStockByIdRepositoryStub()
}

type SutTypes = {
  sut: GetStockByIdUseCase
  getStockByIdRepositoryStub: GetStockByIdRepository
}

const makeSut = (): SutTypes => {
  const getStockByIdRepositoryStub = makeGetStockByIdRepositoryStub()
  const sut = new GetStockByIdUseCase(getStockByIdRepositoryStub)
  return {
    sut,
    getStockByIdRepositoryStub
  }
}

describe('GetByIdUseCase', () => {
  test('Should call GetStockByIdRepository with correct values', async () => {
    const { sut, getStockByIdRepositoryStub } = makeSut()
    const getByIdSpy = jest.spyOn(getStockByIdRepositoryStub, 'getById')
    await sut.execute('any_id')
    expect(getByIdSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should throw if GetStockByIdRepository throws', async () => {
    const { sut, getStockByIdRepositoryStub } = makeSut()
    jest
      .spyOn(getStockByIdRepositoryStub, 'getById')
      .mockRejectedValueOnce(new Error())
    const promise = sut.execute('any_id')
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if GetStockByIdRepository returns null', async () => {
    const { sut, getStockByIdRepositoryStub } = makeSut()
    jest
      .spyOn(getStockByIdRepositoryStub, 'getById')
      .mockResolvedValueOnce(null)
    const stockData = await sut.execute('any_id')
    expect(stockData).toEqual(null)
  })

  test('Should return a stock on GetStockByIdRepository success', async () => {
    const { sut } = makeSut()
    const stockData = await sut.execute('any_id')
    expect(stockData).toEqual(makeFakeStockData())
  })
})
