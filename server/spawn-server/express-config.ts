import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as expressHandlebars from 'express-handlebars';
import * as favicon from 'serve-favicon';
import * as methodOverride from 'method-override';
import { Routes } from '../routes/routes';
import { Logger } from 'log4js';
import { AppMorgan, AppLogger } from '../logger/app.logger';
import { path as approot } from 'app-root-path';

import { Request, Response, NextFunction } from 'express';

import { join, resolve } from 'path';
import { json, urlencoded } from 'body-parser';

const logger: Logger = AppLogger('Express Configuration');

class ExpressApp {

    public express : express.Application;

    constructor() {
        this.express = express();
        this.configureHandlebars();
        this.configureMiddleware();
        this.configureRoutes();
    }

    private configureHandlebars(): void {
        this.express.engine('hbs', expressHandlebars({
            layoutsDir : join(__dirname, 'views', 'layouts'),
            partialsDir : join(__dirname, "views", "partials")
        }));
        this.express.set("views", join(__dirname, "views"));
        this.express.set("view engine", "hbs");
        logger.info("Handlerbars configured");
    }

    private configureMiddleware(): void {
        this.express.use(AppMorgan());
        this.express.use(json());
        this.express.use(urlencoded({
            extended: false
        }));
        this.express.use(cookieParser());
        this.express.use(methodOverride());
        this.express.use(favicon(join(__dirname, '..', 'views', 'wrote.png')));
        this.express.use(this.ErrorHandler);
        this.express.use(express.static(`${approot}/public`));
        logger.info("All express middlewares configured");
    }

    private configureRoutes(): void {
       this.express.use(new Routes().routes);
       this.express.get("/dashboard", (req, res) => {
           res.render(resolve(__dirname, "..", "views/layouts/dashboard"));
       });
       logger.info("All express routes configured");
    }

    private ErrorHandler(err: any, req: Request, res: Response, next: NextFunction) : void {

        err = err || {};

        res.status(err.status || 500);
        logger.error("Error occured : " + JSON.stringify(err));
        res.type('txt').send(err.message);
    }
}

export default new ExpressApp().express;