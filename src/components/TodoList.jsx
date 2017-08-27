import React from 'react'
const Todo = ({ onClick, completed, text }) => {
    return (<li
        style={{ textDecoration: completed ? 'line-through' : 'none' }}
        onClick={onClick}>
        {text}
    </li>)
}

const TodoList = ({ todos, onTodoClick }) => (
    <ul>
        {
            todos.map(todo => (
                <Todo
                    key={todo.id}
                    {...todo}
                    onClick={() => onTodoClick(todo.id)}
                />
            ))
        }
    </ul>
)

export default TodoList