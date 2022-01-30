export interface IPostgreRepository<K> {
  save(item: K): Promise<void>;
  getOneBy(column: string, value: string): Promise<K | undefined>;
  getAllBy(column: string, value: string): Promise<K | undefined>;
  delete(column: string, value: string): Promise<void>;
  update(column: string[], values: string[], columnId: string, id: string): Promise<K | undefined>;
}
