import { Box, Skeleton, Typography } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import ToDoForm from './ToDoForm';
import styles from './ToDo.module.css';
import ToDoList from './ToDoList';

const ToDo = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDataHandler = useCallback(async () => {
    setLoading(true);
    try{
      const response = await fetch(process.env.REACT_APP_API_URL+'todos');
      if(!response.ok){
          throw new Error('Something went wrong!');
      }
      const data = await response.json();
      setTodos(data);
    }catch(e){
      console.log(e.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
      loadDataHandler();
  }, [loadDataHandler]);

  const newItemHanler = (item) => {
    setTodos((prevState) => {
      return [item, ...prevState];
    });
    // console.log(todos);
  }

  const deleteReloadHandler = (_id) => {
    setTodos((prevState) => {
      return prevState.filter((todo) => todo._id !== _id)
    });
  }

  const updateTodoHandler = (_id, newTitle) => {
    const newState = todos.map(obj => {
      if (obj._id === _id) {
        return {...obj, title: newTitle};
      }

      return obj;
    });
    
    setTodos(newState);
  }
  
  return (
    <Box className={styles.container}>
      <Box className={styles.content}>
        <Typography variant="h4" sx={{ p: 1 }}>Let's not forget!</Typography>
        <ToDoForm onNewItemAdded={newItemHanler} />
        {
          loading?(
            <>
              <Skeleton variant="rounded" className={styles.skeleton} height={"3rem"} />
              <Skeleton variant="rounded" className={styles.skeleton} height={"3rem"} />
              <Skeleton variant="rounded" className={styles.skeleton} height={"3rem"} />
              <Skeleton variant="rounded" className={styles.skeleton} height={"3rem"} />
            </>
          ) : (
            todos.length?(<ToDoList todo={todos} onDelete={deleteReloadHandler} onUpdate={updateTodoHandler} />):(<Typography variant="h5">Add your first todo item!</Typography>)
          )
        }
      </Box>
    </Box>
  );
}

export default ToDo;