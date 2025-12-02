'use client';

const TodoForm = () => {
    const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log((e.target as HTMLFormElement)['text'].value);
    }
    
    return (
        <form onSubmit={addTodo}>
            <input type="text" name="text" />
            <button>Add</button>
        </form>
    );
}

export default TodoForm;