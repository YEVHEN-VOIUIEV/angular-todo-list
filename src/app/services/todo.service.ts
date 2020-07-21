import { Injectable } from "@angular/core";
import { Todo } from "../todo/common/interfaces/todo";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  todoTitle: string = "";
  idForTodo: number = 4;
  beforeEditCache: string = "";
  filter: string = "all";
  anyRemainingModel: boolean = true;
  todoList: Todo[] = [
    {
      id: 1,
      title: "111",
      completed: false,
      editing: false,
    },
    {
      id: 2,
      title: "222",
      completed: false,
      editing: false,
    },
    {
      id: 3,
      title: "333",
      completed: false,
      editing: false,
    },
  ];

  constructor() {}

  addTodo(todoTitle: string): void {
    if (todoTitle.trim().length === 0) {
      return;
    }

    this.todoList.push({
      id: this.idForTodo,
      title: todoTitle,
      completed: false,
      editing: false,
    });

    this.idForTodo++;
  }

  editTodo(todo: Todo): void {
    this.beforeEditCache = todo.title;
    todo.editing = true;
  }

  doneEdit(todo: Todo): void {
    if (todo.title.trim().length === 0) {
      todo.title = this.beforeEditCache;
    }

    this.anyRemainingModel = this.anyRemaining();
    todo.editing = false;
  }

  cancelEdit(todo: Todo): void {
    todo.title = this.beforeEditCache;
    todo.editing = false;
  }

  deleteTodo(id: number): void {
    this.todoList = this.todoList.filter((todo) => todo.id !== id);
  }

  remaining(): number {
    return this.todoList.filter((todo) => !todo.completed).length;
  }

  atLeastOneCompleted(): boolean {
    return this.todoList.filter((todo) => todo.completed).length > 0;
  }

  clearCompleted(): void {
    this.todoList = this.todoList.filter((todo) => !todo.completed);
  }

  checkAllTodo(): void {
    this.todoList.forEach(
      (todo) => (todo.completed = (<HTMLInputElement>event.target).checked)
    );
    this.anyRemainingModel = this.anyRemaining();
  }

  anyRemaining(): boolean {
    return this.remaining() !== 0;
  }

  todoListFiltered(): Todo[] {
    if (this.filter === "all") {
      return this.todoList;
    } else if (this.filter === "active") {
      return this.todoList.filter((todo) => !todo.completed);
    } else if (this.filter === "completed") {
      return this.todoList.filter((todo) => todo.completed);
    }

    return this.todoList;
  }
}
