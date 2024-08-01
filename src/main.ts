import 'express-async-errors';

import { ApiExpress } from "./api/express/api.express";
import { AccountController } from "./api/express/controllers/account.controller";
import { errorMiddleware } from "./middlewares/error.middleware";
import { accountSchema, loginSchema } from './middlewares/validations/schemes/account.schema';
import { AuthController } from './api/express/controllers/auth.controller';
//criar enum -> no authorization required | authorization required

const Authorization = Object.freeze({
    AUTH_REQUIRED: true,
    NO_AUTH_REQUIRED: false
})

function main() {
    const api = ApiExpress.build();

    const accountController = AccountController.build();
    const authController = AuthController.build();

    api.addPostRoute("/login", loginSchema,  Authorization.NO_AUTH_REQUIRED, authController.login);

    api.addPostRoute("/account", accountSchema, Authorization.NO_AUTH_REQUIRED, accountController.create);
    api.addPostRoute("/account/private", accountSchema, Authorization.AUTH_REQUIRED, accountController.create);

    api.app.use(errorMiddleware);

    api.start(8000);
}

main();