import { Router, Request, Response } from 'express';
import { join, resolve } from 'path';
import { AlertsService } from '../services/alerts.service';
import { FloorsDataService } from '../services/floors-data.service';

export class FloorsDataRoute {

    get routes(): Router {

        let router: Router = Router();

        router.get("/", new FloorsDataService().retrieveFloors);

        return router;
    }
}