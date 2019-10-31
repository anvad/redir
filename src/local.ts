import * as restify from "restify";
import { sayHello, redir } from "./redir";

export const server = restify.createServer();
// server.get(/\/coder\/?.*/, sayHello);

restifyRouteRegister(sayHello, `/coder/hello/:name`);
restifyRouteRegister(redir, `/coder/:name`);

var serverListening;

export function restifyRouteRegister(handler, handler_uri, methodStr = 'get') {
    const methods = methodStr.split(',')
        .map(method => method.trim())
        .filter(method => method);
    methods.forEach(method => {
        server[method]({ path: `${handler_uri}`, }, handler)
    });

    if (!serverListening) {
        serverListening = server.listen(process.env.port || process.env.PORT || 3005, function () {
            console.log('%s listening to %s', server.name, server.url);
        });
    }
};

