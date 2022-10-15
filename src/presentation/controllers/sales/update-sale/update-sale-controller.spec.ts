import { UpdateSale } from '../../../../domain/usecases/sales/update-sale'
import { HttpRequest, Validation } from '../../../protocols'
import { UpdateSaleController } from './update-sale-controller'
import MockDate from 'mockdate'
import {
  badRequest,
  noContent,
  serverError
} from '../../../helpers/http-helper'
import { InvalidParamError, MissingParamError } from '../../../errors'

const makeFakeSaleRequest = (): HttpRequest => ({
  params: {
    saleId: 'any_id'
  },
  body: {
    data: {
      clientName: 'any_client_name',
      deliveryFee: 25,
      paymentForm: 'CREDIT CARD',
      products: [
        {
          modelName: 'any_model_name',
          description: [
            {
              color: 'any_color_name',
              quantity: 1
            }
          ]
        }
      ],
      soldAt: new Date(),
      total: 110
    }
  }
})

const makeUpdateSaleRequest = (): UpdateSale.Params => ({
  saleId: 'any_id',
  data: {
    clientName: 'any_client_name',
    deliveryFee: 25,
    paymentForm: 'CREDIT CARD',
    products: [
      {
        modelName: 'any_model_name',
        description: [
          {
            color: 'any_color_name',
            quantity: 1
          }
        ]
      }
    ],
    soldAt: new Date(),
    total: 110
  }
})

const makeUpdateSaleStub = (): UpdateSale => {
  class UpdateSaleStub implements UpdateSale {
    async execute(params: UpdateSale.Params): Promise<UpdateSale.Result> {
      return Promise.resolve('ok')
    }
  }
  return new UpdateSaleStub()
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
  sut: UpdateSaleController
  updateSaleStub: UpdateSale
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const updateSaleStub = makeUpdateSaleStub()
  const validationStub = makeValidationStub()
  const sut = new UpdateSaleController(updateSaleStub, validationStub)
  return {
    sut,
    updateSaleStub,
    validationStub
  }
}

describe('UpdateSaleController', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call UpdateSale with correct values', async () => {
    const { sut, updateSaleStub } = makeSut()
    const updateSaleSpy = jest.spyOn(updateSaleStub, 'execute')
    await sut.handle(makeFakeSaleRequest())
    expect(updateSaleSpy).toHaveBeenCalledWith(makeUpdateSaleRequest())
  })

  test('Should return 500 if UpdateSale throws', async () => {
    const { sut, updateSaleStub } = makeSut()
    jest.spyOn(updateSaleStub, 'execute').mockRejectedValueOnce(new Error())
    const httpRequest = await sut.handle(makeFakeSaleRequest())
    expect(httpRequest).toEqual(serverError(new Error()))
  })

  test('Should return 400 if UpdateSale returns null', async () => {
    const { sut, updateSaleStub } = makeSut()
    jest.spyOn(updateSaleStub, 'execute').mockResolvedValueOnce(null)
    const httpRequest = await sut.handle(makeFakeSaleRequest())
    expect(httpRequest).toEqual(badRequest(new InvalidParamError('saleId')))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpRequest = await sut.handle(makeFakeSaleRequest())
    expect(httpRequest).toEqual(noContent())
  })

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(makeFakeSaleRequest())
    expect(validationSpy).toHaveBeenCalledWith(makeFakeSaleRequest().body.data)
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
