import { Category } from '../../../Domain/entities/Category';
import { CategoryPgModel } from '../../dataModel/PostgresqlDbModels/CategoryPgModel';
import { IMapper } from '../IMapper';

export class CategoryPgMapper implements IMapper<CategoryPgModel, Category> {
  public rawDataToModel(category: any): CategoryPgModel[] {
    const categoryToModel = [];

    categoryToModel.push(new CategoryPgModel(category.id, category.categoryName));

    return categoryToModel;
  }

  public toData(category: Category): CategoryPgModel {
    return new CategoryPgModel(category.id, category.categoryName);
  }

  public toDomain(category: CategoryPgModel): Category {
    return new Category(category.id, category.categoryName);
  }
}
