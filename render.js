const t = todos();

const deleteTodo = (id) => {
  t.deleteTodo(id);
  renderTodos();
};
const completeTodo = (id) => {
  t.completeTodo(id);
  renderTodos();
};
const saveBtn = document.querySelector(".todos_save");
const todosElement = document.querySelector(".todos_list");

saveBtn.addEventListener("click", (e) => {
  const input = document.querySelector(".todos_input");
  t.addTodo(input.value);
  input.value = "";
  renderTodos();
});

const renderTodos = () => {
  todosElement.innerHTML = ``;
  const todos = t.getTodos() ?? [];
  todos.forEach((t, i) => {
    todosElement.innerHTML += `
      <input class="todo" type="checkbox" id="todos_${i}" name="todos_${i}" onClick="completeTodo(${
      t.id
    })" value="${t.name}" ${t.completed ? "checked" : null} />
      <label for="todos_${i}">${
      t.name
    }</label><button class="todo_delete" onClick="deleteTodo(${
      t.id
    })">x</button><br />
    `;
  });
};
