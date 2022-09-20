export interface DeleteStock {
  execute(stockId: string): Promise<void>
}
