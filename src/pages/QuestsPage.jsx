import axios from "axios";
import { useContext, useEffect, useState } from "react";
import QuestCard from "../components/QuestCard";
import { AuthContext } from "../context/auth.context";
import { DayPicker } from "react-day-picker";

function QuestsPage(props) {
  const [quests, setQuests] = useState([]);
  const [skills, setSkills] = useState([]);
  const { user } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [questName, setQuestName] = useState("");
  const [selectedSkillId, setSelectedSkillId] = useState("");

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const getQuests = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/quests`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setQuests(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Error while retrieving quests");
        console.log(error);
      });
  };

  const getSkills = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/user`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setSkills(response.data.skills);
      })
      .catch((error) => {
        console.log("Error retrieving skills");
        console.log(error);
      });
  };

  const createQuest = () => {
    console.log("Creating quest");
    setLoading(true);

    const requestBody = {
      name: questName,
      skillId: selectedSkillId,
    };
    const storedToken = localStorage.getItem("authToken");

    axios
      .post(`${import.meta.env.VITE_API_URL}/api/quests`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        getQuests();
        setQuestName("");
        setSelectedSkillId("");
        setCreateModalOpen(false);
      })
      .catch((error) => {
        console.log("Error creating quest");
        console.log(error);
      });
  };

  const deleteQuest = () => {
    console.log("Deleting quest");
  };

  useEffect(() => {
    getQuests();
    getSkills();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="flex justify-center gap-2 mt-4">
        <button
          className="btn btn-info"
          onClick={() => {
            setCreateModalOpen(true);
          }}
        >
          Add Quest
        </button>
      </div>

      {/* Modal create quest*/}
      {isCreateModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Create Quest</h3>
            <input
              type="text"
              placeholder="Read 10 books"
              className="input input-bordered w-full mb-4"
              value={questName}
              onChange={(e) => setQuestName(e.target.value)}
            />
            {/* <input type="date" class="input input-bordered w-full mb-4" /> */}
            <select
              className="select select-bordered w-full mb-4"
              value={selectedSkillId}
              onChange={(e) => setSelectedSkillId(e.target.value)}
            >
              <option value="">-- Select a skill --</option>
              {skills.map((s) => {
                return (
                  <option key={s._id} value={s._id}>
                    {s.name}
                  </option>
                );
              })}
            </select>
            <div className="modal-action">
              <button
                className="btn btn-accent"
                disabled={!questName || loading}
                onClick={createQuest}
              >
                {loading ? "Saving..." : "Save"}
              </button>
              <button className="btn" onClick={() => setCreateModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Delete Quest</h3>
            <p>
              Are you sure you want to delete this quest? This action cannot be
              undone.
            </p>

            <div className="modal-action">
              <button className="btn btn-error" onClick={deleteQuest}>
                Yes, Delete
              </button>
              <button className="btn" onClick={() => setDeleteModalOpen(false)}>
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {quests.map((q) => (
          <QuestCard
            key={q._id}
            quest={q}
            skills={skills}
            handleDelete={setDeleteModalOpen}
          />
        ))}
      </div>
    </div>
  );
}

export default QuestsPage;
