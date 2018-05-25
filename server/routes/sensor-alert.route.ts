import { Router, Request, Response } from 'express';
import { join, resolve } from 'path';
import { SensorAlertService } from '../services/sensor-alert.service';

export class SensorAlertRouter {

    get routes(): Router {

        let router: Router = Router();

        router.get("/", new SensorAlertService().retrieveSensorAlert);

        return router;
    }
}