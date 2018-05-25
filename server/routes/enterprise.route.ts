import { Router, Request, Response } from 'express';
import { join, resolve } from 'path';
import { EnterpriseService } from '../services/enterprise.service';

export class EnterpriseRouter {

    get routes(): Router {

        let router: Router = Router();

        router.get("/", new EnterpriseService().retrieveEnterprise);

        return router;
    }
}