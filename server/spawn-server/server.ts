import * as debug from 'debug';
import * as http from 'http';
import app from './express-config';
import configureCluster from './cluster-config';
import { AppLogger } from '../logger/app.logger';
import { Logger } from 'log4js';

const logger: Logger = AppLogger('Express Configuration');

function normalizePort(val: number | string) : number | string | boolean {
    let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;

    if (isNaN(port)) {
        return val;
    } else if (port >= 0) {
        return port;
    } else {
        return false;
    }
}

const port: number | string | boolean = normalizePort(3000);

app.set('port', port);

const server: http.Server = http.createServer(app);

server.on("error", onError);

app.set('Server',  server);

function onError(error: NodeJS.ErrnoException) : void {
    logger.error("Error occured "+ JSON.stringify(error));

    if (error && ('listen' != error.syscall)) {
        throw error;
    }

    let bind: string = (typeof port === 'string') ? 'Pipe ' + port : 'Port' + port;

    switch(error.code) {
        case 'EACCES' :
          process.exit(1);
          break;
        case 'EADDRINUSE':
          process.exit(1);
          break;
        default:
            throw error;
    }
}

new configureCluster(app);

