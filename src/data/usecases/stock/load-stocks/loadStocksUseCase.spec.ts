import { StockModel } from '../../../../domain/models/stock'
import { LoadStocksRepository } from '../../../protocols/db/stock/loadStocksRepository'
import { LoadStocksUseCase } from './loadStocksUseCase'

const makeFakeStockModel = (): StockModel[] => {
  return [
    {
      id: 'any_id',
      modelName: 'any_model',
      color: 'any_color',
      quantity: 1
    }
  ]
}

const makeLoadStocksRepositoryStub = (): LoadStocksRepository => {
  class LoadStocksRepositoryStub implements LoadStocksRepository {
    async loadAll(): Promise<LoadStocksRepository.Result> {
      return Promise.resolve(makeFakeStockModel())
    }
  }
  return new LoadStocksRepositoryStub()
}

type SutTypes = {
  sut: LoadStocksUseCase
  loadStocksRepositoryStub: LoadStocksRepository
}

const makeSut = (): SutTypes => {
  const loadStocksRepositoryStub = makeLoadStocksRepositoryStub()
  const sut = new LoadStocksUseCase(loadStocksRepositoryStub)
  return {
    sut,
    loadStocksRepositoryStub
  }
}

describe('LoadStocksUseCase', () => {
  test('Should call LoadStocksRepository once', async () => {
    const { sut, loadStocksRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadStocksRepositoryStub, 'loadAll')
    await sut.loadAll()
    expect(loadSpy).toHaveBeenCalledTimes(1)
  })

  test('Should throw if LoadStocksRepository throws', async () => {
    const { sut, loadStocksRepositoryStub } = makeSut()
    jest
      .spyOn(loadStocksRepositoryStub, 'loadAll')
      .mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.loadAll()
    expect(promise).rejects.toThrow()
  })
})
