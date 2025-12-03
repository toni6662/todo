import Link from "next/link";
import Collections from "./components/Collections/Collections";

export default function Home() {
  // get all collections

  return (
    <div>
      <Collections />
      <Link href="/create-collection" className="w-10 h-10 p-2 m-0 absolute bottom-10 right-10 bg-sky-500 hover:bg-sky-700 rounded-xl">+</Link>
    </div>
  );
}
