import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return Promise.resolve('hash')
  },

  async compare(): Promise<boolean> {
    return Promise.resolve(true)
  }
}))

const salt = 12

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('BcryptAdapter', () => {
  describe('hash()', () => {
    test('Should call hash with correct value', async () => {
      const sut = makeSut()
      const hashSpy = jest.spyOn(bcrypt, 'hash')
      await sut.generate('any_value')
      expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
    })

    test('Should throw if hash throws', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'hash').mockImplementationOnce(async () => {
        return Promise.reject(new Error())
      })
      const promise = sut.generate('any_value')
      await expect(promise).rejects.toThrow()
    })

    test('Should return a hash on success', async () => {
      const sut = makeSut()
      const hash = await sut.generate('any_value')
      expect(hash).toBe('hash')
    })
  })

  describe('compare()', () => {
    test('Should call compare with correct value', async () => {
      const sut = makeSut()
      const hashSpy = jest.spyOn(bcrypt, 'compare')
      await sut.compare('any_value', 'any_hash')
      expect(hashSpy).toHaveBeenCalledWith('any_value', 'any_hash')
    })

    test('Should throw if compare throws', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(async () => {
        return Promise.reject(new Error())
      })
      const promise = sut.compare('any_value', 'any_hash')
      await expect(promise).rejects.toThrow()
    })
  })
})
