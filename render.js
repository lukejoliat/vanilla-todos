import { TodoStore } from "./todos.js";

export const render = {
  store: new TodoStore(),
  saveButton: document.querySelector(".todos_save"),
  todosInput: document.querySelector(".todos_input"),
  todosElement: document.querySelector(".todos_list"),
  saveTodo() {
    this.store.addTodo(this.todosInput.value);
    this.todosInput.value = "";
  },
  completeTodo(id) {
    this.store.completeTodo(id);
  },
  deleteTodo(id) {
    this.store.deleteTodo(id);
  },
  renderTodos() {
    let content = "";
    const todos = this.store.getTodos() ?? [];
    todos.forEach((t, i) => {
      content += `
    <div class="todo_row" data-id="${t.id}">
        <input class="todo todo_check" type="checkbox" id="todo_${i}" name="todo_${i}" value="${
        t.name
      }" ${t.completed ? "checked" : null} />
        <label for="todo_${i}" class="todo_label">${
        t.name
      }</label><button class="todo_delete"></button>
    </div>
    `;
    });
    this.todosElement.innerHTML = content;
  },
  bindListeners() {
    this.store.addEventListener("save", () => this.renderTodos());
    this.todosElement.addEventListener("click", ({ target }) => {
      const closest = target.closest("[data-id]");
      const id = closest.dataset.id;
      if (target.classList && target.classList.contains("todo_delete"))
        this.deleteTodo(id);
      if (target.classList && target.classList.contains("todo_check"))
        this.completeTodo(id);
    });
    this.saveButton.addEventListener("click", this.saveTodo);
    this.todosInput.addEventListener("keydown", (e) =>
      e.code === "Enter" ? this.saveTodo() : null
    );
  },
  init() {
    this.bindListeners();
    this.renderTodos();
  },
};
