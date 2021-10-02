export interface IMapper<T, K> {
    toDomain(item: T): K;
    toData(item: K): T;
}