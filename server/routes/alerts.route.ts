import { Router, Request, Response } from 'express';
import { join, resolve } from 'path';
import { AlertsService } from '../services/alerts.service';

export class AlertsRouter {

    get routes(): Router {

        let router: Router = Router();

        router.get("/", new AlertsService().retrieveAlerts);

        return router;
    }
}