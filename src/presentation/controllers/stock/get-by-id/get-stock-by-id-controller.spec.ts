import { GetStockById } from '../../../../domain/usecases/stock/get-stock-by-id'
import { StockModel } from '../../../../domain/models/stock'
import { HttpRequest } from '../../../protocols/http'
import { GetStockByIdController } from './get-stock-by-id-controller'

const makeFakeStockModel = (): StockModel => ({
  id: 'any_id',
  modelName: 'any_model',
  color: 'any_color',
  quantity: 1
})

const httpRequest = (): HttpRequest => ({
  body: {
    stockId: 1
  }
})

const makeGetStockByIdStub = (): GetStockById => {
  class GetByIdStub implements GetStockById {
    async execute(stockId: string): Promise<GetStockById.Result> {
      return Promise.resolve(makeFakeStockModel())
    }
  }
  return new GetByIdStub()
}

type SutTypes = {
  sut: GetStockByIdController
  getByIdStub: GetStockById
}

const makeSut = (): SutTypes => {
  const getByIdStub = makeGetStockByIdStub()
  const sut = new GetStockByIdController(getByIdStub)
  return {
    sut,
    getByIdStub
  }
}

describe('GetStockByIdController', () => {
  test('Should call GetById with correct values', async () => {
    const { sut, getByIdStub } = makeSut()
    const getByIdSpy = jest.spyOn(getByIdStub, 'execute')
    await sut.handle(httpRequest())
    expect(getByIdSpy).toHaveBeenCalledWith(httpRequest().body.stockId)
  })
})
