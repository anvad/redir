import { Next, Response, Request } from "restify";
import { log } from "./utils";

export const sayHello = (req: Request, res: Response) => {
    const name = req.params["name"];
    log(`sayHello called with name: ${name}`);
    res.send(200, `hello there ${name}!`);
}

export const redir = (req: Request, res: Response, next: Next) => {
    const name = req.params["name"];
    log(`redir called with name: ${name}`);
    res.redirect(307, 'https://google.com', next);
}