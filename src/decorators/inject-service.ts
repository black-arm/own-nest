import { INJECT_PROPERTY, INJECT_SERVICE } from "./constants";

export function InjectService(service: Function){
    return function(target: Object, propertyKey: string){
        console.log('propertyKey', propertyKey);
        Reflect.defineMetadata(INJECT_SERVICE, service, target, propertyKey);
        Reflect.defineMetadata(INJECT_PROPERTY, propertyKey, target);
    }
}