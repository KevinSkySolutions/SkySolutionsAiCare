import { path as approot } from 'app-root-path';
import { json, urlencoded } from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
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
        this.express.use(session({
            key: 'aiCare',
            secret: 'skynurse_aicare',
            resave: false,
            saveUninitialized: false,
            cookie: {
                expires: 600000
            }
        }));        
        
        
        this.express.use(methodOverride());
        this.express.use(favicon(join(__dirname, '..', 'views', 'wrote.png')));
        this.express.use(this.ErrorHandler);
        this.express.use(express.static(`${approot}/public`));
        logger.info("All express middlewares configured");
    }

    private configureRoutes(): void {
       this.express.get("*", (req, res) => {
           console.log('User Values:  => ', JSON.stringify(req.session.user_values));
           if (req.session.user_values) {
            res.render(resolve(__dirname, "..", "views/layouts/index"), {id : req.session.user_values.id, userName : req.session.user_values.userName, enterpriseId: req.session.user_values.enterpriseId});
           } else {
            res.render(resolve(__dirname, "..", "views/layouts/index"));
           }
           
       });

       this.express.post("/api/savelogin", (req, res) => {
            req.session.user_values = req.body;
            res.json({sessionSaved: true});
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