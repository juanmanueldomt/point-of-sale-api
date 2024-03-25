import {User} from "../entity/User";
import {AppDataSource} from "../data-source";
import {injectable} from "inversify";

@injectable()
export class UserService {

    public login(body: User): Promise<User> {
        return AppDataSource.manager.findOne(User, {
            where: {user: body.user, pass: body.pass}
        })

    }
}