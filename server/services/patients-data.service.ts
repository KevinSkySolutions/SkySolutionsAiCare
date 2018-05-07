import { Request, Response } from 'express';

const mockdata = require("../mock-data/db.json");

import { Logger } from 'log4js';
import { AppLogger } from '../logger/app.logger';

const logger: Logger = AppLogger('Patient Service');


export class PatientDataService {

    retrievePatients(req: Request, res: Response) {
        res.json(mockdata.patientsData);
    }
}