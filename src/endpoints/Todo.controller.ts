import { Controller, Get, Post } from "../decorators";
import { InjectService } from "../decorators/inject-service";
import { Payload } from "../decorators/payload";
import { TodoService } from "../services/todo-service";

@Controller('/todo')
export class TodoController {

    @InjectService(TodoService)
    todoService: TodoService;

    @Get('')
    getTodo(){
        return this.todoService.getTodos();
    }
    
    @Post('/add-todo')
    addTodo(@Payload() payload: {text: string}){
        this.todoService.addTodo(payload.text);
    }
}