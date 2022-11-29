import { TokenVerify } from '../../../protocols/criptography/token-verify'
import { VerifyTokenUseCase } from './verify-token-use-case'

const makeDecrypterStub = (): TokenVerify => {
  class DecrypterStub implements TokenVerify {
    async verify(): Promise<string | null> {
      return Promise.resolve('any_value')
    }
  }
  return new DecrypterStub()
}

type SutTypes = {
  sut: VerifyTokenUseCase
  decrypterStub: TokenVerify
}

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypterStub()
  const sut = new VerifyTokenUseCase(decrypterStub)
  return {
    sut,
    decrypterStub
  }
}

describe('VerifyTokenUseCase', () => {
  test('Should call Decrypter with correct value', async () => {
    const { sut, decrypterStub } = makeSut()
    const verifyTokenSpy = jest.spyOn(decrypterStub, 'verify')
    await sut.execute('any_token')
    expect(verifyTokenSpy).toHaveBeenCalledWith('any_token')
  })

  test('Should return null if Decrypter returns null', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'verify').mockResolvedValueOnce(null)
    const verifiedToken = await sut.execute('any_token')
    expect(verifiedToken).toBeNull()
  })
})
