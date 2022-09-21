import { StockModel } from '../../../../domain/models/stock'
import { GetStockByIdRepository } from '../../../protocols/db/stock/getStockByIdRepository'
import { GetStockByIdUseCase } from './getStockByIdUseCase'

const makeFakeStockData = (): StockModel => ({
  id: 'any_id',
  modelName: 'any_name',
  color: 'any_color',
  quantity: 1
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
})
