import { path as approot } from 'app-root-path';
import { json, urlencoded } from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
import * as expressHandlebars from 'express-handlebars';
import { Logger } from 'log4js';
import * as methodOverride from 'method-override';
import { join, resolve } from 'path';
import * as favicon from 'serve-favicon';
import { AppLogger, AppMorgan } from '../logger/app.logger';



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
       this.express.get("*", (req, res) => {
           res.render(resolve(__dirname, "..", "views/layouts/index"));
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