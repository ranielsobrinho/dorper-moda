export interface DeleteClientRepository {
  delete(cpf: string): Promise<DeleteClientRepository.Result>
}

export namespace DeleteClientRepository {
  export type Result = string | null
}
