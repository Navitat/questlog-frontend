function DisciplinesList(props) {
  if (!props.disciplines || props.disciplines.length === 0) {
    return <p>No disciplines. Start adding!</p>;
  }
  return (
    <>
      {props.disciplines.map((discipline) => {
        return (
          <label
            key={discipline._id}
            className="flex items-center justify-between p-3 mb-2 rounded-lg bg-base-200 hover:bg-base-300 cursor-pointer"
          >
            <span
              className={`font-medium ${
                discipline.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {discipline.name}
            </span>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                checked={!!discipline.completed}
                disabled={discipline.completed}
                onChange={() => props.onComplete(discipline._id)}
              />

              <button
                type="button"
                className="btn btn-error btn-xs"
                onClick={() => props.onDelete(discipline._id)}
              >
                Delete
              </button>
            </div>
          </label>
        );
      })}
    </>
  );
}

export default DisciplinesList;
