export default function TaskItem({ task, onDelete, onEdit }) {
  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>{task.status}</p>
      <button onClick={() => onEdit(task)}>Modifier</button>
      <button onClick={() => onDelete(task.id)}>Supprimer</button>
    </div>
  )
}
