"use client"

import { SetStateAction, useState } from "react"

type ListFunc = (value: SetStateAction<string[]>) => void;

export default function Home() {
  const [ready, setReady] = useState([] as string[]);
  const [complete, setComplete] = useState([] as string[]);
  const [term, setTerm] = useState('');

  const handleChange = (e: any) => {
    setTerm(e.target.value);
  }

  const addToReady = (e: any) => {
    e.preventDefault();
    setReady(old => [...old, term]);
    setTerm('');
  }

  const toggleItem = (addFunc: ListFunc, remFunc: ListFunc, item: string, index: number) => {
    addFunc(old => [...old, item]);
    remFunc(old => {
      return old.filter((_, i) => i !== index);
    });
  }

  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex flex-col w-full">
        <h2 className="w-full">Megalist</h2>
        <form className="flex justify-between" onSubmit={addToReady}>
          <input type="text" className="text-black" value={term} onChange={handleChange} />
          <input type="submit" value="Submit" />
        </form>
      </div>
      <div className="flex w-full h-auto">
        <div className="flex flex-col w-1/2 border-r pr-1">
          <h3 className="w-full">List</h3>
          <div className="w-full flex flex-col">{ready.map((item, index) => 
            <label key={index}>
              <input type="checkbox" checked={false} name={item} id={`${item}-${index}`} onChange={() => toggleItem(setComplete, setReady, item, index)} />
              {item}
            </label>
          )}
          </div>
        </div>
        <div className="flex flex-col w-1/2 border-l pl-1">
          <h3 className="w-full">Complete</h3>
          <div className="w-full flex flex-col">{complete.map((item, index) => 
            <label key={index}>
              <input type="checkbox" checked={true} name={item} id={`${item}-${index}`} onChange={() => toggleItem(setReady, setComplete, item, index)} />
              {item}
            </label>
          )}
          </div>
        </div>
      </div>
    </main>
  )
}
