import { Request, Response } from 'express';

const mockdata = require("../mock-data/db.json");

import { Logger } from 'log4js';
import { AppLogger } from '../logger/app.logger';

const logger: Logger = AppLogger('Future Alterts Service');


export class FutureAlertsService {

    retrieveFutureAlerts(req: Request, res: Response) {
        if (req.params.id === 2) {
            res.json(mockdata.futureAlertsData2);
        } else {
            res.json(mockdata.futureAlertsData);
        }
    }
}