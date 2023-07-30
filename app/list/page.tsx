"use client"

import { useState } from "react"

export default function List() {
  const [list, setList] = useState([] as string[]);
  const [term, setTerm] = useState('');

  const handleChange = (e: any) => {
    setTerm(e.target.value);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setList(old => [...old, term]);
    setTerm('');
  }

  const removeItem = (index: number) => {
    setList(old => {
      return old.filter((_, i) => i !== index);
    });
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <form onSubmit={handleSubmit}>
          <input type="text" className="text-black" value={term} onChange={handleChange} />
          <input type="submit" value="Submit" />
        </form>
        <ul>{list.map((item, index) => 
          <li>{item} <button onClick={() => removeItem(index)}>X</button></li>
        )}
        </ul>
      </div>
    </main>
  )
}