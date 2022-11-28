import { Authentication } from '../../../../domain/usecases/account/authentication'
import { HttpRequest } from '../../../protocols'
import { LoginController } from './login-controller'
import { serverError, unauthorized, ok } from '../../../helpers/http-helper'

const makeAuthenticationStub = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth(): Promise<Authentication.Result> {
      return Promise.resolve('any_token')
    }
  }
  return new AuthenticationStub()
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    username: 'any_username',
    password: 'any_password'
  }
})

type SutTypes = {
  sut: LoginController
  authenticationStub: Authentication
}

const makeSut = (): SutTypes => {
  const authenticationStub = makeAuthenticationStub()
  const sut = new LoginController(authenticationStub)
  return {
    sut,
    authenticationStub
  }
}

describe('LoginController', () => {
  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authenticationSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(makeFakeRequest())
    expect(authenticationSpy).toHaveBeenCalledWith({
      username: 'any_username',
      password: 'any_password'
    })
  })

  test('Should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockResolvedValueOnce(null)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(unauthorized())
  })

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok('any_token'))
  })
})
