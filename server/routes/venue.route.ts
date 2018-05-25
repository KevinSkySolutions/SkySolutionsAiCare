import { Router, Request, Response } from 'express';
import { join, resolve } from 'path';
import { VenueService } from '../services/venue.service';

export class VenueRouter {

    get routes(): Router {

        let router: Router = Router();

        router.get("/", new VenueService().retrieveVenue);

        return router;
    }
}