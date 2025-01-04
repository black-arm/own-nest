import {createServer, IncomingMessage, ServerResponse} from 'node:http';
import {CONTROLLER, MODULE, PAYLOAD, QUERY_PARAM, ROUTE} from "../decorators/constants";
import { Module } from '../module';
import { ModuleMetadataFactory } from '../models';

const moduleMetadataFactory =  Reflect.getMetadata(MODULE, Module) as ModuleMetadataFactory;

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    defineRoutes(req, res);
});

server.listen(3000, '127.0.0.1', () =>{
    console.log('server running on port: 3000!!!')
})

async function defineRoutes(req: IncomingMessage, res: ServerResponse): Promise<void> {

    
    const controllers = moduleMetadataFactory.controllers;
    
    let foundUrl = false;

    controllers.forEach((controller, key) => {

        const prefix = Reflect.getMetadata(CONTROLLER, key);
        const routes = Reflect.getMetadata(ROUTE, key) || [];

        routes.forEach(async (route: {method: string, path: string, handler: string}) => {
            const { method, path, handler } = route;
            const url = `${prefix}${path}`;

            const queryParams = Reflect.getMetadata(QUERY_PARAM, controller, handler) || [];

            const payload = Reflect.getMetadata(PAYLOAD, controller, handler) || [];

            if (req.url === url && req.method === method.toUpperCase()) {
                
                foundUrl = true;
                
                let args: (string | undefined | any)[] = [];
                if (queryParams.length > 0) {
                    args = extractQueryParamsFromPath(queryParams, url, req);
                }

                if(payload.length > 0) {
                    let body = await getRequestBody(req);
                    args = [...args, body];
                }

                res.writeHead(200, {'Content-Type': 'application/json'});
                // @ts-ignore
                res.end(JSON.stringify(controller[handler](...args)));
            }
        });
    });

    if(!foundUrl) {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: `url: ${req.url} not found`}));
    }
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

async function getRequestBody(req: IncomingMessage): Promise<any> {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            try {
                resolve(JSON.parse(body));
            } catch (error) {
                reject(error);
            }
        });
        req.on('error', (error) => {
            reject(error);
        });
    });
}