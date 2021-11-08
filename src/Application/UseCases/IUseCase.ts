export interface IUseCase<T> {
    execute(...args: string[] | any[]): T;
}