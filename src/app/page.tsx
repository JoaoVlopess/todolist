"use client"

import { useState } from "react";
import { TodoItem } from "./types/TodoItem";

const Page = () => {
  const [itemInput, setItemInput] = useState('');
  const [list, setList] = useState<TodoItem[]>([
    {label:"Lopes", checked: false}
  ]);

  const handleAddButton = () => {
    if (itemInput.trim() !== ''){
      setList([...list,{label:itemInput, checked: false}]);
      setItemInput('');
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleAddButton();
    }
  }

  const deleteItem = (index: number) => {
    setList(list.filter((item, key) => key !== index));
  }

  const toggleItem = (index: number) => {
    let newLIst = [...list]
    newLIst[index].checked = !newLIst[index].checked
    setList(newLIst);
  }

  return (
    <div className="w-full h-screen bg-slate-800 flex  justify-center p-6">
      <div className="w-full max-w-xl my-7 border-2 rounded-3xl  text-black shadow shadow-black bg-white">
        
        <div className="p-5 font-bold text-2xl  flex items-center justify-center">TO DO LIST</div>
        <div className="px-20 pb-7 font text-xl border-b flex ">
          <input 
          type="text" 
          placeholder="O que deseja fazer?"
          className="p-3 w-full h-full border-2 border-black rounded-full mr-7 bg-Inputcolor"
          value = {itemInput}
          onChange={e => setItemInput(e.target.value)}
          onKeyDown={handleKeyDown}
          />

          <button 
          onClick={handleAddButton} 
          className="border text-white border-black bg-purple-500 rounded-full w-12 h-10 flex items-center justify-center justify-self-center">+
          </button>
          
        </div>
        <ul className="w-full px-5 text-xl">

        {list.map((item,index)=> (
          <li key={index} className="mx-8 my-3 p-2 flex items-center">
           <input
            type="checkbox"
            className="form-checkbox appearance-none border border-gray-400 h-6 w-6 mr-4 rounded-full shadow-md checked:bg-purple-800 focus:outline-none cursor-pointer  transition-colors duration-300"
            checked ={item.checked}
            onClick={() => toggleItem(index)}
            />
            <p 
            className= {`${item.checked === true ? "text-gray-400 line-through" : "text-black" }`}>{item.label}</p> 
            <button onClick={() => deleteItem(index)} className="ml-auto"> <img src="assets/close.png" alt="" className="h-4 w-4" /> </button>
          </li>
        ))}

        </ul>

      </div>
    </div>
  );
}

export default Page;