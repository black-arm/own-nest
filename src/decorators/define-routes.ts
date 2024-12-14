import {CONTROLLER, GET, ROUTE} from "./constants";
import {RouteMap, Routes} from "../models/route.model";

export function Get(path?: string) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log(2)
    const baseURL = Reflect.getMetadata(CONTROLLER, target.constructor) || '';

    if(!baseURL){
      throw new Error('Controller is not defined');
    }

    const routes: Routes = Reflect.getMetadata(ROUTE, target.constructor) || [] as Routes;

    path = `${baseURL}${path}`;
    const checkRoute = routes.find(route => route.path === path);
    if(checkRoute){
      throw new Error(`Duplicate route ${path}`);
    }

    routes.push({ method: GET, path, handler: propertyKey});
    Reflect.defineMetadata(ROUTE, routes, target.constructor);
  }
}