import { Category } from '../../../Domain/entities/Category';
import { ICategoryPgRepository } from '../../../Infrastructure/interfaces/PostgresqlDbInterfaces/ICategoryPgRepository';
import { IUseCase } from '../IUseCase';

export class NewCategoryUseCase implements IUseCase<Category> {
  constructor(private categoryPgRepository: ICategoryPgRepository) {}

  public async execute(categoryName: string): Promise<Category> {
    try {
      const category: Category = Category.build(categoryName);
      console.log(`category in execute UC: ${category}`);

      await this.categoryPgRepository.save(category);
      console.log(`new category use case: ${category}`);

      return category;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
