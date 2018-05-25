import { Router, Request, Response } from 'express';
import { join, resolve } from 'path';
import { FloorAPIService } from '../services/floorAPI.service';

export class FloorAPIRouter {

    get routes(): Router {

        let router: Router = Router();

        router.get("/", new FloorAPIService().retrieveFloorAPI);

        return router;
    }
}