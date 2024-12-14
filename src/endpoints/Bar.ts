import {Controller} from "../decorators/controllers";

@Controller('/bar')
export class Bar{


    getBar(){
        return 'Bar';
    }
}