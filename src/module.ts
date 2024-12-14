import { OwnModule } from "./decorators";
import { TodoController } from "./endpoints/Todo.controller";
import { TodoService } from "./services/todo-service";

@OwnModule({
    controller: [TodoController],
    service: [TodoService]
})
export class Module{}