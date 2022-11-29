import { VerifyToken } from '../../domain/usecases/authentication/verify-token'
import { HttpRequest } from '../protocols'
import { AuthMiddleware } from './auth-middleware'

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
})
