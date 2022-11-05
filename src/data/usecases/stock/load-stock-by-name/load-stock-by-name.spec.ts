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

describe('LoadStockByNameUseCase', () => {
  test('Should call getStockByNameRepository with correct value', async () => {
    class GetStockByNameRepositoryStub implements LoadStockByNameRepository {
      async loadByName(
        name: string
      ): Promise<LoadStockByNameRepository.Result> {
        return Promise.resolve(makeFakeStockModel())
      }
    }
    const getStockByNameRepositoryStub = new GetStockByNameRepositoryStub()
    const sut = new LoadStockByNameUseCase(getStockByNameRepositoryStub)
    const getByNameSpy = jest.spyOn(getStockByNameRepositoryStub, 'loadByName')
    await sut.loadByName('any_name')
    expect(getByNameSpy).toHaveBeenCalledWith('any_name')
  })
})
