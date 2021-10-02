import { User } from "../entities/User";
import { IUser } from "../interfaces/IUser";
import { IMapper } from "./IMapper";

export class UsersMapper implements IMapper<IUser, User> {
    public toDomain(user: IUser): User {
        return new User(
            user.id,
            user.firstName,
            user.lastName,
            user.email,
            user.password
        );
    }

    public toData(user: User): IUser {
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password
        }
    }
}