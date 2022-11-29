import { VerifyToken } from '../../domain/usecases/authentication/verify-token'
import { AuthMiddleware } from './auth-middleware'

describe('Auth Middleware', () => {
  test('Should call VerifyToken with correct values', async () => {
    class VerifyTokenStub implements VerifyToken {
      async execute(): Promise<VerifyToken.Result> {}
    }
    const verifyTokenStub = new VerifyTokenStub()
    const sut = new AuthMiddleware(verifyTokenStub)
    const verifyTokenSpy = jest.spyOn(verifyTokenStub, 'execute')
    await sut.handle({
      headers: {
        'x-access-token': 'any_token'
      }
    })
    expect(verifyTokenSpy).toHaveBeenCalledWith('any_token')
  })
})
