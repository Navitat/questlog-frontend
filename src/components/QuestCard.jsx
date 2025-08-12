import { useState } from "react";

function QuestCard({ quest, skills }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="card w-96 bg-base-200 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{quest.name}</h2>
        {quest.description && (
          <p className="text-sm text-base-content/70">{quest.description}</p>
        )}

        {/* Tasks Section */}
        <section className="mt-4">
          <button
            className="btn btn-sm btn-outline"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? "Hide Tasks" : "Show Tasks"}
          </button>

          {open && (
            <ul className="mt-3 space-y-2 animate-fadeIn">
              {quest.tasks.map((task) => (
                <li
                  key={task._id}
                  className="flex items-center gap-2 rounded-md border p-2"
                >
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={task.completed}
                  />
                  <span
                    className={
                      task.completed ? "line-through text-base-content/60" : ""
                    }
                  >
                    {task.name}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <div className="card-actions justify-end mt-4">
          <button className="btn btn-sm btn-primary">Add Task</button>
          <button className="btn btn-sm">Edit</button>
        </div>
      </div>
    </div>
  );
}

export default QuestCard;
