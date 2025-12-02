'use client';
import { useEffect } from 'react';
import axios from "axios";
import { useTodoStore } from '@/app/stores/todos';
import { Todo } from '@/app/types/global';

const TodoForm = () => {
    const {todos, setTodos, addTodo, removeTodo, updateTodo}  = useTodoStore();

    useEffect(() => {
        (async () => {
            const res = await axios.get('/api/todos');
            setTodos(res.data.data);
        })();
    }, []);

    const addNewTodo = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const field = (e.target as HTMLFormElement)['text'];

        try {
            const res = await axios.post('/api/todos', {
                text: field.value,
                completed: false
            });

            addTodo(res.data.data[0]);
        }
        catch(err) {
            console.error('Cannot create: ', err);
        }
        console.log(field.value);
    }

    const toggleActivity = async(todo: Todo) => {
        try {
            const res = await axios.put('/api/todos', {
                id: todo.id,
                completed: !todo.completed
            });

            updateTodo(todo.id, res.data.data[0]);
        }
        catch(err) {
            console.error('Cannot update: ', err);
        }
    }

    const deleteTodo = async(id: number) => {
        try {
            await axios.delete('/api/todos', {data: {id: id}});
            removeTodo(id);
        }
        catch(err) {
            console.error('Cannot delete: ', err);
        }
    }
    
    return (
        <>  
            <form onSubmit={addNewTodo} className="m-8">
                <input type="text" name="text" />
                <button>Add</button>
            </form>
            <ul>
            {
                todos.map(t => {
                    return (
                        <li key={t.id} className={`${t.completed ? 'line-through' : 'none'}`}>
                            <span onClick={() => toggleActivity(t)}>{t.text}</span>
                            <button onClick={() => deleteTodo(t.id)}>Remove</button>
                        </li>
                    );
                })
            }
            </ul>
        </>
    );
}

export default TodoForm;