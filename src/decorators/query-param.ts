import { QUERY_PARAM } from "./constants";

export function QueryParam(queryParam: string) {
    return function (target: any, propertyKey: string | symbol, 
            parameterIndex: number) {
         
        const parameters = Reflect.getMetadata(QUERY_PARAM, target, propertyKey) || 
            [] as {index: number; queryParam: string}[];
        parameters.push({ index: parameterIndex, queryParam });
        Reflect.defineMetadata(QUERY_PARAM, parameters, target, propertyKey);
    }
}