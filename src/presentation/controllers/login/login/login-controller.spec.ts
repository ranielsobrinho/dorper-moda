import { Authentication } from '../../../../domain/usecases/account/authentication'
import { LoginController } from './login-controller'

describe('LoginController', () => {
  test('Should call Authentication with correct values', async () => {
    class AuthenticationStub implements Authentication {
      async auth(): Promise<Authentication.Result> {
        return Promise.resolve('any_token')
      }
    }
    const authenticationStub = new AuthenticationStub()
    const sut = new LoginController(authenticationStub)
    const authenticationSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle({
      body: {
        username: 'any_username',
        password: 'any_password'
      }
    })
    expect(authenticationSpy).toHaveBeenCalledWith({
      username: 'any_username',
      password: 'any_password'
    })
  })
})
