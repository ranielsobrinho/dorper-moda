import { TokenVerify } from '../../../protocols/criptography/token-verify'
import { VerifyTokenUseCase } from './verify-token-use-case'

describe('VerifyTokenUseCase', () => {
  test('Should call Decrypter with correct value', async () => {
    class DecrypterStub implements TokenVerify {
      async verify(): Promise<string> {
        return Promise.resolve('any_value')
      }
    }
    const decrypterStub = new DecrypterStub()
    const sut = new VerifyTokenUseCase(decrypterStub)
    const verifyTokenSpy = jest.spyOn(decrypterStub, 'verify')
    await sut.execute('any_token')
    expect(verifyTokenSpy).toHaveBeenCalledWith('any_token')
  })
})
