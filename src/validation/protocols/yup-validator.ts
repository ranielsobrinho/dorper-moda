export interface YupValidator {
  validate(input: any): Promise<Error | null>
}
