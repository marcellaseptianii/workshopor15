import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");

    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false,
      createdAt: new Date().toLocaleString("id-ID"),
    };

    setTodos([...todos, newTodo]);
    setInput("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const deleteTodo = (id) => {
    const confirmDelete = window.confirm(
      "Yakin ingin menghapus tugas ini?"
    );

    if (confirmDelete) {
      setTodos(
        todos.filter((todo) => todo.id !== id)
      );
    }
  };

  const completedCount = todos.filter(
    (todo) => todo.completed
  ).length;

  return (
    <div className="container">

      <div className="card">

        <div className="header">

          <div>
            <h1><br></br>My To-Do List</h1>
            <p>
            <br></br>Tetap produktif setiap hari
            </p>
          </div>

          <div className="avatar">
            C
          </div>

        </div>

        <div className="stats">

          <div className="stat-box">
            <h3>{todos.length}</h3>
            <p>Total Task</p>
          </div>

          <div className="stat-box">
            <h3>{completedCount}</h3>
            <p>Completed</p>
          </div>

        </div>

        <div className="input-section">

          <input
            type="text"
            placeholder="Masukkan tugas..."
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTodo();
              }
            }}
          />

          <button onClick={addTodo}>
            Tambah
          </button>

        </div>

        {todos.length === 0 ? (

          <div className="empty">


            <h3>
              Belum Ada Tugas
            </h3>

            <p>
              Tambahkan tugas pertamamu
            </p>

          </div>

        ) : (

          <ul>

            {todos.map((todo) => (

              <li key={todo.id}>

                <div
                  className="todo-content"
                  onClick={() =>
                    toggleTodo(todo.id)
                  }
                >

                  <span
                    className={
                      todo.completed
                        ? "completed"
                        : ""
                    }
                  >
                    {todo.completed
                      ? "✅ "
                      : "⭕ "}
                    {todo.text}
                  </span>

                  <small>
                    {todo.createdAt}
                  </small>

                </div>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteTodo(todo.id)
                  }
                >
                  Hapus
                </button>

              </li>

            ))}

          </ul>

        )}

      </div>

    </div>
  );
}

export default App;