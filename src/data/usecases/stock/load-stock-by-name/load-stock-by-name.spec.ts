import { StockModel } from '../../../../domain/models/stock'
import { LoadStockByNameRepository } from '../../../protocols/db/stock/loadStockByNameRepository'
import { LoadStockByNameUseCase } from './load-stock-by-name'

const makeFakeStockModel = (): StockModel => ({
  id: 'any_id',
  modelName: 'any_model',
  description: [
    {
      color: 'any_color',
      quantity: 1
    }
  ]
})

const makeLoadStockByNameRepositoryStub = (): LoadStockByNameRepository => {
  class LoadStockByNameRepositoryStub implements LoadStockByNameRepository {
    async loadByName(name: string): Promise<LoadStockByNameRepository.Result> {
      return Promise.resolve(makeFakeStockModel())
    }
  }
  return new LoadStockByNameRepositoryStub()
}

type SutTypes = {
  sut: LoadStockByNameUseCase
  loadStockByNameRepositoryStub: LoadStockByNameRepository
}

const makeSut = (): SutTypes => {
  const loadStockByNameRepositoryStub = makeLoadStockByNameRepositoryStub()
  const sut = new LoadStockByNameUseCase(loadStockByNameRepositoryStub)
  return {
    sut,
    loadStockByNameRepositoryStub
  }
}

describe('LoadStockByNameUseCase', () => {
  test('Should call loadStockByNameRepository with correct value', async () => {
    const { sut, loadStockByNameRepositoryStub } = makeSut()
    const getByNameSpy = jest.spyOn(loadStockByNameRepositoryStub, 'loadByName')
    await sut.loadByName('any_name')
    expect(getByNameSpy).toHaveBeenCalledWith('any_name')
  })

  test('Should throw if loadStockByNameRepository throws', async () => {
    const { sut, loadStockByNameRepositoryStub } = makeSut()
    jest
      .spyOn(loadStockByNameRepositoryStub, 'loadByName')
      .mockRejectedValueOnce(new Error())
    const promise = sut.loadByName('any_name')
    await expect(promise).rejects.toThrow(new Error())
  })

  test('Should return null if loadStockByNameRepository returns null', async () => {
    const { sut, loadStockByNameRepositoryStub } = makeSut()
    jest
      .spyOn(loadStockByNameRepositoryStub, 'loadByName')
      .mockResolvedValueOnce(null)
    const stock = await sut.loadByName('any_name')
    expect(stock).toEqual(null)
  })
})
