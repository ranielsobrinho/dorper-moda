import { makeLoadStockByNameController } from './load-stock-by-name-factory'
import { Validation } from '../../../../../presentation/protocols/validation'
import {
  RequiredFieldValidation,
  ValidationComposite
} from '../../../../../validation/validators'

jest.mock('../../../../../validation/validators/validation-composite')

describe('AddStockValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoadStockByNameController()
    const validations: Validation[] = []
    for (const field of ['stockName']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
