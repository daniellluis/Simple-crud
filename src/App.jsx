import React from "react";
import { nanoid } from 'nanoid'


function App() {

  const [tarea,setTarea] = React.useState('')
  const [tareas, setTareas] = React.useState([])
  const [modoEdicion ,setModoEdicion] = React.useState(false)
  const [id, setId] = React.useState("")
  const [error,setError] = React.useState(null)

const agregarTarea =  (e) => {
 e.preventDefault()
 
 if(!tarea.trim()){
   console.log("element empty")
   setError("write something please...")
   return
  }
  console.log(tarea)
  setTareas([
    ...tareas,
    {id: nanoid() ,nombreTarea: tarea} 
  ])
  setTarea("")
  setError(null)
}

const eliminarTarea = (id) => {
  // console.log("tarea eliminada")
  const arrayFilter = tareas.filter(tarea => tarea.id !== id)
  setTareas(arrayFilter)
}

const editar = item => {
  console.log(item)
  setModoEdicion(true)
  setTarea(item.nombreTarea)
  setId(item.id)
}

const editarTarea = (e) => {
  e.preventDefault()
   if(!tarea.trim()){
    console.log("element empty")
    setError("write something please...")
    return
   }

   const arrayEditado = tareas.map(
     item => item.id === id ? {id:id, nombreTarea:tarea} : item)
   setTareas(arrayEditado)
   setModoEdicion(false)
   setTarea("")
   setId("")
   setError(null)
   
}


  return (
    <div className="container mt-5">
       <h1 className="text-center">Simple Crud</h1>
       <hr />
       <div className="row">
         <div className="col-8">
           <h4 className="text-center">tasks</h4>
            <ul className="list-group">
                {
              tareas.length === 0 ? (
                <li className="list-group-item">no homework</li>
              ):(
                tareas.map(item => (
                <li className="list-group-item" key={item.id}>
                  <span className="lead">{item.nombreTarea}</span>
                    <button 
                    className="btn btn-sm btn-danger float-end mx-2"
                    onClick={()=> eliminarTarea(item.id)}>
                    Delete
                    </button>
                  
                    <button 
                    className="btn btn-sm btn-warning float-end"
                    onClick={()=> editar(item)}>
                      Edit
                    </button>
                </li>
                  ))
                 )    
                }
             </ul>
         </div>
         <div className="col-4">
         <h4 className="text-center">
           {modoEdicion ? "Edit Task" : "enter homework"}
         </h4>

         <form onSubmit={ modoEdicion ? editarTarea : agregarTarea}>
           {
             error ? <span className="text-danger">{error}</span> : null
           }
           <input 
             type="text" 
             className="form-control mb-2" 
             placeholder="ingrese Tarea"
             onChange={e => setTarea(e.target.value)}
             value={tarea}
             />
             {
               modoEdicion ? (<button className="btn btn-warning w-100" type="submit"> Edit</button>) : 
               (<button className="btn btn-dark w-100" type="submit">Add</button>)
             }
         </form>
         </div>
       </div>
    </div>
  );
}

export default App;
