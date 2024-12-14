import {DELETE, GET, Method, POST, PUT, ROUTE} from "./constants";
import {Routes} from "../models/route.model";

function definePath(method: Method, path?: string){
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {

    const routes: Routes = Reflect.getMetadata(ROUTE, target.constructor) || [] as Routes;

    const checkRoute = routes.find(route => route.path === path);
    if(checkRoute){
      throw new Error(`Duplicate route ${path}`);
    }

    const pathRoute = path === '/' ? '' : path ?? '';

    routes.push({ method: method, path: pathRoute, handler: propertyKey});
    Reflect.defineMetadata(ROUTE, routes, target.constructor);
  }
}

export function Get(path?: string) {
  return definePath(GET, path);
}

export function Post(path?: string) {
  return definePath(POST, path);
}

export function Put(path?: string) {
  return definePath(PUT, path);
}

export function Delete(path?: string) {
  return definePath(DELETE, path);
}