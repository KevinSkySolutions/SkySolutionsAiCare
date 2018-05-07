import * as cluster from 'cluster';
import * as express from 'express';
import { Logger } from 'log4js';
import { AppLogger } from '../logger/app.logger';

const logger: Logger = AppLogger('Cluster Configuration');

class ConfigureCluster {

    constructor(app: express.Application) {
        if (cluster.isMaster) {
            this.createMasterCluster(app);
        } else {
            this.createWorker(app);
        }
    }

    private createMasterCluster(app: express.Application) : void {
        let numWorkers: Number = require('os').cpus().length;
        this.forkMaster(app, numWorkers);
        this.initClusterEvents(app);
    }

    private createWorker(app: express.Application): void {
        app.set('port', 3000);

        var worker = app.get("Server");

        worker.listen(app.get('port'), function() {
            logger.info('Worker ' + process.pid + ' is listening on ' + worker.address().port);
        });
    }

    private initClusterEvents(app: express.Application): void {
        cluster.on('online', function(worker){
            logger.info('Worker ' + worker.process.pid + ' is online');
        });

        cluster.on('exit', function(worker, code, signal){
            logger.info('Worker ' + worker.process.pid + 'died with code ' + code + ', and signal:' + signal);
            logger.info('Starting a new worker');
            cluster.fork();
        });
    }

    private forkMaster(app: express.Application, workers: Number) : void {
        logger.info('Master cluster is setting up: ' + workers + ' workers...');

        for(var i=0; i< workers; i++) {
            cluster.fork();
        }
    }
}

export default ConfigureCluster;