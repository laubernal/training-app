import { Category } from '../../../Domain/entities/Category';
import { ICategoryPgRepository } from '../../../Infrastructure/interfaces/PostgresqlDbInterfaces/ICategoryPgRepository';
import { IUseCase } from '../IUseCase';

export class GetAllCategoriesUseCase implements IUseCase<Category> {
  constructor(private categoryPgRepository: ICategoryPgRepository) {}

  public async execute(value: string): Promise<Category[] | undefined> {
    try {
      const categories: Category[] = await this.categoryPgRepository.findAll();
      
      return categories;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
