export interface IUseCase<T> {
  execute(...args: any[]): T;
}
