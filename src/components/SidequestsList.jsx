function SidequestsList(props) {
  if (!props.sidequests || props.sidequests.length === 0) {
    return <p>No Sidequests. Start adding!</p>;
  }

  const incompleteSidequests = props.sidequests.filter((sq) => !sq.completed);

  if (incompleteSidequests.length === 0) {
    return <p>All sidequests completed! Great job!</p>;
  }

  return (
    <>
      {incompleteSidequests.map((sidequest) => {
        if (!sidequest.completed) {
          return (
            <label
              key={sidequest._id}
              className="flex items-center justify-between p-3 mb-2 rounded-lg bg-base-200 hover:bg-base-300 cursor-pointer"
            >
              <span
                className={`font-medium ${
                  sidequest.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {sidequest.name}
              </span>
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                checked={!!sidequest.completed}
                disabled={sidequest.completed}
                onChange={() => props.onComplete(sidequest._id)}
              />
            </label>
          );
        }
      })}
    </>
  );
}

export default SidequestsList;
