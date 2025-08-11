function DisciplinesList(props) {
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
