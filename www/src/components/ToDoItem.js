import { Box, Checkbox , Typography, Modal, TextField, Button, Alert } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import styles from './ToDoItem.module.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useState, useCallback } from 'react';

const ToDoItem = (props) => {
    const [finished, setFinished] = useState(props.finished);
    const [open, setOpen] = useState(false);
    const [editTodo, setEditTodo] = useState(props.title);
    const [error, setError] = useState(false);

    const updateFinished = useCallback(async (fin) => {
        try{
            // console.log(finished);
            const response = await fetch(process.env.REACT_APP_API_URL+'todos/'+props.todoId, {
                method: 'PUT',
                body: JSON.stringify({
                    finished: fin
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(!response.ok){
                throw new Error('Something went wrong!');
            }
            // const data = await response.json();
        }catch(e){
            console.log(e.message);
        }
    }, []);

    const updateTitle = useCallback(async (newTitle) => {
        try{
            // console.log(finished);
            const response = await fetch(process.env.REACT_APP_API_URL+'todos/'+props.todoId, {
                method: 'PUT',
                body: JSON.stringify({
                    title: newTitle
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(!response.ok){
                throw new Error('Something went wrong!');
            }
            const data = await response.json();

            props.onUpdate(props.todoId, data.title);
            console.log('edited');
        }catch(e){
            console.log(e.message);
        }
    }, []);

    const clickCheckboxHandler = () => {
        updateFinished(!finished);
        setFinished(!finished);
    }

    const clickTodoHandler = async () => {
        try{
            const response = await fetch(process.env.REACT_APP_API_URL+'todos/'+props.todoId, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(!response.ok){
                throw new Error('Something went wrong!');
            }
            const data = await response.json();

            props.onDelete(data._id);
        }catch(e){
            console.log(e.message);
        }
    }

    const openModalHandler = () => {
        setOpen(true);
    }

    const closeModalHandler = () => {
        setOpen(false);
    }

    const todoInputChangeHandler = (event) => {
        if(editTodo!=='') setError(false);
    
        setEditTodo(event.target.value);
    }

    const updateTodoHandler = (event) => {
        event.preventDefault();
        if(editTodo===''){
            setError(true);
        }else{
            updateTitle(editTodo);

            setError(false);
            setOpen(false);
        }

    }

    return (
        <>
            <Modal 
                open={open}
                onClose={closeModalHandler}
            >
                <Box className={styles.modal}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    Edit "{props.title}" task
                    </Typography>
                    <form onSubmit={updateTodoHandler}>
                        <input type="hidden" value={props.id}/>
                        <TextField autoFocus id="todo-input" value={editTodo} onChange={todoInputChangeHandler} label="Edit a ToDo ..." size="small" />
                        <Button type="submit" variant="contained">Edit ToDo</Button>
                        {error&&<Alert severity="error" sx={{ mt: 1 }}>Input can not be empty!</Alert>}
                    </form>
                </Box>
            </Modal>
            <Box className={`${styles['todo-item']} ${finished?styles.finished:''}`}>
                <Grid2 container spacing={2}>
                    <Grid2 xs={2}>
                        {/* finished?true:false because my api return 0 or 1 for true and false. Checkbox component require true or false */}
                        <Checkbox checked={finished?true:false} onClick={clickCheckboxHandler} checkedIcon={<CheckCircleOutlineIcon />} icon={<RadioButtonUncheckedIcon />} color="secondary" sx={{color: "#fff"}} />
                    </Grid2>
                    <Grid2 xs={8} className={styles.title}>
                        <Typography align='left' sx={{fontSize: "1.4rem", lineHeight: 1.8 }}>{props.title}</Typography>
                    </Grid2>
                    <Grid2 xs={2} className={styles.edits}>
                        <EditIcon onClick={openModalHandler} />
                        <DeleteIcon onClick={clickTodoHandler} />
                    </Grid2>
                </Grid2>
            </Box>
        </>
    );
}

export default ToDoItem;