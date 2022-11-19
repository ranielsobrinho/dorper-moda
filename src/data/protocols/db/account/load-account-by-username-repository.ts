import { AccountModel } from '../../../../domain/models/account'

export interface LoadAccountByUsernameRepository {
  loadByUsername(
    username: string
  ): Promise<LoadAccountByUsernameRepository.Result>
}

export namespace LoadAccountByUsernameRepository {
  export type Result = AccountModel | null
}
