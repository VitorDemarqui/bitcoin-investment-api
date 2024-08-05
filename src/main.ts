import 'express-async-errors';

import { ApiExpress } from "./api/express/api.express";
import { AccountController } from "./api/express/controllers/account.controller";
import { errorMiddleware } from "./middlewares/error.middleware";
import { accountSchema, loginSchema } from './middlewares/validations/schemes/account.schema';
import { depositSchema } from './middlewares/validations/schemes/deposit.schema';
import { AuthController } from './api/express/controllers/auth.controller';
import { DepositController } from './api/express/controllers/deposit.controller';
import { BitcoinController } from './api/express/controllers/bitcoint.controller';
import { InvestmentController } from './api/express/controllers/investment.controller';
import { purchaseSchema } from './middlewares/validations/schemes/purchase.schema';
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
    const bitcoinController = BitcoinController.build();
    const investmentController = InvestmentController.build();

    api.addPostRoute("/login", loginSchema,  Authorization.NO_AUTH_REQUIRED, authController.login);

    api.addPostRoute("/account", accountSchema, Authorization.NO_AUTH_REQUIRED, accountController.create);
    api.addGetRoute("/account/balance", Authorization.AUTH_REQUIRED, accountController.getBalance);
    api.addPostRoute("/account/deposit", depositSchema, Authorization.AUTH_REQUIRED, depositController.create);

    api.addGetRoute("/btc/price", Authorization.AUTH_REQUIRED, bitcoinController.getPrice);
    api.addGetRoute("/btc", Authorization.AUTH_REQUIRED, investmentController.getPosition);
    api.addPostRoute("/btc/purchase", purchaseSchema, Authorization.AUTH_REQUIRED, investmentController.create);

    api.app.use(errorMiddleware);

    api.start(8000);
}

main();