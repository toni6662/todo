import pool from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    const todos = await pool.query('SELECT * FROM todo_announced.collection');
    return NextResponse.json({ data: todos.rows })
}

export async function POST(req: Request) {
    const {title, ...data} = await req.json();
    if(!data) {
        return NextResponse.json({error: 'No data to set'});
    }
    const newCollection = await pool.query('INSERT INTO todo_announced.collection (text, date) VALUES ($1, $2) RETURNING *', [title, new Date().toISOString().split('T')[0]]);
    const collectionID = newCollection.rows[0].id;
    await Promise.all(
        Object.values(data).map((t) => {
            pool.query('INSERT INTO todo_announced.todos (text, completed, collection_id) VALUES ($1, false, $2) RETURNING *', [t, collectionID])
        })
    );
    return NextResponse.json({ data: newCollection.rows });
}

export async function DELETE(req: Request) {
    const {id} = await req.json();
    await pool.query('DELETE FROM todo_announced.collection WHERE id=$1', [id]);
    await pool.query('DELETE FROM todo_announced.todos WHERE collection_id=$1', [id]);
    return NextResponse.json({message: 'Deleted!'});
}