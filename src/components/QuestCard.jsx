function QuestCard({ quest }) {
  return (
    <div className="card bg-base-100 shadow-md w-96">
      <div className="card-body">
        <h2 className="card-title">{quest.name}</h2>
        {quest.description && (
          <p className="text-sm opacity-70">{quest.description}</p>
        )}

        {/* Tasks */}
        <ul className="mt-3 space-y-2">
          {quest.tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center gap-2 border p-2 rounded-md"
            >
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                checked={task.completed}
                readOnly
              />
              <span className={task.completed ? "line-through opacity-60" : ""}>
                {task.name}
              </span>
            </li>
          ))}
        </ul>

        <div className="card-actions justify-end mt-4">
          <button className="btn btn-sm btn-primary">Add Task</button>
          <button className="btn btn-sm">Edit</button>
        </div>
      </div>
    </div>
  );
}

export default QuestCard;
