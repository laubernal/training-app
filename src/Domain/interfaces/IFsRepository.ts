export interface IFsRepository<K> {
    getOneBy(propName: keyof K, value: string): K | undefined;
    save(item: K): void;
}