import { Component, OnInit } from "@angular/core";
import { Todo } from "../../common/interfaces/todo";
import { trigger, transition, style, animate } from "@angular/animations";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.scss"],
  animations: [
    trigger("fade", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(30px)" }),
        animate(200, style({ opacity: 1, transform: "translateY(0px)" })),
      ]),

      transition(":leave", [
        animate(200, style({ opacity: 0, transform: "translateY(30px)" })),
      ]),
    ]),
  ],
})
export class TodoListComponent implements OnInit {
  todoList: Todo[];
  todoTitle: string;
  idForTodo: number;

  beforeEditCache: string;
  filter: string;
  anyRemainingModel: boolean;

  constructor() {}

  ngOnInit() {
    this.anyRemainingModel = true;
    this.filter = "all";
    this.beforeEditCache = "";
    this.idForTodo = 4;
    this.todoTitle = "";
    this.todoList = [
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
  }

  addTodo(): void {
    if (this.todoTitle.trim().length === 0) {
      return;
    }

    this.todoList.push({
      id: this.idForTodo,
      title: this.todoTitle,
      completed: false,
      editing: false,
    });

    this.todoTitle = "";
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
