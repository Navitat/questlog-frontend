function SidequestsList({ sidequests, onComplete }) {
  if (!sidequests || sidequests.length === 0) {
    return <p>No Sidequests. Start adding!</p>;
  }

  const incompleteSidequests = sidequests.filter((sq) => !sq.completed);
  const completedSidequests = sidequests.filter((sq) => sq.completed);

  return (
    <div>
      <div role="tablist" className="tabs tabs-bordered mb-4">
        <input
          type="radio"
          name="sidequests_tabs"
          role="tab"
          className="tab"
          aria-label="Incomplete"
          defaultChecked
        />
        <div role="tabpanel" className="tab-content p-4">
          {incompleteSidequests.length === 0 ? (
            <p>All sidequests completed! Great job!</p>
          ) : (
            incompleteSidequests.map((sq) => (
              <label
                key={sq._id}
                className="flex items-center justify-between p-3 mb-2 rounded-lg bg-base-200 hover:bg-base-300 cursor-pointer"
              >
                <span className="font-medium">{sq.name}</span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  checked={!!sq.completed}
                  disabled={sq.completed}
                  onChange={() => onComplete(sq._id)}
                />
              </label>
            ))
          )}
        </div>

        <input
          type="radio"
          name="sidequests_tabs"
          role="tab"
          className="tab"
          aria-label="Completed"
        />
        <div role="tabpanel" className="tab-content p-4">
          {completedSidequests.length === 0 ? (
            <p>No completed sidequests yet.</p>
          ) : (
            completedSidequests.map((sq) => (
              <label
                key={sq._id}
                className="flex items-center justify-between p-3 mb-2 rounded-lg bg-base-200 cursor-pointer"
              >
                <span className="font-medium line-through text-gray-400">
                  {sq.name}
                </span>
              </label>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default SidequestsList;
