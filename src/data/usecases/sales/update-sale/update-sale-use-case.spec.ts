import { UpdateSale } from '../../../../domain/usecases/sales/update-sale'
import { GetSaleByIdRepository } from '../../../protocols/db/sales/get-sale-by-id-repository'
import { UpdateSaleRepository } from '../../../protocols/db/sales/update-sale-repository'
import { UpdateSaleUseCase } from './update-sale-use-case'
import MockDate from 'mockdate'

const makeUpdateRequest = (): UpdateSale.Params => ({
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

const makeGetSaleByIdRepositoryStub = (): GetSaleByIdRepository => {
  class GetSaleByIdRepositoryStub implements GetSaleByIdRepository {
    async getById(saleId: string): Promise<GetSaleByIdRepository.Result> {
      return Promise.resolve(makeGetSale())
    }
  }
  return new GetSaleByIdRepositoryStub()
}

const makeUpdateSaleRepositoryStub = (): UpdateSaleRepository => {
  class UpdateSaleRepositoryStub implements UpdateSaleRepository {
    async update(
      params: UpdateSaleRepository.Params
    ): Promise<UpdateSaleRepository.Result> {}
  }
  return new UpdateSaleRepositoryStub()
}

type SutTypes = {
  sut: UpdateSaleUseCase
  getSaleByIdRepositoryStub: GetSaleByIdRepository
  updateSaleRepositoryStub: UpdateSaleRepository
}

const makeSut = (): SutTypes => {
  const getSaleByIdRepositoryStub = makeGetSaleByIdRepositoryStub()
  const updateSaleRepositoryStub = makeUpdateSaleRepositoryStub()
  const sut = new UpdateSaleUseCase(
    getSaleByIdRepositoryStub,
    updateSaleRepositoryStub
  )
  return {
    sut,
    getSaleByIdRepositoryStub,
    updateSaleRepositoryStub
  }
}

describe('UpdateSaleUseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call GetSaleByIdRepository with correct values', async () => {
    const { sut, getSaleByIdRepositoryStub } = makeSut()
    const getByIdSpy = jest.spyOn(getSaleByIdRepositoryStub, 'getById')
    await sut.execute(makeUpdateRequest())
    expect(getByIdSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should throw if GetSaleByIdRepository throws', async () => {
    const { sut, getSaleByIdRepositoryStub } = makeSut()
    jest
      .spyOn(getSaleByIdRepositoryStub, 'getById')
      .mockRejectedValueOnce(new Error())
    const promise = sut.execute(makeUpdateRequest())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if GetSaleByIdRepository returns null', async () => {
    const { sut, getSaleByIdRepositoryStub } = makeSut()
    jest.spyOn(getSaleByIdRepositoryStub, 'getById').mockResolvedValueOnce(null)
    const saleUpdate = await sut.execute(makeUpdateRequest())
    expect(saleUpdate).toEqual(null)
  })

  test('Should call UpdateSaleRepository with correct values', async () => {
    const { sut, updateSaleRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateSaleRepositoryStub, 'update')
    await sut.execute(makeUpdateRequest())
    expect(updateSpy).toHaveBeenCalledWith(makeUpdateRequest())
  })

  test('Should throw if UpdateSaleRepository throws', async () => {
    const { sut, updateSaleRepositoryStub } = makeSut()
    jest
      .spyOn(updateSaleRepositoryStub, 'update')
      .mockRejectedValueOnce(new Error())
    const promise = sut.execute(makeUpdateRequest())
    await expect(promise).rejects.toThrow()
  })

  test('Should return ok on success', async () => {
    const { sut } = makeSut()
    const update = await sut.execute(makeUpdateRequest())
    expect(update).toBe('ok')
  })
})
