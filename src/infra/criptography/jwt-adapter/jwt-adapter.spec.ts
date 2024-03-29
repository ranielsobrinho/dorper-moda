import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  async sign(): Promise<string> {
    return Promise.resolve('any_token')
  },
  async verify(): Promise<string> {
    return Promise.resolve('any_value')
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

    test('Should throw if sign throws', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.generate('any_id')
      await expect(promise).rejects.toThrow()
    })

    test('Should return accessToken on success', async () => {
      const sut = makeSut()
      const accessToken = await sut.generate('any_id')
      expect(accessToken).toBe('any_token')
    })
  })

  describe('verify', () => {
    test('Should call verify with correct values', async () => {
      const sut = makeSut()
      const jwtAdapterSpy = jest.spyOn(jwt, 'verify')
      await sut.verify('any_token')
      expect(jwtAdapterSpy).toHaveBeenCalledWith('any_token', 'secret')
    })

    test('Should throw if verify throws', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.verify('any_token')
      await expect(promise).rejects.toThrow()
    })

    test('Should return a value on verify success', async () => {
      const sut = makeSut()
      const verifiedToken = await sut.verify('any_token')
      expect(verifiedToken).toBe('any_value')
    })
  })
})
