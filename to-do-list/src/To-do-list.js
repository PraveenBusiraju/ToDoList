import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './To-do-app';
import styles from './to-do-app.module.css';
import add_button from './images/add.png';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {

    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedTodos);


    if (storedTodos.length === 0) {
      axios
        .get('https://jsonplaceholder.typicode.com/users/1/todos')
        .then((response) => {
          setTodos(response.data);

          localStorage.setItem('todos', JSON.stringify(response.data));
        })
        .catch((error) => {
          console.error('Error fetching todos:', error);
        });
    }
  }, []);

  const handleAddTask = () => {
    if (newTask === '') {
      alert('You cannot add an empty task');
    }
    if (newTask.trim() !== '') {
      const newTodo = {
        userId: 1,
        id: todos.length + 1,
        title: newTask,
        completed: false,
      };


      setTodos([...todos, newTodo]);
      localStorage.setItem('todos', JSON.stringify([...todos, newTodo]));
      setNewTask('');
    }
  };

  const handleToggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const handleEditTask = (id, newTitle) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      )
    );
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const handleDeleteTask = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    localStorage.setItem(
      'todos',
      JSON.stringify(todos.filter((todo) => todo.id !== id))
    );
  };

  return (
    <div>
      <h1>Todo App</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter new task"/>
      <img className={styles.add_button} src={add_button} alt='delete' onClick={handleAddTask}></img>
      <div>
        <label className={styles.completed}>Show Completed Tasks:</label>
        <input className={styles.completed}
          type="checkbox" style={{ width: '20px', height: '20px' }}
          checked={showCompleted}
          onChange={() => setShowCompleted(!showCompleted)}
        />
      </div>

      <TodoList
        todos={todos}
        showCompleted={showCompleted}
        onToggleComplete={handleToggleComplete}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
};

export default TodoApp;
