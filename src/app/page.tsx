"use client"

import { useState } from "react";
import { TodoItem } from "./types/TodoItem";
import { IoMdClose } from "react-icons/io";

const Page = () => {
  const [itemInput, setItemInput] = useState('');
  const [list, setList] = useState<TodoItem[]>([]);

  const handleAddButton = () => {
    if (itemInput.trim() !== '') {
      setList([...list, { label: itemInput, checked: false }]);
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
      <div className="w-full max-w-xl my-7 border-2 rounded-3xl  text-black shadow shadow-black bg-white ">

        <div className="p-5 font-bold text-2xl  flex items-center justify-center ">TO DO LIST <img className="ml-3" src="assets/lista-de-tarefas (1).png" alt="" /></div>

        <div className="px-20 pb-7 font text-xl border-b flex items-center ">
          <input
            type="text"
            placeholder="O que deseja fazer?"
            className="p-3 w-full h-full border-2 border-black rounded-full mr-4 bg-Inputcolor"
            value={itemInput}
            onChange={e => setItemInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button
            onClick={handleAddButton}
            className="border text-white border-black bg-purpleTheme rounded-full w-12 h-10 flex items-center justify-center ">
            <img src="assets/mais.png" alt="" />
          </button>

        </div>

        <div className="w-full scroll_bar overflow-auto" style={{maxHeight: "620px"}}>
          <ul className="px-5 text-x">

            {list.map((item, index) => (
              <li key={index} className="mx-8 my-3 p-2 flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox appearance-none border border-gray-400 h-6 w-6 mr-4 rounded-full shadow-md checked:bg-purpleTheme focus:outline-none cursor-pointer  transition-colors duration-300"
                  checked={item.checked}
                  onClick={() => toggleItem(index)}
                />
                <p
                  className={`${item.checked === true ? "text-gray-400 line-through" : "text-black"}`}>{item.label}</p>
                <button onClick={() => deleteItem(index)} className="ml-auto"> <IoMdClose className=" hover:text-purpleTheme h-5 w-5" /> </button>
              </li>
            ))}

          </ul>
        </div>


      </div>
    </div>
  );
}

export default Page;