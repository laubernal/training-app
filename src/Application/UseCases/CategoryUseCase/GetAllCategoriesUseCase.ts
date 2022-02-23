import { Category } from '../../../Domain/entities/Category';
import { ICategoryPgRepository } from '../../../Domain/interfaces/PostgresqlDbInterfaces/ICategoryPgRepository';
import { IUseCase } from '../IUseCase';

export class GetAllCategoriesUseCase implements IUseCase<Category> {
  constructor(private categoryPgRepository: ICategoryPgRepository) {}

  public async execute(): Promise<Category[] | undefined> {
    try {
      const categories: Category[] = await this.categoryPgRepository.findAll();
      
      return categories;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
