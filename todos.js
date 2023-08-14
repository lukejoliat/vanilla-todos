const todos = () => {
  const initialize = () => {
    localStorage.setItem("todos", "[]");
  };
  const getTodos = () => {
    return JSON.parse(localStorage.getItem("todos"));
  };
  const addTodo = (name) => {
    const oldTodos = getTodos();
    const todo = { id: oldTodos.length + 1, name, completed: false };
    const todos = [...oldTodos, todo];
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  const deleteTodo = (id) => {
    const oldTodos = getTodos();
    const todos = oldTodos.filter((t) => t.id !== id);
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  const updateTodo = (todo) => {
    const oldTodos = getTodos();
    const todos = oldTodos.map((t) => (t.id === todo.id ? todo : t));
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  const completeTodo = (id) => {
    const oldTodo = getTodos().find((t) => t.id === id);
    if (oldTodo) updateTodo({ ...oldTodo, completed: !oldTodo.completed });
    else throw new Error("Could not find todo.");
  };

  try {
    const todos = getTodos();
    if (!todos) initialize();
  } catch (e) {
    initialize();
  }

  return {
    addTodo,
    deleteTodo,
    completeTodo,
    updateTodo,
    getTodos,
  };
};
