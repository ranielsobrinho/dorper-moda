import { AddStock } from '../../../../domain/usecases/stock/add-stock'
import { HttpRequest } from '../../../protocols'
import { AddStockController } from './add-stock-controller'

const makeAddStockRequest = (): HttpRequest => ({
  body: {
    modelName: 'any_name',
    color: 'any_color',
    quantity: 1
  }
})

const makeAddStockStub = (): AddStock => {
  class AddStockStub implements AddStock {
    async execute(params: AddStock.Params): Promise<void> {}
  }
  return new AddStockStub()
}

type SutTypes = {
  sut: AddStockController
  addStockStub: AddStock
}

const makeSut = (): SutTypes => {
  const addStockStub = makeAddStockStub()
  const sut = new AddStockController(addStockStub)
  return {
    sut,
    addStockStub
  }
}
describe('AddStockController', () => {
  test('Should call AddStock with correct values', async () => {
    const { sut, addStockStub } = makeSut()
    const addSpy = jest.spyOn(addStockStub, 'execute')
    await sut.handle(makeAddStockRequest())
    expect(addSpy).toHaveBeenCalledWith(makeAddStockRequest().body)
  })

  test('Should throw if AddStock throws', async () => {
    const { sut, addStockStub } = makeSut()
    jest.spyOn(addStockStub, 'execute').mockRejectedValueOnce(new Error())
    const promise = sut.handle(makeAddStockRequest())
    await expect(promise).rejects.toThrow()
  })
})
