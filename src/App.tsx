import { useEffect, useState } from "react";
import Head from "./Todolist/Head";
import BodyValue from "./Todolist/BodyValue"


const storageKey = 'todo';
interface projProps {
  id: number
  name: string
}

interface projectData extends projProps{
data: string
}

function MyApp() {
const [data, setData]= useState<projProps | []>([])


function setTaskAndSave(newTask: projProps) {
  console.log('newTask', newTask);
  
  setData(newTask);

  localStorage.setItem(storageKey, JSON.stringify(newTask));
  // localStorage.removeItem("storageKey");
}

function taskSave() {
 const saved = localStorage.getItem(storageKey)
  if(saved) {
    setData(JSON.parse(saved))
  }
}

useEffect(() =>{
  taskSave();
}, [])

function onSubmit(e: projectData ) {
  setTaskAndSave([...data, {name: e, id: Math.random()}])
  // setIsState(prev=>[...prev, text])
  
}

function handleDel(id : projProps){
  const del = data.filter((list)=> list.id !== id)
  // console.log(del);
  setTaskAndSave(del)
}

function setEdit({name , id}: projProps) {
  setTaskAndSave(
    data.map((todo) => {
      if (todo.id === id) {
        todo.name = name;
      }
      return todo;
    })
  );
}
  return(
    <div>
      <Head  onSubmit={onSubmit} />
      <BodyValue product={data} handleDel={handleDel} setEdit={setEdit}/>
    </div>
)
}
export default MyApp 



