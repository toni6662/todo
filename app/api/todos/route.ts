import pool from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const {searchParams} = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
        return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
    }
    const collectionId = parseInt(id, 10);
    if (isNaN(collectionId)) {
        return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }
    const todos = await pool.query('SELECT * FROM todo_announced.todos WHERE collection_id=$1;', [collectionId]);
    return NextResponse.json({ data: todos.rows })
}

export async function POST(req: Request) {
    const {text} = await req.json();
    const newTodo = await pool.query('INSERT INTO todo_announced.todos (text, completed) VALUES ($1, false) RETURNING *;', [text]);
    return NextResponse.json({ data: newTodo.rows });
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
    return NextResponse.json({ data: res?.rows });
}

export async function DELETE(req: Request) {
    const {id} = await req.json();
    await pool.query('DELETE FROM todo_announced.todos WHERE id=$1', [id]);
    return NextResponse.json({message: 'Deleted!'});
}
