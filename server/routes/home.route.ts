import { Router, Request, Response } from 'express';
import { join, resolve } from 'path';

export class HomeRouter {

    get routes(): Router {

        let router: Router = Router();

        router.get("/", (req: Request, res: Response) => {
            res.render(resolve(__dirname, "..", "views/layouts/index"));
        });

        return router;
    }
}