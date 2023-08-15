const t = todos();

const renderer = (f) =>
  (newFunc = (...params) => {
    f(...params);
    renderTodos();
  });

const deleteTodo = renderer(t.deleteTodo);
const completeTodo = t.completeTodo;
const saveTodo = renderer((e) => {
  const input = document.querySelector(".todos_input");
  t.addTodo(input.value);
  input.value = "";
});

const saveBtn = document.querySelector(".todos_save");
const saveInput = document.querySelector(".todos_input");
const todosElement = document.querySelector(".todos_list");
saveBtn.addEventListener("click", saveTodo);
saveInput.addEventListener("keydown", (e) =>
  e.code === "Enter" ? saveTodo() : null
);

const renderTodos = () => {
  todosElement.innerHTML = ``;
  const todos = t.getTodos() ?? [];
  todos.forEach((t, i) => {
    todosElement.innerHTML += `
    <div class="todo_row">
        <input class="todo todo_check" type="checkbox" id="todo_${i}" name="todo_${i}" onClick="completeTodo(${
      t.id
    })" value="${t.name}" ${t.completed ? "checked" : null} />
        <label for="todo_${i}" class="todo_label">${
      t.name
    }</label><button class="todo_delete" onClick="deleteTodo(${t.id})"></button>
    </div>
    `;
  });
};
