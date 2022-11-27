import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  async sign(): Promise<string> {
    return Promise.resolve('any_token')
  }
}))

const makeSut = (): JwtAdapter => {
  return new JwtAdapter('secret')
}

describe('JwtAdapter', () => {
  describe('sign', () => {
    test('Should call sign with correct values', async () => {
      const sut = makeSut()
      const jwtAdapterSpy = jest.spyOn(jwt, 'sign')
      await sut.generate('any_id')
      expect(jwtAdapterSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
    })
  })
})
