'use client';
import { useTodoStore } from "@/app/stores/todos";
import { Todo } from "@/app/types/global";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ShowCollection = () => {
    const params = useParams();
    const {todos, setTodos, removeTodo, updateTodo}  = useTodoStore();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async() => {
            try {
                const todos = await axios.get(`/api/todos?id=${params.collection_id}`);
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

    return (
        <>
        <ul className="m-10">
            {
                todos.map(t => {
                    return (
                        <li key={t.id} className={`${t.completed ? 'line-through' : 'none'}`}>
                            <span onClick={() => toggleActivity(t)}>{t.text}</span>
                            <button onClick={() => deleteTodo(t.id)} className="bg-sky-500 hover:bg-sky-700 rounded-lg mx-3 my-1">Remove</button>
                        </li>
                    );
                })
            }
        </ul>
        {loading && <div>Loading...</div>} 
        <button className="bg-sky-500 hover:bg-sky-700 rounded-lg" onClick={() => router.back()}>Go Back</button>
        </>
    );
}

export default ShowCollection;