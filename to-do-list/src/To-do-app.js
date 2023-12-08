import React, { useState } from 'react';
import delete_button from './images/delete.png';
import save_button from './images/bookmark.png'
import styles from "./to-do-app.module.css";
import edit_button from './images/pen.png'

const TodoList = ({ todos, showCompleted, onToggleComplete, onEditTask, onDeleteTask }) => {
  const [editableTask, setEditableTask] = useState(null);

  const handleEditInputChange = (e) => {
    setEditableTask({ ...editableTask, title: e.target.value });
  };

  const handleEditSave = () => {
    if (editableTask.title.trim() !== '') {
      onEditTask(editableTask.id, editableTask.title);
    }
    setEditableTask(null);
  };

  const renderTask = (todo) => {
    if (editableTask && editableTask.id === todo.id) {
      return (
        <>
          <input
            type="text"
            value={editableTask.title}
            onChange={handleEditInputChange}
          />
          <img className={styles.save_button} src={save_button} alt='save'  onClick={handleEditSave}></img>
        </>
      );
    }

    return (
      <>
        <input
          type="checkbox"
          checked={todo.completed} style={{width:'15px', height:'15px'}}
          onChange={() => onToggleComplete(todo.id)}
        />
        <span
          style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          onClick={() => onToggleComplete(todo.id)}
        >
          {todo.title}
        </span>
        <img className={styles.edit_button} src={edit_button} alt='edit'  onClick={() => setEditableTask(todo)} ></img>
      </>
    );
  };

  const filteredTodos = showCompleted ? todos.filter(todo => todo.completed) : todos;

  return (
    <ul>
      {filteredTodos.map(todo => (
        <li key={todo.id}>
          {renderTask(todo)}
          <img className={styles.delete_button} src={delete_button} alt='delete'  onClick={() => onDeleteTask(todo.id)}></img>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;


 