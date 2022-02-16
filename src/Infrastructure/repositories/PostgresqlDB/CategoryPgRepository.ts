import { CATEGORY_TABLENAME } from "../../../constants";
import { Category } from "../../../Domain/entities/Category";
import { CategoryPgModel } from "../../dataModel/PostgresqlDbModels/CategoryPgModel";
import { CategoryPgMapper } from "../../mappers/PostgresqlDbMappers/CategoryPgMapper";
import { PostgreRepository } from "./PostgreRepository";

export class CategoryPgRepository extends PostgreRepository<CategoryPgModel, Category> {
    protected mapper = new CategoryPgMapper();

    constructor() {
        super(CATEGORY_TABLENAME);
    }

    public async findAll(): Promise<any> {}
}