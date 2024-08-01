import 'express-async-errors';

import { ApiExpress } from "./api/express/api.express";
import { AccountController } from "./api/express/controllers/account.controller";
import { errorMiddleware } from "./middlewares/error.middleware";
import { accountSchema } from './validations/schemes/account.schema';

function main() {
    const api = ApiExpress.build();

    const accountController = AccountController.build();

    api.addPostRoute("/account", accountSchema, accountController.create);
    // api.addGetRoute("/account", accountController.create);

    api.app.use(errorMiddleware);

    api.start(8000);
}

main();