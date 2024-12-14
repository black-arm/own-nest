import {CONTROLLER} from "./constants";

export function Controller(baseUrl: string) {
    return function (constructor:  {new  (...args: any[]): any}) {
        Reflect.defineMetadata(CONTROLLER, baseUrl, constructor);
    };
}
