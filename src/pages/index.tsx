import { useState } from "react";

const Index = () => {
  const [task, setTask] = useState<string>("");
  const [todos, setTodos] = useState<{ id: number; task: string; completed: boolean, isEdit: boolean }[]>([]);
  const [editText, setEditText] = useState<{ [key: number]: string }>({});

  const handleAddTodo = () => {
    if (task.trim()) {
      setTodos([
        ...todos,
        { id: todos.length + 1, task: task.trim(), completed: false, isEdit: false },
      ]);
      setTask("");
    }
  };

  const toggleTodo = (id: number) => () => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => () => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id: number) => () => {
    const current = todos.find((t) => t.id === id);
    setEditText((prev) => ({ ...prev, [id]: current?.task || "" }));
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEdit: true } : todo
      )
    );
  };

  const saveTask = (id: number) => () => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task: editText[id], isEdit: false } : todo
      )
    );
    setEditText((prev) => {
      const newState = { ...prev };
      delete newState[id];
      return newState;
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Todo App</h1>
      <div>
        <input
          id="input-task"
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <ul className="list__wrapper">
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: "10px" }} className="list__element">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={toggleTodo(todo.id)}
              style={{ marginRight: "10px" }}
            />
            {todo.isEdit ? <input
              type="text"
              value={editText[todo.id] || ""}
              onChange={(e) =>
                setEditText((prev) => ({ ...prev, [todo.id]: e.target.value }))
              }
            /> : <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
              className="list__element--item"
              onClick={toggleTodo(todo.id)}
            >
              {todo.task}
            </span>}
            <button onClick={deleteTodo(todo.id)} style={{marginLeft: "10px"}}>
              Delete
            </button>
            {todo.isEdit
              ? (<button onClick={saveTask(todo.id)} style={{marginLeft: "10px"}}>
                  Save
                </button>
              ) : ( <button onClick={updateTodo(todo.id)} style={{marginLeft: "10px"}}>
                Update
              </button>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Index;
