export interface IFsRepository<K> {
  save(item: K): void;
  getOneBy(propName: keyof K, value: string): K | undefined;
  getAllBy(propName: keyof K, value: string): K[];
}
