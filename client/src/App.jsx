import './App.css'
import { getTasks } from './api/tasks.api.js'
import { useState, useEffect } from 'react';
import { createTask } from './api/tasks.api.js';

function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({title:'', description:'', userId:''});

  useEffect(() => {
    async function loadTasks() {
      try {
        setLoading(true);
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadTasks();
  }, []);

  if (loading) return <p className="state">Chargement...</p>;
  if (error) return <p className="state error">Erreur : {error}</p>;

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTask = await createTask(form);
      setTasks([...tasks, newTask]);
      setForm({title:'', description:'', userId:''});
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <>
    <form onSubmit={onSubmit} className="task-form">
      <input 
        type="text"
        placeholder="Titre de la tâche"
        value={form.title}
        onChange={(e) => setForm({...form, title: e.target.value})}
        required
      />
      <textarea
        placeholder="Description de la tâche"
        value={form.description}
        onChange={(e) => setForm({...form, description: e.target.value})}
        required
      />
      <input 
        type="text"
        placeholder="ID de l'utilisateur"
        value={form.userId}
        onChange={(e) => setForm({...form, userId: e.target.value})}
        required
      />
      <button type="submit">Ajouter</button>
    </form>
      <div className="header">
        <p className="header-label">Task Manager — {tasks.length} tâches</p>
        <h1>Mes <em>tâches</em></h1>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={task.id}>
            <span className="task-number">{String(index + 1).padStart(2, '0')}</span>
            <div className="task-content">
              <h2>{task.title}</h2>
              <p>{task.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
