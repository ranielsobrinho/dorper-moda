import { UpdateStock } from '../../../../domain/usecases/stock/update-stock'
import { InvalidParamError } from '../../../errors'
import { forbidden, noContent, serverError } from '../../../helpers/http-helper'
import { Validation } from '../../../protocols'
import { HttpRequest } from '../../../protocols/http'
import { UpdateStockController } from './update-stock-controller'

const makeStockDataRequest = (): HttpRequest => ({
  params: {
    stockId: 'any_id'
  },
  body: {
    data: {
      modelName: 'any_name',
      color: 'any_color',
      quantity: 1
    }
  }
})

const makeUpdateStockStub = (): UpdateStock => {
  class UpdateStockStub implements UpdateStock {
    async execute(params: UpdateStock.Params): Promise<UpdateStock.Result> {
      return Promise.resolve('Updated')
    }
  }
  return new UpdateStockStub()
}

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

type SutTypes = {
  sut: UpdateStockController
  updateStockStub: UpdateStock
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const updateStockStub = makeUpdateStockStub()
  const validationStub = makeValidationStub()
  const sut = new UpdateStockController(updateStockStub, validationStub)
  return {
    sut,
    updateStockStub,
    validationStub
  }
}

describe('UpdateStockController', () => {
  test('Should call UpdateStock with correct values', async () => {
    const { sut, updateStockStub } = makeSut()
    const updateSpy = jest.spyOn(updateStockStub, 'execute')
    await sut.handle(makeStockDataRequest())
    expect(updateSpy).toHaveBeenCalledWith({
      stockId: 'any_id',
      data: {
        modelName: 'any_name',
        color: 'any_color',
        quantity: 1
      }
    })
  })

  test('Should return 500 if UpdateStock throws', async () => {
    const { sut, updateStockStub } = makeSut()
    jest.spyOn(updateStockStub, 'execute').mockRejectedValueOnce(new Error())
    const promise = await sut.handle(makeStockDataRequest())
    expect(promise).toEqual(serverError(new Error()))
  })

  test('Should return 403 if UpdateStock returns null', async () => {
    const { sut, updateStockStub } = makeSut()
    jest.spyOn(updateStockStub, 'execute').mockResolvedValueOnce(null)
    const httpResponse = await sut.handle(makeStockDataRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('stockId')))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeStockDataRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(makeStockDataRequest())
    expect(validationSpy).toHaveBeenCalledWith(makeStockDataRequest().body.data)
  })
})
