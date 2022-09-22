export interface DeleteStock {
  execute(stockId: string): Promise<string | null>
}
