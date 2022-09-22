export interface DeleteStockRepository {
  delete(stockId: string): Promise<number>
}
