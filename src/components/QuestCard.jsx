import { useState } from "react";

function QuestCard({
  quest,
  skills,
  handleDelete,
  handleCreateTask,
  handleCreateInv,
  handleTask,
}) {
  const [tasksOpen, setTasksOpen] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);

  return (
    <div className="card bg-base-200 shadow-xl my-4">
      <div className="card-body">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="card-title">{quest.name}</h2>
          <button
            className="btn btn-xs btn-error"
            onClick={() => handleDelete(quest._id)}
          >
            X
          </button>
        </div>

        {/* Description */}
        {quest.description && (
          <p className="text-sm text-base-content/70 mt-2">
            {quest.description}
          </p>
        )}

        {/* Tasks Section */}
        <section className="mt-4">
          <button
            className="btn btn-sm btn-outline w-full text-left"
            onClick={() => setTasksOpen((prev) => !prev)}
          >
            {tasksOpen ? "Hide Tasks" : "Show Tasks"} ({quest.tasks.length})
          </button>

          {tasksOpen && (
            <ul className="mt-3 space-y-2 animate-fadeIn">
              {quest.tasks.map((task) => (
                <li
                  key={task._id}
                  className="flex items-center gap-2 rounded-md border p-2 bg-base-100"
                >
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={task.completed}
                    onChange={() => handleTask(quest._id, task._id)}
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

        {/* Inventory Section */}
        {quest.inventory && quest.inventory.length > 0 && (
          <section className="mt-4">
            <button
              className="btn btn-sm btn-outline w-full text-left"
              onClick={() => setInventoryOpen((prev) => !prev)}
            >
              {inventoryOpen ? "Hide Inventory" : "Show Inventory"} (
              {quest.inventory.length})
            </button>

            {inventoryOpen && (
              <ul className="mt-3 space-y-2 animate-fadeIn">
                {quest.inventory.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 rounded-md border p-2 bg-base-100"
                  >
                    <span className="font-medium">{item.name}</span>
                    {item.quantity && (
                      <span className="text-sm text-base-content/60">
                        x{item.quantity}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {/* Actions */}
        <div className="card-actions justify-end mt-4 gap-2">
          <button
            className="btn btn-sm btn-primary"
            onClick={() => handleCreateTask(quest._id)}
          >
            Add Task
          </button>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => handleCreateInv(quest._id)}
          >
            Add To Inventory
          </button>
          <button className="btn btn-sm">Edit</button>
        </div>
      </div>
    </div>
  );
}

export default QuestCard;
