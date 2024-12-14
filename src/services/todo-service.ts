import { Service } from "../decorators";

@Service()
export class TodoService{

    private todos: {id: number, text: string}[] = [
        {id: 1, text: 'Learn React'},
        {id: 2, text: 'Learn Angular'},
        {id: 3, text: 'Learn Vue'}
    ];

    addTodo = (text: string) => {
        this.todos.push({id: Math.random(), text});
    }

    getTodos = () => {
        return this.todos;
    }
}