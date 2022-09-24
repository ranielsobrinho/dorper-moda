import { StockModel } from '../../../../domain/models/stock'
import { SalesModel } from '../../../../domain/models/sales'
import { LoadStockByNameRepository } from '../../../protocols/db/stock/loadStockByNameRepository'
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
    }
  ],
  soldAt: new Date(),
  total: 100.0
})

const makeLoadStockByNameRepositoryStub = (): LoadStockByNameRepository => {
  class LoadStockByNameRepositoryStub implements LoadStockByNameRepository {
    async loadByName(name: string): Promise<LoadStockByNameRepository.Result> {
      return Promise.resolve(makeStockData())
    }
  }
  return new LoadStockByNameRepositoryStub()
}

type SutTypes = {
  sut: CreateSalesUseCase
  loadStockByNameRepositoryStub: LoadStockByNameRepository
}

const makeSut = (): SutTypes => {
  const loadStockByNameRepositoryStub = makeLoadStockByNameRepositoryStub()
  const sut = new CreateSalesUseCase(loadStockByNameRepositoryStub)
  return {
    sut,
    loadStockByNameRepositoryStub
  }
}

describe('AddSalesUseCase', () => {
  test('Should call GetStockByNameRepository with correct value', async () => {
    const { sut, loadStockByNameRepositoryStub } = makeSut()
    const getStockSpy = jest.spyOn(loadStockByNameRepositoryStub, 'loadByName')
    await sut.execute(makeSalesRequest())
    expect(getStockSpy).toHaveBeenCalledWith('any_model_name')
  })

  test('Should throw if GetStockByNameRepository throws', async () => {
    const { sut, loadStockByNameRepositoryStub } = makeSut()
    jest
      .spyOn(loadStockByNameRepositoryStub, 'loadByName')
      .mockRejectedValueOnce(new Error())
    const promise = sut.execute(makeSalesRequest())
    await expect(promise).rejects.toThrow()
  })

  test('Should return a error if GetStockByNameRepository returns null', async () => {
    const { sut, loadStockByNameRepositoryStub } = makeSut()
    jest
      .spyOn(loadStockByNameRepositoryStub, 'loadByName')
      .mockResolvedValueOnce(null)
    const salesData = await sut.execute(makeSalesRequest())
    expect(salesData).toBeNull()
  })
})
