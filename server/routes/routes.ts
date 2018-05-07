import { HomeRouter } from './home.route';

import * as express from 'express';
import { AlertsRouter } from './alerts.route';
import { FutureAlertsRouter } from './future.alerts.route';
import { UserDataRouter } from './user-data.route';
import { FloorsDataRoute } from './floors-data.route';
import { PatientDataRouter } from './patient-data.route';
import { LoginRouter } from './login.router';


export class Routes {

    get routes() : express.Application {
        let app : express.Application = express();
        app.use("/", new HomeRouter().routes);
        app.use("/alertsData", new AlertsRouter().routes);
        app.use("/futureAlertsData/:id", new FutureAlertsRouter().routes);
        app.use("/userData", new UserDataRouter().routes);
        app.use("/floorsData", new FloorsDataRoute().routes);
        app.use("/patientsData", new PatientDataRouter().routes);
        app.use("/login", new LoginRouter().routes);
        return app;
    }
}