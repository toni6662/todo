'use client';
import { useTodoStore } from "@/app/stores/todos";
import { Todo } from "@/app/types/global";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const ShowCollection = () => {
    const params = useParams();
    const {todos, setTodos, removeTodo, updateTodo}  = useTodoStore();
        const router = useRouter();

    useEffect(() => {
        (async() => {
            const todos = await axios.get(`/api/todos?id=${params.collection_id}`);
            setTodos(todos.data.data);
        })();
    }, []);

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
        <ul>
            {
                todos.map(t => {
                    return (
                        <li key={t.id} className={`${t.completed ? 'line-through' : 'none'}`}>
                            <span onClick={() => toggleActivity(t)}>{t.text}</span>
                            <button onClick={() => deleteTodo(t.id)} className="bg-sky-500 hover:bg-sky-700 rounded-xl">Remove</button>
                        </li>
                    );
                })
            }
        </ul>
        <button className="bg-sky-500 hover:bg-sky-700 rounded-xl mt-3" onClick={() => router.back()}>Go Back</button>
        </>
    );
}

export default ShowCollection;