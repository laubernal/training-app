import { Request, Response } from 'express';
import { GetAllCategoriesUseCase } from '../../../Application/UseCases/CategoryUseCase/GetAllCategoriesUseCase';
import { requireAuth } from '../../middlewares/auth';
import { CategoryPgRepository } from '../../repositories/PostgresqlDb/CategoryPgRepository';
import { bodyValidator, Controller, get, use } from '../decorators';

@Controller()
export class GetAllCategories {
  @get('/categories')
  @use(requireAuth)
  @bodyValidator()
  public async getAllCategories(req: Request, res: Response): Promise<void> {
    try {
      const categories = await new GetAllCategoriesUseCase(new CategoryPgRepository()).execute('');

      res.send(categories);
    } catch (error: any) {
      res.send({
        msg: 'Error occurred',
        error: error.message,
      });
    }
  }
}
