import axios from "axios";
import { useContext, useEffect, useState } from "react";
import QuestCard from "../components/QuestCard";
import { AuthContext } from "../context/auth.context";

function QuestsPage({ setUserInfo, getUser }) {
  const [quests, setQuests] = useState([]);
  const [skills, setSkills] = useState([]);
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("notCompleted");

  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [questName, setQuestName] = useState("");
  const [selectedSkillId, setSelectedSkillId] = useState("");

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [questToDeleteId, setQuestToDeleteId] = useState(null);

  const [isCreateTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  const [questIdToAddTask, setQuestIdToAddTask] = useState(null);
  const [taskName, setTaskName] = useState("");

  const [isCreateInvItemModalOpen, setCreateInvItemModaOpen] = useState(false);
  const [questIdToAddInv, setQuestIdToAddInv] = useState(null);
  const [invName, setInvName] = useState("");
  const [invType, setInvType] = useState("");
  const [invUrl, setInvUrl] = useState("");

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
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteQuest = () => {
    if (!questToDeleteId) return;

    setLoading(true);

    const storedToken = localStorage.getItem("authToken");

    axios
      .delete(`${import.meta.env.VITE_API_URL}/api/quests/${questToDeleteId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        getQuests();
        setDeleteModalOpen(false);
        setQuestToDeleteId(null);
      })
      .catch((error) => {
        console.log("Error while deleting Quest");
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const createTask = () => {
    console.log("Creating task");
    if (!questIdToAddTask) return;

    setLoading(true);
    const storedToken = localStorage.getItem("authToken");

    const newTask = {
      name: taskName,
    };

    axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/quests/${questIdToAddTask}/tasks`,
        newTask,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        getQuests();
        setCreateTaskModalOpen(false);
        setQuestIdToAddTask(null);
        setTaskName("");
      })
      .catch((error) => {
        console.log("Error while creating Task");
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  const createInventoryItem = () => {
    console.log("Creating inventory Item");
    if (!questIdToAddInv) return;
    setLoading(true);
    const storedToken = localStorage.getItem("authToken");

    const newInvItem = {
      name: invName,
      type: invType,
      url: invUrl,
    };

    axios
      .post(
        `${
          import.meta.env.VITE_API_URL
        }/api/quests/${questIdToAddInv}/inventory`,
        newInvItem,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        getQuests();
        setCreateInvItemModaOpen(false);
        setQuestIdToAddInv(null);
        setInvName("");
        setInvType("");
        setInvUrl("");
      })
      .catch((error) => {
        console.log("Error while creating inventory item");
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const completeTask = (questId, taskId) => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .patch(
        `${
          import.meta.env.VITE_API_URL
        }/api/quests/${questId}/tasks/${taskId}/complete`,
        {},
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then(() => {
        console.log("completed task");
        getQuests();
      })
      .catch((error) => {
        console.log("Error completing task");
        console.log(error);
      });
  };

  const completeQuest = (id) => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .patch(
        `${import.meta.env.VITE_API_URL}/api/quests/${id}/complete`,
        {},
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        const data = response.data;

        setUserInfo((prev) => ({
          ...prev,
          level: data.userLevel,
          experience: data.userExp,
          skills: prev.skills.map((skill) =>
            skill.name === data.skillName
              ? { ...skill, level: data.skillLevel, experience: data.skillExp }
              : skill
          ),
        }));

        getQuests();
        getUser();
      })
      .catch((error) => {
        console.log("Error while completing quest");
        console.log(error);
      });
  };

  useEffect(() => {
    getQuests();
    getSkills();
  }, []);

  return (
    <div id="quests" className="min-h-screen">
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

      {isCreateTaskModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Create Task</h3>
            <input
              type="text"
              placeholder="First this..."
              className="input input-bordered w-full mb-4"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
            <div className="modal-action">
              <button
                className="btn btn-accent"
                disabled={!taskName || loading}
                onClick={createTask}
              >
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                className="btn"
                onClick={() => setCreateTaskModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isCreateInvItemModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Create Inventory Item</h3>
            <input
              type="text"
              placeholder="Youtube course"
              className="input input-bordered w-full mb-4"
              value={invName}
              onChange={(e) => setInvName(e.target.value)}
            />
            <select
              className="select select-bordered w-full mb-4"
              value={invType}
              onChange={(e) => setInvType(e.target.value)}
            >
              <option value="">-- Select a type of resource --</option>
              <option value="video">Video</option>
              <option value="article">Article</option>
              <option value="other">Other</option>
            </select>
            <input
              type="text"
              placeholder="www.your-resource.com"
              className="input input-bordered w-full mb-4"
              value={invUrl}
              onChange={(e) => setInvUrl(e.target.value)}
            />
            <div className="modal-action">
              <button
                className="btn btn-accent"
                disabled={!invName || !invType || !invUrl || loading}
                onClick={createInventoryItem}
              >
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                className="btn"
                onClick={() => setCreateInvItemModaOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="p-6 max-w-6xl mx-auto">
        {quests.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">
            No quests available. Go create your first one!
          </p>
        ) : (
          <div>
            {/* DaisyUI Tabs */}
            <div className="tabs tabs-border mb-4">
              <input
                type="radio"
                name="my_tabs"
                className="tab"
                aria-label="In Progress"
                defaultChecked
                onClick={() => setActiveTab("notCompleted")}
              />
              <input
                type="radio"
                name="my_tabs"
                className="tab"
                aria-label="Completed"
                onClick={() => setActiveTab("completed")}
              />
            </div>

            {/* Tab Content */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quests
                .filter((q) =>
                  activeTab === "completed" ? q.completed : !q.completed
                )
                .map((q) => (
                  <QuestCard
                    key={q._id}
                    quest={q}
                    skills={skills}
                    handleDelete={(id) => {
                      setQuestToDeleteId(id);
                      setDeleteModalOpen(true);
                    }}
                    handleCreateTask={(id) => {
                      setQuestIdToAddTask(id);
                      setCreateTaskModalOpen(true);
                    }}
                    handleCreateInv={(id) => {
                      setQuestIdToAddInv(id);
                      setCreateInvItemModaOpen(true);
                    }}
                    handleTask={completeTask}
                    onComplete={completeQuest}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestsPage;
