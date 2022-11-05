import { LoadStockByNameController } from './load-stock-by-name-controller'
import { LoadStockByName } from '../../../../domain/usecases/stock/load-stock-by-name'
import { HttpRequest } from '../../../protocols/http'
import { StockModel } from '../../../../domain/models/stock'
import {
  forbidden,
  serverError,
  ok,
  badRequest
} from '../../../helpers/http-helper'
import { InvalidParamError, MissingParamError } from '../../../errors'
import { Validation } from '../../../protocols'

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

const makeHttpRequest = (): HttpRequest => ({
  body: {
    stockName: 'any_name'
  }
})

const makeLoadStockByNameStub = (): LoadStockByName => {
  class LoadStockByNameStub implements LoadStockByName {
    async loadByName(stockName: string): Promise<LoadStockByName.Result> {
      return Promise.resolve(makeFakeStockModel())
    }
  }
  return new LoadStockByNameStub()
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
  sut: LoadStockByNameController
  loadStockByNameStub: LoadStockByName
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const loadStockByNameStub = makeLoadStockByNameStub()
  const validationStub = makeValidationStub()
  const sut = new LoadStockByNameController(loadStockByNameStub, validationStub)
  return {
    sut,
    loadStockByNameStub,
    validationStub
  }
}

describe('LoadStockByNameController', () => {
  test('Should call LoadStockByName with correct value', async () => {
    const { sut, loadStockByNameStub } = makeSut()
    const loadStockByNameSpy = jest.spyOn(loadStockByNameStub, 'loadByName')
    await sut.handle(makeHttpRequest())
    expect(loadStockByNameSpy).toHaveBeenCalledWith(
      makeHttpRequest().body.stockName
    )
  })

  test('Should return 500 if LoadStockByName throws', async () => {
    const { sut, loadStockByNameStub } = makeSut()
    jest
      .spyOn(loadStockByNameStub, 'loadByName')
      .mockReturnValueOnce(Promise.reject(new Error()))
    const httpResponse = await sut.handle(makeHttpRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 403 if LoadStockByName returns null', async () => {
    const { sut, loadStockByNameStub } = makeSut()
    jest
      .spyOn(loadStockByNameStub, 'loadByName')
      .mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(makeHttpRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('stockName')))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeHttpRequest())
    expect(httpResponse).toEqual(ok(makeFakeStockModel()))
  })
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(makeHttpRequest())
    expect(validationSpy).toHaveBeenCalledWith(makeHttpRequest().body)
  })

  test('Should return 400 if Validation returns a error', async () => {
    const { sut, validationStub } = makeSut()
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeHttpRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
