import { Router, Request, Response } from 'express';
import { join, resolve } from 'path';
import { FutureAlertsService } from '../services/future-alerts.service';

export class FutureAlertsRouter {

    get routes(): Router {

        let router: Router = Router();

        router.get("/", new FutureAlertsService().retrieveFutureAlerts);

        return router;
    }
}