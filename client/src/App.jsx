import './App.css'
import { getTasks } from './api/tasks.api.js'
import { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <>
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
