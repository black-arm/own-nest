import { controllers } from "../endpoints";
import { TodoController } from "../endpoints/Todo.controller";
import { ModuleMetadata, ModuleMetadataFactory } from "../models";
import { INJECT_PROPERTY, INJECT_SERVICE, MODULE } from "./constants";

export function OwnModule(moduleMetadata: ModuleMetadata) {
    
    const servicesMap = defineService(moduleMetadata);
    const controllersMap = defineController(moduleMetadata, servicesMap);

    return function (target: any): void {
        const result: ModuleMetadataFactory = { services: servicesMap, controllers: controllersMap }
        Reflect.defineMetadata(MODULE, result, target);
    }
}

function defineService(moduleMetadata: ModuleMetadata): Map<Function, Object> {
    const services = moduleMetadata.service || [];
    const servicesMap = new Map<Function, Object>();
    
    services.forEach(service => {
        
        if(servicesMap.has(service)){
            throw new Error(`Service ${service.name} already exists`);
        }

        servicesMap.set(service, new service());
    });

    return servicesMap;
}

function defineController(moduleMetadata: ModuleMetadata,
    servicesMap: Map<Function, Object>): Map<Function, Object> {
    
    const controllers = moduleMetadata.controller || [];
    const controllersMap = new Map<Function, Object>();

    controllers.forEach(controller => {
        
        if(controllersMap.has(controller)){
            throw new Error(`Controller ${controller.name} already exists`);
        }

        const instance = new controller();
        const propertyKey = Reflect.getMetadata(INJECT_PROPERTY, instance);
        const service = Reflect.getMetadata(INJECT_SERVICE, instance, propertyKey);

        if(service && servicesMap.has(service)){
            instance[propertyKey] = servicesMap.get(service);
        }
        
        controllersMap.set(controller, instance);

    });

    return controllersMap;
}