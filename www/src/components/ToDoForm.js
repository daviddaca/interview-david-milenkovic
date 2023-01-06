import { Alert, Button, TextField } from '@mui/material';
import styles from './ToDoForm.module.css';
import { useState } from 'react';

const ToDoForm = (props) => {
  const [todoInput, setTodoInput] = useState('');
  const [error, setError] = useState(false);

  const insertTodo = async () => {
    try{
      const response = await fetch(process.env.REACT_APP_API_URL+'todos', {
        method: 'POST',
        body: JSON.stringify({
          title: todoInput
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if(!response.ok){
          throw new Error('Something went wrong!');
      }
      const data = await response.json();
      props.onNewItemAdded(data);
      // setTodos(data);
    }catch(e){
      console.log(e.message);
    }
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if(todoInput===''){
      setError(true);
    }else{
      setError(false);
      
      insertTodo();
      // console.log(todoInput);
    }
    setTodoInput('');
  }

  const todoInputChangeHandler = (event) => {
    if(todoInput!=='') setError(false);
    
    setTodoInput(event.target.value);
  }

  return (
    <form onSubmit={formSubmitHandler} className={styles['todo-form']}>
      <TextField autoFocus onChange={todoInputChangeHandler} id="todo-input" value={todoInput} label="Add a ToDo ..." size="small" />
      <Button type="submit" variant="contained">Add ToDo</Button>
      {error&&<Alert severity="error" sx={{ mt: 1 }}>Input can not be empty!</Alert>}
    </form>
  );
}

export default ToDoForm;