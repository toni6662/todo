'use client';
import { useTodoStore } from "@/app/stores/todos";
import { Todo } from "@/app/types/global";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ShowCollection = () => {
    const params = useParams();
    const {todos, setTodos, removeTodo, updateTodo}  = useTodoStore();
    const [title, setTitle] = useState('');
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async() => {
            try {
                const todos = await axios.get(`/api/todos?id=${params.collection_id}`);
                console.log(todos);
                setTitle(todos.data.title[0].text);
                setTodos(todos.data.data);
            }
            catch(error) {
                console.error(error);
            }
            finally {
                setLoading(false);
            }
        })();
    }, []);

    const toggleActivity = async(todo: Todo) => {
        setLoading(true);
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
        finally {
            setLoading(false);
        }
    }

    const deleteTodo = async(id: number) => {
        setLoading(true);
        try {
            await axios.delete('/api/todos', {data: {id: id}});
            removeTodo(id);
        }
        catch(err) {
            console.error('Cannot delete: ', err);
        }
        finally {
            setLoading(false);
        }
    }
    console.log(todos);
    return (
        <>
        <h1 className="m-10">{title}</h1>
        <ul>
            {
                todos.map((t, i) => {
                    return (
                        <li key={t.id} className={`${i === 0 && 'border-t'} border-b border-white/50 max-w-lg m-auto flex items-center justify-between px-4 py-2 ${t.completed ? 'line-through' : 'none'}`}>
                            <span onClick={() => toggleActivity(t)}>{t.text}</span>
                            <button onClick={() => deleteTodo(t.id)} className="bg-sky-300 hover:bg-sky-200 rounded-lg mx-3 my-1">Remove</button>
                        </li>
                    );
                })
            }
        </ul>
        {loading && <div>Loading...</div>} 
        <button className="bg-sky-300 hover:bg-sky-200 rounded-lg" onClick={() => router.back()}>Go Back</button>
        </>
    );
}

export default ShowCollection;