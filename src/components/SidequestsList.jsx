function SidequestsList(props) {
  if (!props.sidequests || props.sidequests.length === 0) {
    return <p>No Sidequests. Start adding!</p>;
  }

  return (
    <>
      {props.sidequests.map((sidequest) => {
        return (
          <label key={sidequest._id}>
            {sidequest.name}
            <input
              className="checkbox"
              type="checkbox"
              checked={!!sidequest.completed}
              disabled={sidequest.completed}
              onChange={() => {}}
            />
          </label>
        );
      })}
    </>
  );
}

export default SidequestsList;
