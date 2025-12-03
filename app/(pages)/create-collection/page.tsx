'use client';

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const CreateCollection = () => {
    const [tasks, setTasks] = useState<string[]>([]);
    const refText = useRef<HTMLInputElement | null>(null);
    const [status, setStatus] = useState('');
    const router = useRouter();

    const addTask = async () => {
        if(refText.current?.value.length) {
            await setTasks(prev => [...prev, refText.current!.value]);
            (refText.current as HTMLInputElement).value = '';
        }
    }

    const createCollection = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await axios.post('/api/collection', {...data});
            setStatus('Success');
        }
        catch(error) {
            console.error('Error', error);
            if(axios.isAxiosError(error)) {
                setStatus(error.message || 'Something went wrong. Please try again!');
            }
            else {
                setStatus('Something went wrong. Please try again!');
            }
        }

        console.log(data);
    }

    return (
        <div className="max-w-lg m-auto text-left">
            {status === '' ?
                <form onSubmit={createCollection}>
                    <input className="my-5" type="text" name="title" placeholder="Collection title" />
                    {
                        tasks.map((t, i) => {
                            return (
                                <div className="my-3" key={`${t}-${i}`}>
                                    <input type="text" name={`text-${i}`} readOnly value={t} className="bg-transparent" />
                                    <button className="bg-sky-500 hover:bg-sky-700 rounded-lg" type="button" onClick={() => setTasks(prev => prev.filter((_t, int) => int !== i))}>REMOVE</button>
                                </div>
                            );
                        })
                    }
                    <fieldset>
                        <input type="text" placeholder="Task" ref={refText}/>
                        <button className="bg-sky-500 hover:bg-sky-700 rounded-lg ml-3" type="button" onClick={addTask}>ADD</button>
                    </fieldset>
                    <button className="bg-sky-500 hover:bg-sky-700 rounded-lg mt-10 w-full">Create Collection</button>
                    <button className="bg-sky-500 hover:bg-sky-700 rounded-lg mt-3 w-full" onClick={() => router.back()}>Go Back</button>
                </form>
                :
                <>
                    { status === 'Success' ? <h2 className="m-10">Collection created successfully!</h2> : <p>{status}</p> }
                    <Link href="/" className="bg-sky-500 hover:bg-sky-700 rounded-lg p-1 block text-center">Home page</Link>
                </>
            }
        </div>
    );
};

export default CreateCollection;