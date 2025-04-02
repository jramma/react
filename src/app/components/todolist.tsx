// Importamos React y el hook useState desde la librería de React
import React, { useState, useEffect } from "react";

// Este es un array con 3 tareas de ejemplo, que será nuestro estado inicial
// const initialTasks = [
//   { id: 1, text: 'Aprender a programar', completed: false },
//   { id: 2, text: 'Bailar', completed: true },
//   { id: 3, text: 'Preparar el CV', completed: false },
// ];
// Simulamos una API externa con un array de tareas
const fakeFetchTasks = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, text: "Aprender React", completed: false },
        { id: 2, text: "Estudiar para la prueba técnica", completed: true },
        { id: 3, text: "Preparar el CV", completed: false },
      ]);
    }, 1000); // Simula 1 segundo de carga
  });
};

interface Task {
    id: number;
    text: string;
    completed: boolean;
  }
  
// Componente principal de la app
export default function TaskApp() {
  // Estado que guarda todas las tareas (array de objetos)
  const [tasks, setTasks] = useState<Task[]>([]);

  // Estado para saber qué filtro se está aplicando: all, completed, pending
  const [filter, setFilter] = useState("all");

  // Estado para guardar lo que el usuario escribe en el input
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);

  // Función para marcar una tarea como completada o no
  //   const toggleTask = (id:any) => {
  //     setTasks(tasks.map(task =>
  //       // Si el ID coincide, invertimos el valor de 'completed'
  //       task.id === id ? { ...task, completed: !task.completed } : task
  //     ));
  //   };
  // useEffect para cargar datos simulados al montar el componente
  useEffect(() => {
    fakeFetchTasks().then((data:any) => {
      setTasks(data);
      setLoading(false);
    });
  }, []);

  const toggleTask = (id :any) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };
  // Función para agregar una nueva tarea
  const addTask = () => {
    // Si el input está vacío o solo tiene espacios, no hace nada
    if (newTask.trim() === "") return;

    // Creamos un nuevo objeto de tarea
    const newTaskObj = {
      id: Date.now(), // Generamos un ID único con timestamp
      text: newTask, // Texto desde el input
      completed: false, // Por defecto no está completada
    };

    // Agregamos la nueva tarea al estado
    setTasks([...tasks, newTaskObj]);

    // Limpiamos el input
    setNewTask("");
  };

  
  
  // Filtramos las tareas según el filtro actual (estado)
  const filteredTasks = tasks.filter((task: any) => {
    if (filter === "completed") return task.completed; // Solo completadas
    if (filter === "pending") return !task.completed; // Solo pendientes
    return true; // Todas
  });

  // Aquí empieza el renderizado del componente
  return (
    <div className="flex flex-col gap-6 items-center">
      <h1 className="text-4xl">Lista de Tareas</h1>

      {/* Input y botón para agregar tareas */}
      <div style={{ marginBottom: 10 }}>
        <input
          type="text"
          placeholder="Nueva tarea"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)} // Actualizamos el estado con lo que escribe el usuario
        />
        <button onClick={addTask}>Agregar</button>
      </div>

      {/* Botones para cambiar el filtro de tareas */}
      <div className="flex gap-4 items-center">
        <button onClick={() => setFilter("all")}>Todas</button>
        <button onClick={() => setFilter("completed")}>Completadas</button>
        <button onClick={() => setFilter("pending")}>Pendientes</button>
      </div>

      {/* Mostramos la lista de tareas filtradas */}
      {loading ? (
        <p>Cargando tareas...</p>
      ) : (
        <p className="text-2xl">Tareas: {filteredTasks.length}</p>
      )}

      {/* Lista de tareas */}
      <ul className="flex flex-col gap-4 border-1 p-6">
        {filteredTasks.map((task :any) => (
          <li
            key={task.id}
            onClick={() => toggleTask(task.id)} // Al hacer click, marcamos como completada o no
            style={{
              textDecoration: task.completed ? "line-through" : "none", // Tachamos si está completada
              cursor: "pointer",
              marginBottom: 5,
            }}
          >
            {task.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
