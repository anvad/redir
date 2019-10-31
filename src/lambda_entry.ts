import * as path from 'path';
import { log, LogColors } from './utils';
//let log = console.log;
log(`in entry`, 'yellow');

import * as sm from 'source-map-support'
sm.install({
    environment: 'node'
});

import {
    sayHello, redir
} from './redir';

import Server from 'lambda-restify';
const server = new Server();

registerRoute(redir, `/coder/:name`);
registerRoute(sayHello, `/coder/hello/:name`);

function registerRoute(handler, path, methodStr = 'get') {
    const methods = methodStr.split(',')
        .map(method => method.trim())
        .filter(method => method);
    methods.forEach(method => {
        server[method]({ path }, handler);
    });
    let envRoute = `${process.env.URL_PREFIX || '/prod'}${path}`;
    console.log(`also registering route: ${envRoute}`);
    server[methodStr](
        { path: envRoute },
        handler
    );
}

exports.entry = function (event, context, callback) {
    if (!event || !event.headers) {
        log(`event ${JSON.stringify(event, null, 2)} is not well formed. Missing http headers. exiting.`, LogColors.red);
        return;
    }
    log(`event is ${event.httpMethod} ${event.body}`);
    server.handleLambdaEvent(event, context, (err, result) => {
        log(`data to be sent to callback: err=${err}, result: ${JSON.stringify(result, null, 2)}`);
        callback(err, result);
    });
}
