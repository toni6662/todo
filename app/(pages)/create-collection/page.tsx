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
                    <input className="group flex h-6 w-6 items-center justify-center sm:justify-start md:h-auto md:w-80 md:flex-none md:rounded-lg md:py-2.5 md:pr-3.5 md:pl-4 md:text-sm md:ring-1 md:ring-slate-200 md:hover:ring-slate-300 lg:w-96 dark:md:bg-slate-800/75 dark:md:ring-white/5 dark:md:ring-inset dark:md:hover:bg-slate-700/40 dark:md:hover:ring-slate-500" type="text" name="title" placeholder="Collection title" />
                    {
                        tasks.map((t, i) => {
                            return (
                                <div className="my-3" key={`${t}-${i}`}>
                                    <input type="text" name={`text-${i}`} readOnly value={t} className="bg-transparent" />
                                    <button className="bg-sky-300 hover:bg-sky-200 rounded-lg ml-3 text-slate-900" type="button" onClick={() => setTasks(prev => prev.filter((_t, int) => int !== i))}>REMOVE</button>
                                </div>
                            );
                        })
                    }
                    <fieldset className="grid auto-cols-max grid-flow-col items-center">
                        <input type="text" placeholder="Task" ref={refText} className="group flex h-6 w-6 items-center justify-center sm:justify-start md:h-auto md:w-80 md:flex-none md:rounded-lg md:py-2.5 md:pr-3.5 md:pl-4 md:text-sm md:ring-1 md:ring-slate-200 md:hover:ring-slate-300 lg:w-96 dark:md:bg-slate-800/75 dark:md:ring-white/5 dark:md:ring-inset dark:md:hover:bg-slate-700/40 dark:md:hover:ring-slate-500"/>
                        <button className="bg-sky-300 hover:bg-sky-200 rounded-lg ml-3 text-slate-900" type="button" onClick={addTask}>ADD</button>
                    </fieldset>
                    <div className="grid grid-cols-2 gap-4 items-center">
                        <button className="bg-sky-300 hover:bg-sky-200 rounded-lg text-slate-900">Create Collection</button>
                        <button className="bg-sky-300 hover:bg-sky-200 rounded-lg text-slate-900" onClick={() => router.back()} type="button">Go Back</button>
                    </div>
                </form>
                :
                <>
                    { status === 'Success' ? <h2 className="m-10">Collection created successfully!</h2> : <p>{status}</p> }
                    <Link href="/" className="bg-sky-300 hover:bg-sky-200 rounded-lg p-1 block text-center text-slate-900">Home page</Link>
                </>
            }
        </div>
    );
};

export default CreateCollection;