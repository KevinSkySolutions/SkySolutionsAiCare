import { Router, Request, Response } from 'express';
import { join, resolve } from 'path';
import { AlertsService } from '../services/alerts.service';
import { PatientDataService } from '../services/patients-data.service';

export class PatientDataRouter {

    get routes(): Router {

        let router: Router = Router();

        router.get("/", new PatientDataService().retrievePatients);

        return router;
    }
}