import 'express-async-errors';

import { ApiExpress } from "./api/express/api.express";
import { AccountController } from "./api/express/controllers/account.controller";
import { errorMiddleware } from "./middlewares/error.middleware";
import { accountSchema, loginSchema } from './middlewares/validations/schemes/account.schema';
import { depositSchema } from './middlewares/validations/schemes/deposit.schema';
import { AuthController } from './api/express/controllers/auth.controller';
import { DepositController } from './api/express/controllers/deposit.controller';
//criar enum -> no authorization required | authorization required

const Authorization = Object.freeze({
    AUTH_REQUIRED: true,
    NO_AUTH_REQUIRED: false
})

function main() {
    const api = ApiExpress.build();

    const accountController = AccountController.build();
    const authController = AuthController.build();
    const depositController = DepositController.build();

    api.addPostRoute("/login", loginSchema,  Authorization.NO_AUTH_REQUIRED, authController.login);

    api.addPostRoute("/account", accountSchema, Authorization.NO_AUTH_REQUIRED, accountController.create);
    api.addPostRoute("/account/deposit", depositSchema, Authorization.AUTH_REQUIRED, depositController.create);

    api.app.use(errorMiddleware);

    api.start(8000);
}

main();