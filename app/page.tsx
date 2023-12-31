"use client"

import { UUID } from "crypto";
import { SetStateAction, useState } from "react"

interface Item {
  id: UUID;
  name: string;
  category: UUID;
  isAssumedCategory: boolean;
}
interface ItemList {
  [id: UUID]: Item;
}
interface TermList {
  [name: string]: UUID;
}

interface Category {
  id: UUID;
  name: string;
}
// TODO: something
interface CategoryList {
  [id: UUID]: Category;
}
const DEFAULT_CATEGORY: Category = {
  id: '0000-0000-0000-0000-0000',
  name: 'Unknown',
}

type ListFunc = (value: SetStateAction<Item[]>) => void;

export default function Home() {
  const [ready, setReady] = useState([] as Item[]);
  const [complete, setComplete] = useState([] as Item[]);
  const [itemList, setItemList] = useState({} as ItemList);
  const [term, setTerm] = useState('');
  const [termList, setTermList] = useState({} as TermList);

  const handleChange = (e: any) => {
    setTerm(e.target.value);
  }

  const addToReady = (e: any) => {
    e.preventDefault();
    // Check if Item term already exists
    let item: Item;
    if (termList[term]) {
      item = itemList[termList[term]];
    } else {
      item = {
        id: crypto.randomUUID() as UUID,
        name: term,
        // TODO: analyze term and try to match to category
        category: DEFAULT_CATEGORY.id,
        isAssumedCategory: true,
      };
      setItemList({ ...itemList, [item.id]: item });
      setTermList({ ...termList, [term]: item.id });
    }
    setReady(old => [...old, item]);
    setTerm('');
  }

  /**
   * Move item into one list, and out of another.
   * @param addFunc React set state function to add the item to
   * @param remFunc Set state function to remove the item from
   * @param item Item in list
   * @param index Index to splice
   */
  const toggleItem = (addFunc: ListFunc, remFunc: ListFunc, item: Item, index: number) => {
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
          <input type="text" list="terms" name="term" className="text-black" value={term} onChange={handleChange} />
          <datalist id="terms">{Object.keys(termList).map((t, i) => 
            <option key={i} value={t}>{t}</option>
          )}
          </datalist>
          <input type="submit" value="Submit" />
        </form>
      </div>
      <div className="flex w-full h-auto">
        <div className="flex flex-col w-1/2 border-r pr-1">
          <h3 className="w-full">List</h3>
          <div className="w-full flex flex-col">{ready.map((item, index) => 
            <label key={index}>
              <input type="checkbox" checked={false} name={item.name} id={item.id} onChange={() => toggleItem(setComplete, setReady, item, index)} />
              {item.name}
            </label>
          )}
          </div>
        </div>
        <div className="flex flex-col w-1/2 border-l pl-1">
          <h3 className="w-full">Complete</h3>
          <div className="w-full flex flex-col">{complete.map((item, index) => 
            <label key={index}>
              <input type="checkbox" checked={true} name={item.name} id={item.id} onChange={() => toggleItem(setReady, setComplete, item, index)} />
              {item.name}
            </label>
          )}
          </div>
        </div>
      </div>
    </main>
  )
}
