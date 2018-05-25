import { HomeRouter } from './home.route';

import * as express from 'express';
import { AlertsRouter } from './alerts.route';
import { FutureAlertsRouter } from './future.alerts.route';
import { UserDataRouter } from './user-data.route';
import { FloorsDataRoute } from './floors-data.route';
import { PatientDataRouter } from './patient-data.route';
import { EnterpriseRouter } from './enterprise.route';
import { VenueRouter } from './venue.route';
import { BuildingRouter } from './building.route';
import { FloorAPIRouter } from './floorAPI.route';
import { SensorAlertRouter } from './sensor-alert.route';
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
        app.use("/enterpriseData", new EnterpriseRouter().routes);
        app.use("/venueData", new VenueRouter().routes);
        app.use("/buildingData", new BuildingRouter().routes);
        app.use("/floorAPIData", new FloorAPIRouter().routes);
        app.use("/sensorAlertData", new SensorAlertRouter().routes);
        app.use("/login", new LoginRouter().routes);
        return app;
    }
}