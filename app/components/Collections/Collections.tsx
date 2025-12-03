'use client';

import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import { CollectionsType } from "./Collections.types";
import Link from "next/link";

const Collections = () => {
    const [collections, setCollection] = useState<CollectionsType[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const res =  await axios.get('/api/collection');
                setCollection(res.data.data);
            }
            catch(error) {
                console.error(error);
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

    return (
        <Suspense fallback={'...Loading'}>
            <div className="m-10">
                { collections.length ?
                    collections.map(c => {
                        return (
                            <div key={`collection-${c.id}`}>
                                <Link href={`/collection/${c.id}`}>{c.text}</Link>
                                <button onClick={() => removeCollection(c.id)} className="bg-sky-500 hover:bg-sky-700 rounded-lg ml-3">REMOVE</button>
                            </div>
                        );
                    })
                    : <span>No collections<br />Make a new collection with a "+" button on the bottom right corner.</span>
                }
            </div>
        </Suspense>
    );
};

export default Collections;