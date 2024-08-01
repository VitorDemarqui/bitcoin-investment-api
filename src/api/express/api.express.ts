import { authMiddleware } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validations/validation";
import { Api } from "../api";
import express, { Express, Request, Response } from "express";

export class ApiExpress implements Api {

    private constructor(readonly app: Express){}

    public static build() {
        const app = express();
        app.use(express.json());
        return new ApiExpress(app);
    }

    public addGetRoute(path: string, handle: (req: Request, res: Response) => Promise<void>): void {
        this.app.get(path, handle);
    }

    public addPostRoute(
        path: string,
        schema: any,
        authRequired: Boolean,
        handle: (req: Request, res: Response) => Promise<void>
    ): void {
        const middleware: any[] = [];
        
        schema && middleware.push(validate(schema));
        if(authRequired) middleware.push(authMiddleware);

        this.app.post(path, middleware, handle);
    }

    public start(port: number) {
        this.app.listen(port, () => {
            console.log("Server running on port " + port)
            this.printRoutes()
        });
    }

    private printRoutes() {
        const routes = this.app._router.stack
        .filter((route: any) => route.route)
        .map((route: any)=> {
            return {
                path: route.route.path,
                method: route.route.stack[0].method
            }
        });

        console.log(routes);
    }
}