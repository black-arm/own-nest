import { PAYLOAD } from "./constants";

export function Payload() {
    return function (target: any, propertyKey: string | symbol, 
            parameterIndex: number) {
                console.log(propertyKey);
                console.log(parameterIndex);
        const parameters = Reflect.getMetadata(PAYLOAD, target, propertyKey) || 
            [] as number[];
        parameters.push(parameterIndex);
        Reflect.defineMetadata(PAYLOAD, parameters, target, propertyKey);
    }
}