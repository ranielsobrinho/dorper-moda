import { AddStock } from '../../../../domain/usecases/stock/add-stock'
import { HttpRequest, Validation } from '../../../protocols'
import { AddStockController } from './add-stock-controller'
import { serverError } from '../../../helpers/http-helper'

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

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    async validate(input: any): Promise<Error | null> {
      return Promise.resolve(null)
    }
  }
  return new ValidationStub()
}

type SutTypes = {
  sut: AddStockController
  addStockStub: AddStock
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const addStockStub = makeAddStockStub()
  const validationStub = makeValidationStub()
  const sut = new AddStockController(addStockStub, validationStub)
  return {
    sut,
    addStockStub,
    validationStub
  }
}
describe('AddStockController', () => {
  test('Should call AddStock with correct values', async () => {
    const { sut, addStockStub } = makeSut()
    const addSpy = jest.spyOn(addStockStub, 'execute')
    await sut.handle(makeAddStockRequest())
    expect(addSpy).toHaveBeenCalledWith(makeAddStockRequest().body)
  })

  test('Should return 500 if AddStock throws', async () => {
    const { sut, addStockStub } = makeSut()
    jest.spyOn(addStockStub, 'execute').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeAddStockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(makeAddStockRequest())
    expect(validationSpy).toHaveBeenCalledWith(makeAddStockRequest().body)
  })
})
