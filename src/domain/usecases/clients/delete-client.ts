export interface DeleteClient {
  execute(cpf: string): Promise<DeleteClient.Result>
}

export namespace DeleteClient {
  export type Result = string | null
}
