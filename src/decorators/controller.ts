import {CONTROLLER} from "./constants";

export function Controller(baseUrl: string) {
    return function (target: Object): void {
        Reflect.defineMetadata(CONTROLLER, baseUrl, target);
    };
}
