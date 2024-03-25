import {controller, httpPost, request, response} from "inversify-express-utils";
import {inject} from "inversify";
import {UserService} from "../services/UserService";
import * as express from "express";
import {User} from "../entity/User";

@controller('/user')
export class UserController {
    constructor(
        @inject("UserService") private userService: UserService
    ) {
    }

    @httpPost("/login")
    private login(@request() req: express.Request, @response() res: express.Response): Promise<User> {
        return this.userService.login(req.body as User).then(
            (user) => {
                if (user) {
                    return user
                }
                res.status(401)
                res.json({'message': 'El usuario/contraseña es incorrecto'})
            }
        );
    }
}