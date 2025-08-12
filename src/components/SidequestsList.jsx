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
            <label key={sidequest._id}>
              {sidequest.name}
              <input
                className="checkbox"
                type="checkbox"
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
