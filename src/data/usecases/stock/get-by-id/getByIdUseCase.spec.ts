import { StockModel } from '../../../../domain/models/stock'
import { GetStockByIdRepository } from '../../../protocols/db/stock/getStockByIdRepository'
import { GetStockByIdUseCase } from './getStockByIdUseCase'

const makeFakeStockData = (): StockModel => ({
  id: 'any_id',
  modelName: 'any_name',
  color: 'any_color',
  quantity: 1
})

describe('GetByIdUseCase', () => {
  test('Should call GetStockByIdRepository with correct values', async () => {
    class GetStockByIdRepositoryStub implements GetStockByIdRepository {
      async getById(stockId: string): Promise<GetStockByIdRepository.Result> {
        return Promise.resolve(makeFakeStockData())
      }
    }
    const getStockByIdRepositoryStub = new GetStockByIdRepositoryStub()
    const sut = new GetStockByIdUseCase(getStockByIdRepositoryStub)
    const getByIdSpy = jest.spyOn(getStockByIdRepositoryStub, 'getById')
    await sut.execute('any_id')
    expect(getByIdSpy).toHaveBeenCalledWith('any_id')
  })
})
