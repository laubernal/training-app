export interface IUseCase<T> {
    execute(): T;
}