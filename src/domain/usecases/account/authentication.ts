type AuthenticationModel = {
  username: string
  password: string
}

export interface Authentication {
  auth(params: Authentication.Params): Promise<string>
}

export namespace Authentication {
  export type Params = AuthenticationModel
}
