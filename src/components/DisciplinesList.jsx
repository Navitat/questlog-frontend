function DisciplinesList(props) {
  if (!props.disciplines || props.disciplines.length === 0) {
    return <p>No disciplines. Start adding!</p>;
  }
  return (
    <>
      {props.disciplines.map((discipline) => {
        return (
          <label key={discipline._id}>
            {discipline.name}
            <input
              className="checkbox"
              type="checkbox"
              checked={!!discipline.completed}
              disabled={discipline.completed}
              onChange={() => props.onComplete(discipline._id)}
            />
          </label>
        );
      })}
    </>
  );
}

export default DisciplinesList;
