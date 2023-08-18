export const TodoStore = class extends EventTarget {
  constructor() {
    super();
    try {
      const todos = this.getTodos();
      if (!todos) this._save("[]");
    } catch (e) {
      this._save("[]");
    }
  }
  _save(item) {
    localStorage.setItem("todos", JSON.stringify(item));
    this.dispatchEvent(new CustomEvent("save"));
  }
  getTodos() {
    return JSON.parse(localStorage.getItem("todos"));
  }
  addTodo(name) {
    const oldTodos = this.getTodos();
    const todo = { id: `${oldTodos.length + 1}`, name, completed: false };
    const todos = [...oldTodos, todo];
    this._save(todos);
  }
  deleteTodo(id) {
    const oldTodos = this.getTodos();
    const todos = oldTodos.filter((t) => t.id !== id);
    this._save(todos);
  }
  updateTodo(todo) {
    const oldTodos = this.getTodos();
    const todos = oldTodos.map((t) => (t.id === todo.id ? todo : t));
    this._save(todos);
  }
  completeTodo(id) {
    const oldTodo = this.getTodos().find((t) => t.id === id);
    if (oldTodo) this.updateTodo({ ...oldTodo, completed: !oldTodo.completed });
    else throw new Error("Could not find todo.");
  }
};
