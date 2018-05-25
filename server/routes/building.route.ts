import { Router, Request, Response } from 'express';
import { join, resolve } from 'path';
import { BuildingService } from '../services/building.service';

export class BuildingRouter {

    get routes(): Router {

        let router: Router = Router();

        router.get("/", new BuildingService().retrieveBuilding);

        return router;
    }
}