import { VerifyToken } from '../../domain/usecases/authentication/verify-token'
import { forbidden, serverError } from '../helpers/http-helper'
import { HttpRequest } from '../protocols'
import { AuthMiddleware } from './auth-middleware'
import { AccessDeniedError } from '../errors'

const makeRequest = (): HttpRequest => ({
  headers: {
    'x-access-token': 'any_token'
  }
})

const makeVerifyTokenStub = (): VerifyToken => {
  class VerifyTokenStub implements VerifyToken {
    async execute(): Promise<VerifyToken.Result> {}
  }
  return new VerifyTokenStub()
}

type SutTypes = {
  sut: AuthMiddleware
  verifyTokenStub: VerifyToken
}

const makeSut = (): SutTypes => {
  const verifyTokenStub = makeVerifyTokenStub()
  const sut = new AuthMiddleware(verifyTokenStub)
  return {
    sut,
    verifyTokenStub
  }
}

describe('Auth Middleware', () => {
  test('Should call VerifyToken with correct values', async () => {
    const { sut, verifyTokenStub } = makeSut()
    const verifyTokenSpy = jest.spyOn(verifyTokenStub, 'execute')
    await sut.handle(makeRequest())
    expect(verifyTokenSpy).toHaveBeenCalledWith('any_token')
  })

  test('Should return 403 if no x-access-token is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should return 500 if VerifyToken throws', async () => {
    const { sut, verifyTokenStub } = makeSut()
    jest.spyOn(verifyTokenStub, 'execute').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(makeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
