import pool from "@/app/lib/db";

export async function GET() {
    const todos = await pool.query('SELECT * FROM todo_announced.todos;');
    return Response.json({ data: todos.rows })
}

export async function POST(req: Request) {
    const {text} = await req.json();
    const newTodo = await pool.query('INSERT INTO todo_announced.todos (text, completed) VALUES ($1, false) RETURNING *;', [text]);
    return Response.json({ data: newTodo.rows });
}

export async function PUT(req: Request) {
    const {text, completed, id} = await req.json();
    let res = null;
    if(text) {
        res = await pool.query('UPDATE todo_announced.todos SET text = $1 WHERE id = $2 RETURNING *;', [text, id]);
    }
    if(completed !== null) {
        res = await pool.query('UPDATE todo_announced.todos SET completed = $1 WHERE id = $2 RETURNING *;', [completed, id]);
    }
    return Response.json({ data: res?.rows });
}

export async function DELETE(req: Request) {
    const {id} = await req.json();
    await pool.query('DELETE FROM todo_announced.todos WHERE id=$1', [id]);
    return Response.json({message: 'Deleted!'});
}
