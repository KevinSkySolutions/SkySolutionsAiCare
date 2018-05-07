import { Request, Response, RequestHandler } from 'express';

import * as logger from 'morgan';
import * as log4js from 'log4js';

const LOGGER_TEMPLATE : string = '[:date[iso]]; :method uri=:url; http_status=:status; response_time=:response-time ms; content_size=:res[content-length]; hostname=:hostname';
//date utility functon
function getDateObject() : string {
    let dateObj : string[] = new Date().toString().replace(/[A-Z]{3}\+/,'+').split(/ /);
    return (dateObj[2] + '/' + dateObj[1] + '/' + dateObj[3] + ":" + dateObj[4] + ' ' + dateObj[5]);
}

//middleware which logs request information
export function AppMorgan() : RequestHandler {
    logger.token('hostname', (req: Request, resp: Response) => {
        if (req && req.hostname) {
            return req.hostname;
        }
        return "";
    });

    logger.token('date', getDateObject);

    return logger(LOGGER_TEMPLATE);
}

log4js.configure({
    appenders: {
        console: {
            type: 'console', layout: {
                type: 'pattern',
                pattern: '[%x{date} %p %c - %m',
                tokens: {
                    date: getDateObject
                }
            }
        }
    },
    categories: { default: { appenders: ['console'], level: 'INFO'}}
});

export function AppLogger(classname: string) : log4js.Logger {
    classname = classname || '';

    let log: log4js.Logger = log4js.getLogger(classname);
    return log;
}