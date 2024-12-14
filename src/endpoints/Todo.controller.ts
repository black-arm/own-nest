import { Controller, Get } from "../decorators";
import { InjectService } from "../decorators/inject-service";
import { TodoService } from "../services/todo-service";

@Controller('/todo')
export class TodoController {

    @InjectService(TodoService)
    todoService: TodoService;

    @Get('')
    getTodo(){
        console.log(`${this.todoService}`);
        return this.todoService.getTodos();
    }
    
}