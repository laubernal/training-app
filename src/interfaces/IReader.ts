export interface IReader<T> {
  data: T[];
  read(): void;
  filename: string;
}
