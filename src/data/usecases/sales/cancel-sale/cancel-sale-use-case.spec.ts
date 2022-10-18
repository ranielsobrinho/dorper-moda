import { GetSaleByIdRepository } from '../../../protocols/db/sales/get-sale-by-id-repository'
import { CancelSaleRepository } from '../../../protocols/db/sales/cancel-sale-repository'
import { RefundStockRepository } from '../../../protocols/db/stock/refund-stock-repository'
import { CancelSaleUseCase } from './cancel-sale-use-case'

const makeGetSale = (): GetSaleByIdRepository.Result => ({
  id: 'any_id',
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
})

const makeGetSaleByIdRepository = (): GetSaleByIdRepository => {
  class GetSaleByIdRepositoryStub implements GetSaleByIdRepository {
    async getById(saleId: string): Promise<GetSaleByIdRepository.Result> {
      return makeGetSale()
    }
  }
  return new GetSaleByIdRepositoryStub()
}

const makeRefundStockRepository = (): RefundStockRepository => {
  class RefundStockRepositoryStub implements RefundStockRepository {
    async refundStock(
      params: RefundStockRepository.Params
    ): Promise<RefundStockRepository.Result> {
      return true
    }
  }
  return new RefundStockRepositoryStub()
}

const makeCancelSaleRepository = (): CancelSaleRepository => {
  class CancelSaleRepositoryStub implements CancelSaleRepository {
    async cancelSale(saleId: string): Promise<CancelSaleRepository.Result> {
      return true
    }
  }
  return new CancelSaleRepositoryStub()
}

type SutTypes = {
  sut: CancelSaleUseCase
  getSaleByIdRepositoryStub: GetSaleByIdRepository
  cancelSaleRepositoryStub: CancelSaleRepository
  refundStockRepositoryStub: RefundStockRepository
}

const makeSut = (): SutTypes => {
  const getSaleByIdRepositoryStub = makeGetSaleByIdRepository()
  const refundStockRepositoryStub = makeRefundStockRepository()
  const cancelSaleRepositoryStub = makeCancelSaleRepository()
  const sut = new CancelSaleUseCase(
    getSaleByIdRepositoryStub,
    refundStockRepositoryStub,
    cancelSaleRepositoryStub
  )
  return {
    sut,
    getSaleByIdRepositoryStub,
    cancelSaleRepositoryStub,
    refundStockRepositoryStub
  }
}

describe('CancelSaleUseCase', () => {
  test('Should call GetSaleByIdRepository with correct values', async () => {
    const { sut, getSaleByIdRepositoryStub } = makeSut()
    const getSaleSpy = jest.spyOn(getSaleByIdRepositoryStub, 'getById')
    await sut.cancel('any_id')
    expect(getSaleSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should throw if GetSaleByIdRepository throws', async () => {
    const { sut, getSaleByIdRepositoryStub } = makeSut()
    jest
      .spyOn(getSaleByIdRepositoryStub, 'getById')
      .mockRejectedValueOnce(new Error())
    const promise = sut.cancel('any_id')
    await expect(promise).rejects.toThrow()
  })

  test('Should call RefundStockRepository with correct values', async () => {
    const { sut, refundStockRepositoryStub } = makeSut()
    const refundStockSpy = jest.spyOn(refundStockRepositoryStub, 'refundStock')
    await sut.cancel('any_id')
    expect(refundStockSpy).toHaveBeenCalledWith(makeGetSale()?.products)
  })

  test('Should throw if RefundStockRepository throws', async () => {
    const { sut, refundStockRepositoryStub } = makeSut()
    jest
      .spyOn(refundStockRepositoryStub, 'refundStock')
      .mockRejectedValueOnce(new Error())
    const promise = sut.cancel('any_id')
    await expect(promise).rejects.toThrow()
  })

  test('Should throw if RefundStockRepository returns false', async () => {
    const { sut, refundStockRepositoryStub } = makeSut()
    jest
      .spyOn(refundStockRepositoryStub, 'refundStock')
      .mockResolvedValueOnce(false)
    const cancelSale = sut.cancel('any_id')
    await expect(cancelSale).rejects.toThrow(
      new Error('Não foi possível retornar os valores iniciais do produto')
    )
  })

  test('Should call CancelSaleRepository with correct values', async () => {
    const { sut, cancelSaleRepositoryStub } = makeSut()
    const cancelSaleSpy = jest.spyOn(cancelSaleRepositoryStub, 'cancelSale')
    await sut.cancel('any_id')
    expect(cancelSaleSpy).toHaveBeenCalledWith(makeGetSale()?.id)
  })

  test('Should throw if CancelSaleRepository throws', async () => {
    const { sut, cancelSaleRepositoryStub } = makeSut()
    jest
      .spyOn(cancelSaleRepositoryStub, 'cancelSale')
      .mockRejectedValueOnce(new Error())
    const promise = sut.cancel('any_id')
    await expect(promise).rejects.toThrow()
  })

  test('Should throw if CancelSaleRepository returns false', async () => {
    const { sut, cancelSaleRepositoryStub } = makeSut()
    jest
      .spyOn(cancelSaleRepositoryStub, 'cancelSale')
      .mockResolvedValueOnce(false)
    const cancelSale = sut.cancel('any_id')
    await expect(cancelSale).rejects.toThrow(
      new Error('Não foi possível deletar essa venda')
    )
  })
})
