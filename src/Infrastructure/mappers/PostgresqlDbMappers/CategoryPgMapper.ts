import { Category } from '../../../Domain/entities/Category';
import { queryResultCategory } from '../../../types';
import { CategoryPgModel } from '../../dataModel/PostgresqlDbModels/CategoryPgModel';
import { IMapper } from '../IMapper';

export class CategoryPgMapper implements IMapper<CategoryPgModel, Category> {
  public rawDataToModel(rawData: queryResultCategory[]): CategoryPgModel[] {
    const categoryToModel: CategoryPgModel[] = [];

    rawData.map(rawDataElement => {
      categoryToModel.push(new CategoryPgModel(rawDataElement.cat_id, rawDataElement.cat_name));
    });

    return categoryToModel;
  }

  public toData(category: Category): CategoryPgModel {
    return new CategoryPgModel(category.id, category.categoryName);
  }

  public toDomain(category: CategoryPgModel): Category {
    return new Category(category.id, category.categoryName);
  }
}
