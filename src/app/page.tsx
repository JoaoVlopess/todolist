"use client"

import { useState, useEffect } from "react";
import { TodoItem } from "./types/TodoItem";
import { IoMdClose } from "react-icons/io";

const Page = () => {
  const [itemInput, setItemInput] = useState('');
  const [list, setList] = useState<TodoItem[]>([]);
  const [placeholder, setPlaceholder] = useState('O que deseja fazer?');

  useEffect(() => {
    const updatePlaceholder = () => {
      setPlaceholder(window.innerWidth < 490 ? 'Adicionar...' : 'O que deseja fazer?');
    };

    updatePlaceholder(); // Atualiza na montagem
    window.addEventListener('resize', updatePlaceholder); // Atualiza na mudança de tamanho

    return () => window.removeEventListener('resize', updatePlaceholder); // Limpa o evento
  }, []);

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
      <div className="w-full max-h-full  my-7 mx-4 border-2 rounded-3xl  text-black shadow shadow-black bg-white xs:max-w-sm sm:max-w-md md:max-w-lg xl:max-w-xl" >

        <div className="p-5 font-bold text-2xl  flex items-center justify-center ">TO DO LIST <img className="ml-3" src="assets/lista-de-tarefas (1).png" alt="" /></div>

        <div className="px-12 pb-7 text-xl border-b flex items-center ">
          <input
            type="text"
            placeholder= {placeholder}
            className="p-4 w-full h-full border-2 text-md border-black rounded-full mr-4 bg-Inputcolor"
            value={itemInput}
            onChange={e => setItemInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button
            onClick={handleAddButton}
            className="border-2 text-white border-black bg-purpleTheme rounded-full w-12 h-10 flex items-center justify-center ">
            <img src="assets/mais.png" alt="" />
          </button>

        </div>

        <div className="w-full scroll_bar overflow-auto overflow-x-hidden"
        style={{ maxHeight: `calc(100vh - 280px)` }}>
          <ul className="px-5 text-x overflow-x-scroll whitespace-nowrap no-scrollbar">

            {list.map((item, index) => (
              <li key={index} className="mx-8 my-3 p-2 flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox appearance-none border border-gray-400 h-5 w-5 mr-4 rounded-full shadow-md checked:bg-purpleTheme focus:outline-none cursor-pointer  transition-colors duration-300"
                  checked={item.checked}
                  onChange={() => toggleItem(index)}
                />
                <p
                  className={`text-xl ${item.checked === true ? "text-gray-400 line-through" : "text-black"}`}>{item.label}</p>
                <button onClick={() => deleteItem(index)} className="ml-auto"> <IoMdClose className=" hover:text-purpleTheme h-5 w-5 hover:scale-125" /> </button>
              </li>
            ))}

          </ul>
        </div>


      </div>
    </div>
  );
}

export default Page;