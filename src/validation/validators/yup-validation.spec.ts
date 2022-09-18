import { YupValidator } from '../protocols/yup-validator'
import { YupValidation } from './yup-validation'

const makeYupValidatorStub = (): YupValidator => {
  class YupValidatorStub implements YupValidator {
    async validate(input: any): Promise<Error | null> {
      return null
    }
  }
  return new YupValidatorStub()
}

type SutTypes = {
  sut: YupValidation
  yupValidatorStub: YupValidator
}

const makeSut = (): SutTypes => {
  const yupValidatorStub = makeYupValidatorStub()
  const sut = new YupValidation(yupValidatorStub)
  return {
    sut,
    yupValidatorStub
  }
}

describe('YupValidation', () => {
  test('Should call YupValidator with correct values', async () => {
    const { sut, yupValidatorStub } = makeSut()
    const validatorSpy = jest.spyOn(yupValidatorStub, 'validate')
    sut.validate({
      name: 'Raniel',
      age: 25
    })
    expect(validatorSpy).toHaveBeenCalledWith({
      name: 'Raniel',
      age: 25
    })
  })
})
