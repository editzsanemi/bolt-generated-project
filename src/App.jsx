import React, { useState, useEffect } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { v4 as uuidv4 } from 'uuid';
    import { FaTrash, FaCheck, FaPlus } from 'react-icons/fa';

    function App() {
      const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
      });
      const [newTodo, setNewTodo] = useState('');

      useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
      }, [todos]);

      const addTodo = () => {
        if (newTodo.trim() === '') return;
        const newTodoItem = {
          id: uuidv4(),
          text: newTodo,
          completed: false,
        };
        setTodos([...todos, newTodoItem]);
        setNewTodo('');
      };

      const toggleComplete = (id) => {
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo,
          ),
        );
      };

      const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
      };

      const handleInputChange = (e) => {
        setNewTodo(e.target.value);
      };

      const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          addTodo();
        }
      };

      return (
        <motion.div
          className="todo-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="todo-input-container">
            <input
              type="text"
              className="todo-input"
              placeholder="Add a new todo..."
              value={newTodo}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <button className="add-button" onClick={addTodo}>
              <FaPlus />
            </button>
          </div>
          <ul className="todo-list">
            <AnimatePresence>
              {todos.map((todo) => (
                <motion.li
                  key={todo.id}
                  className={`todo-item ${todo.completed ? 'completed' : ''}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="todo-text">{todo.text}</span>
                  <div className="todo-actions">
                    <button
                      className="action-button complete"
                      onClick={() => toggleComplete(todo.id)}
                    >
                      <FaCheck />
                    </button>
                    <button
                      className="action-button delete"
                      onClick={() => deleteTodo(todo.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </motion.div>
      );
    }

    export default App;
