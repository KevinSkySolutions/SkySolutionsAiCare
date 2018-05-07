import { Router, Request, Response } from 'express';
import { join, resolve } from 'path';
import { LoginService } from '../services/login.service';

export class LoginRouter {

    get routes(): Router {

        let router: Router = Router();

        router.get("/", new LoginService().login);

        return router;
    }
}