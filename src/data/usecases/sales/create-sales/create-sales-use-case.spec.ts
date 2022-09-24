import { StockModel } from '../../../../domain/models/stock'
import { SalesModel } from '../../../../domain/models/sales'
import { CheckNameStockRepository } from '../../../protocols/db/stock/checkNameStockRepository'
import { CheckQuantityStockRepository } from '../../../protocols/db/stock/checkQuantityStockRepository'
import { CreateSalesUseCase } from './create-sales-use-case'

const makeStockData = (): StockModel => ({
  id: 'any_id',
  modelName: 'any_name',
  color: 'any_color',
  quantity: 1
})

const makeSalesRequest = (): SalesModel => ({
  id: 'any_id',
  clientName: 'any_client_name',
  deliveryFee: 15.0,
  paymentForm: 'MASTER CARD CREDIT',
  products: [
    {
      modelName: 'any_model_name',
      color: 'any_color',
      quantity: 2
    },
    {
      modelName: 'other_model_name',
      color: 'other_color',
      quantity: 5
    }
  ],
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
      async checkStock(
        data: CheckQuantityStockRepository.Params
      ): Promise<CheckQuantityStockRepository.Result> {
        return Promise.resolve(true)
      }
    }
    return new CheckQuantityStockRepositoryStub()
  }

type SutTypes = {
  sut: CreateSalesUseCase
  checkNameStockRepositoryStub: CheckNameStockRepository
  checkQuantityStockRepositoryStub: CheckQuantityStockRepository
}

const makeSut = (): SutTypes => {
  const checkNameStockRepositoryStub = makeCheckNameStockRepositoryStub()
  const checkQuantityStockRepositoryStub =
    makeCheckQuantityStockRepositoryStub()
  const sut = new CreateSalesUseCase(
    checkNameStockRepositoryStub,
    checkQuantityStockRepositoryStub
  )
  return {
    sut,
    checkNameStockRepositoryStub,
    checkQuantityStockRepositoryStub
  }
}

describe('AddSalesUseCase', () => {
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
    const promise = sut.execute(makeSalesRequest())
    await expect(promise).rejects.toThrow(
      new Error('Algum nome de modelo não existe.')
    )
  })

  test('Should call CheckQuantityStockRepository with correct value', async () => {
    const { sut, checkQuantityStockRepositoryStub } = makeSut()
    const getStockSpy = jest.spyOn(
      checkQuantityStockRepositoryStub,
      'checkStock'
    )
    await sut.execute(makeSalesRequest())
    expect(getStockSpy).toHaveBeenCalledWith(
      makeSalesRequest().products.map((product) => {
        return {
          modelName: product.modelName,
          quantity: product.quantity
        }
      })
    )
  })
})
