import { CreateSale } from '../../../../domain/usecases/sales/create-sales'
import { CheckNameStockRepository } from '../../../protocols/db/stock/check-name-stock-repository'
import { CheckQuantityStockRepository } from '../../../protocols/db/stock/check-quantity-stock-repository'
import { CreateSalesUseCase } from './create-sales-use-case'
import { CreateSalesRepository } from '../../../protocols/db/sales/create-sales-repository'
import MockDate from 'mockdate'

const makeSalesRequest = (): CreateSale.Params => ({
  clientName: 'any_client_name',
  deliveryFee: 15.0,
  paymentForm: 'MASTER CARD CREDIT',
  products: [
    {
      modelName: 'any_model_name',
      description: [
        {
          color: 'any_color',
          quantity: 2
        }
      ]
    },
    {
      modelName: 'other_model_name',
      description: [
        {
          color: 'other_color',
          quantity: 5
        }
      ]
    }
  ],
  description: 'any_description',
  soldAt: new Date(),
  total: 100.0
})

const makeCheckNameStockRepositoryStub = (): CheckNameStockRepository => {
  class CheckNameStockRepositoryStub implements CheckNameStockRepository {
    async checkStock(
      data: CheckNameStockRepository.Params
    ): Promise<CheckNameStockRepository.Result> {
      return Promise.resolve(true)
    }
  }
  return new CheckNameStockRepositoryStub()
}

const makeCheckQuantityStockRepositoryStub =
  (): CheckQuantityStockRepository => {
    class CheckQuantityStockRepositoryStub
      implements CheckQuantityStockRepository
    {
      async checkStockQuantity(
        data: CheckQuantityStockRepository.Params
      ): Promise<CheckQuantityStockRepository.Result> {
        return Promise.resolve(true)
      }
    }
    return new CheckQuantityStockRepositoryStub()
  }

const makeCreateSalesRepositoryStub = (): CreateSalesRepository => {
  class CreateSalesRepositoryStub implements CreateSalesRepository {
    async create(
      data: CreateSalesRepository.Params
    ): Promise<CreateSalesRepository.Result> {
      return Promise.resolve()
    }
  }
  return new CreateSalesRepositoryStub()
}

type SutTypes = {
  sut: CreateSalesUseCase
  checkNameStockRepositoryStub: CheckNameStockRepository
  checkQuantityStockRepositoryStub: CheckQuantityStockRepository
  createSalesRepositoryStub: CreateSalesRepository
}

const makeSut = (): SutTypes => {
  const checkNameStockRepositoryStub = makeCheckNameStockRepositoryStub()
  const checkQuantityStockRepositoryStub =
    makeCheckQuantityStockRepositoryStub()
  const createSalesRepositoryStub = makeCreateSalesRepositoryStub()
  const sut = new CreateSalesUseCase(
    checkNameStockRepositoryStub,
    checkQuantityStockRepositoryStub,
    createSalesRepositoryStub
  )
  return {
    sut,
    checkNameStockRepositoryStub,
    checkQuantityStockRepositoryStub,
    createSalesRepositoryStub
  }
}

describe('AddSalesUseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call CheckNameStockRepository with correct value', async () => {
    const { sut, checkNameStockRepositoryStub } = makeSut()
    const getStockSpy = jest.spyOn(checkNameStockRepositoryStub, 'checkStock')
    await sut.execute(makeSalesRequest())
    expect(getStockSpy).toHaveBeenCalledWith(
      makeSalesRequest().products.map(({ modelName }) => modelName)
    )
  })

  test('Should throw if CheckNameStockRepository throws', async () => {
    const { sut, checkNameStockRepositoryStub } = makeSut()
    jest
      .spyOn(checkNameStockRepositoryStub, 'checkStock')
      .mockRejectedValueOnce(new Error())
    const promise = sut.execute(makeSalesRequest())
    await expect(promise).rejects.toThrow(new Error())
  })

  test('Should return a error if CheckNameStockRepository returns false', async () => {
    const { sut, checkNameStockRepositoryStub } = makeSut()
    jest
      .spyOn(checkNameStockRepositoryStub, 'checkStock')
      .mockReturnValueOnce(Promise.resolve(false))
    const promise = await sut.execute(makeSalesRequest())
    expect(promise).toBeNull()
  })

  test('Should call CheckQuantityStockRepository with correct value', async () => {
    const { sut, checkQuantityStockRepositoryStub } = makeSut()
    const getStockSpy = jest.spyOn(
      checkQuantityStockRepositoryStub,
      'checkStockQuantity'
    )
    await sut.execute(makeSalesRequest())
    expect(getStockSpy).toHaveBeenCalledWith(makeSalesRequest().products)
  })

  test('Should throw if CheckQuantityStockRepository throws', async () => {
    const { sut, checkQuantityStockRepositoryStub } = makeSut()
    jest
      .spyOn(checkQuantityStockRepositoryStub, 'checkStockQuantity')
      .mockRejectedValueOnce(new Error())
    const promise = sut.execute(makeSalesRequest())
    await expect(promise).rejects.toThrow(new Error())
  })

  test('Should return null if CheckQuantityStockRepository returns false', async () => {
    const { sut, checkQuantityStockRepositoryStub } = makeSut()
    jest
      .spyOn(checkQuantityStockRepositoryStub, 'checkStockQuantity')
      .mockReturnValueOnce(Promise.resolve(false))
    const promise = await sut.execute(makeSalesRequest())
    expect(promise).toBeNull()
  })

  test('Should call CreateSalesRepository with correct value', async () => {
    const { sut, createSalesRepositoryStub } = makeSut()
    const createSalesSpy = jest.spyOn(createSalesRepositoryStub, 'create')
    await sut.execute(makeSalesRequest())
    expect(createSalesSpy).toHaveBeenCalledWith(makeSalesRequest())
  })

  test('Should throw if CreateSalesRepository throws', async () => {
    const { sut, createSalesRepositoryStub } = makeSut()
    jest
      .spyOn(createSalesRepositoryStub, 'create')
      .mockRejectedValueOnce(new Error())
    const promise = sut.execute(makeSalesRequest())
    await expect(promise).rejects.toThrow(new Error())
  })
})
