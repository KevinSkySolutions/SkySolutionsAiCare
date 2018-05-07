import { Router, Request, Response } from 'express';
import { join, resolve } from 'path';
import { AlertsService } from '../services/alerts.service';
import { UserDataService } from '../services/userdata.service';

export class UserDataRouter {

    get routes(): Router {

        let router: Router = Router();

        router.get("/", new UserDataService().retrieveUserData);

        return router;
    }
}