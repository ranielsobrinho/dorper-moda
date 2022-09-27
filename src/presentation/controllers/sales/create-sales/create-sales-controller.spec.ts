import { CreateSale } from '../../../../domain/usecases/sales/create-sales'
import { CreateSalesController } from './create-sales-controller'
import MockDate from 'mockdate'
import { HttpRequest, Validation } from '../../../protocols'
import {
  badRequest,
  noContent,
  serverError
} from '../../../helpers/http-helper'
import { MissingParamError } from '../../../errors'

const makeFakeSaleRequest = (): HttpRequest => ({
  body: {
    clientName: 'any_client_name',
    deliveryFee: 25,
    paymentForm: 'CREDIT CARD',
    products: [
      {
        modelName: 'any_model_name',
        color: 'any_color_name',
        quantity: 1
      }
    ],
    soldAt: new Date(),
    total: 110
  }
})

const makeCreateSalesStub = (): CreateSale => {
  class CreateSalesStub implements CreateSale {
    async execute(params: CreateSale.Params): Promise<CreateSale.Result> {
      return Promise.resolve()
    }
  }
  return new CreateSalesStub()
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
  sut: CreateSalesController
  createSalesStub: CreateSale
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const createSalesStub = makeCreateSalesStub()
  const validationStub = makeValidationStub()
  const sut = new CreateSalesController(createSalesStub, validationStub)
  return {
    sut,
    createSalesStub,
    validationStub
  }
}

describe('CreateSalesController', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
  test('Should call CreateSale with correct values', async () => {
    const { sut, createSalesStub } = makeSut()
    const createSalesSpy = jest.spyOn(createSalesStub, 'execute')
    await sut.handle(makeFakeSaleRequest())
    expect(createSalesSpy).toHaveBeenCalledWith(makeFakeSaleRequest().body)
  })

  test('Should return 500 if CreateSale throws', async () => {
    const { sut, createSalesStub } = makeSut()
    jest
      .spyOn(createSalesStub, 'execute')
      .mockReturnValueOnce(Promise.reject(new Error()))
    const httpResponse = await sut.handle(makeFakeSaleRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeSaleRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 400 if Validation returns a error', async () => {
    const { sut, validationStub } = makeSut()
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeSaleRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
