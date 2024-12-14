import { SERVICE } from "./constants";

export function Service(){
    return function(target: Object){
        Reflect.defineMetadata(SERVICE, true, target);
    }
}