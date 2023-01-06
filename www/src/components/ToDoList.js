import ToDoItem from './ToDoItem';

const ToDoList = (props) => {
    return (
        <>
        {props.todo.map((to) => (
            <ToDoItem key={to._id} todoId={to._id} finished={to.finished} title={to.title} onDelete={props.onDelete} onUpdate={props.onUpdate} />
        ))}
        </>
    );
}

export default ToDoList;