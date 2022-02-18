import { Request, Response } from 'express';
import { NewCategoryUseCase } from '../../../Application/UseCases/CategoryUseCase/NewCategoryUseCase';
import { currentUser, requireAuth } from '../../middlewares/auth';
import { CategoryPgRepository } from '../../repositories/PostgresqlDb/CategoryPgRepository';
import { bodyValidator, Controller, post, use } from '../decorators';

@Controller()
export class NewCategory {
  @post('/category')
  @use(requireAuth)
  @use(currentUser)
  @bodyValidator('categoryName')
  public async newCategory(req: Request, res: Response): Promise<void> {
    try {
      const { categoryName } = req.body;
      
      const newCategory = await new NewCategoryUseCase(new CategoryPgRepository()).execute(
        categoryName
      );
      console.log(`new category controller: ${newCategory}`);

      res.send(newCategory);
    } catch (error: any) {
      res.send({
        msg: 'Error occurred',
        error: error.message,
      });
    }
  }
}
