'use client';

import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import { CollectionsType } from "./Collections.types";
import Link from "next/link";

const Collections = () => {
    const [collections, setCollection] = useState<CollectionsType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const res =  await axios.get('/api/collection');
                setCollection(res.data.data);
            }
            catch(error) {
                console.error(error);
            }
            finally {
                setLoading(false);
            }
        })();
    }, []);

    const removeCollection = async(id: number) => {
        try {
            const res =  await axios.delete(`/api/collection`, {data: {id: id}});
            setCollection(prev => prev.filter(t => t.id !== id));
        }
        catch(error) {
            console.error(error);
        }
    }

    if(loading) return <div>Loading...</div>

    return (
        <div className="m-10">
            { collections.length ? 
                <>
                <h1>Collections: </h1>
                {
                    collections.map((c, i) => {
                        return (
                            <div key={`collection-${c.id}`} className={`${i === 0 && 'border-t'} border-b border-white/50 max-w-lg m-auto flex items-center justify-between px-4`}>
                                <Link href={`/collection/${c.id}`}>{c.text}</Link>
                                <button onClick={() => removeCollection(c.id)} className="bg-sky-300 hover:bg-sky-200 rounded-lg ml-3">REMOVE</button>
                            </div>
                        );
                    })
                }
                </>
                :
                <span>No collections<br /></span>
            }
            <small>Make a new collection with a "+" button on the bottom right corner.</small>
        </div>
    );
};

export default Collections;