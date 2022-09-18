import { Validation } from '../../presentation/protocols'
import { YupValidator } from '../protocols/yup-validator'

export class YupValidation implements Validation {
  constructor(private readonly yupValidator: YupValidator) {}
  async validate(input: any): Promise<Error | null> {
    const error = await this.yupValidator.validate(input)
    if (error) {
      return error
    }
    return null
  }
}
