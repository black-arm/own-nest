import {createServer, IncomingMessage, ServerResponse} from 'node:http';
import {CONTROLLER, MODULE, QUERY_PARAM, ROUTE} from "../decorators/constants";
import { Module } from '../module';
import { ModuleMetadataFactory } from '../models';

const moduleMetadataFactory =  Reflect.getMetadata(MODULE, Module) as ModuleMetadataFactory;

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    defineRoutes(req, res);
});

server.listen(3000, '127.0.0.1', () =>{
    console.log('server running on port: 3000!!!')
})

function defineRoutes(req: IncomingMessage, res: ServerResponse) {

    
    const controllers = moduleMetadataFactory.controllers;

    controllers.forEach((controller, key) => {

        const prefix = Reflect.getMetadata(CONTROLLER, key);
        const routes = Reflect.getMetadata(ROUTE, key) || [];

        routes.forEach((route: {method: string, path: string, handler: string}) => {
            const { method, path, handler } = route;
            const url = `${prefix}${path}`;

            const queryParams = Reflect.getMetadata(QUERY_PARAM, controller, handler) || [];

            if (req.url === url && req.method === method.toUpperCase()) {
                let args: (string | undefined)[] = [];
                if (queryParams.length > 0) {
                    args = extractQueryParamsFromPath(queryParams, url, req);
                }

                res.writeHead(200, {'Content-Type': 'application/json'});
                // @ts-ignore
                res.end(JSON.stringify(controller[handler](...args)));
            }
        });
    });
}

function extractQueryParamsFromPath(
    params: { index: number, queryParam: string }[], path: string, 
    req: IncomingMessage) {
    let args: (string | undefined)[] = [];
    if(req.url?.includes(path)) {
       
        const urlWithQueryParams = req.url.split('?');
       
        if(urlWithQueryParams.length < 2){
            throw new Error('Query params are required');
        }
        
        const queryParamsArray = urlWithQueryParams[1].split('&');
        
        const queryParamValues = queryParamsArray.map(queryParam => {
            const [key, value] = queryParam.split('=');
            return { key, value };
        });
        console.log('queryParamValues: ', JSON.stringify(queryParamValues));
        args = params.map(param => {
            const queryParam = queryParamValues.find(queryParam => queryParam.key === param.queryParam);
            return queryParam?.value;
        })

        console.log('args: ', args);
    }

    return args;
}