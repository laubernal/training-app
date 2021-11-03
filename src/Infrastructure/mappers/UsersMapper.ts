import { User } from "../../Domain/entities/User";
import { UserModel } from "../../Domain/interfaces/UserModel";
import { IMapper } from "./IMapper";

export class UsersMapper implements IMapper<UserModel, User> {
    public toDomain(user: UserModel): User {
        return new User(
            user.id,
            user.firstName,
            user.lastName,
            user.email,
            user.password
        );
    }

    public toData(user: User): UserModel {
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password
        }
    }
}