import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import ExperienceBar from "../components/ExperienceBar";
import DisciplinesList from "../components/DisciplinesList";
import SidequestsList from "../components/SidequestsList";
import QuestsPage from "./QuestsPage";
import SkillRadar from "../components/skillRadar";

function Profile() {
  const { user, isLoading } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({
    disciplines: [],
    skills: [],
    sideQuests: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [loading, setLoading] = useState(false);

  const [disciplineName, setDisciplineName] = useState("");
  const [selectedSkillId, setSelectedSkillId] = useState("");
  const [selectedType, setSelectedType] = useState("good");

  const [sidequestName, setSidequestName] = useState("");
  const [selectedSkillIdSq, setSelectedSkillIdSq] = useState("");

  const getUser = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/user`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((error) => {
        console.log("Error while retrieving user info");
        console.log(error);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  const completeDiscipline = (id) => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .patch(
        `${import.meta.env.VITE_API_URL}/api/user/disciplines/${id}/complete`,
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
          disciplines: prev.disciplines.map((d) =>
            d._id === id ? { ...d, completed: true } : d
          ),
          skills: prev.skills.map((skill) =>
            skill.name === data.skillName
              ? { ...skill, level: data.skillLevel, experience: data.skillExp }
              : skill
          ),
        }));
      })
      .catch((error) => {
        console.log("Error completing Discipline");
        console.log(error);
      });
  };

  const createDiscipline = () => {
    setLoading(true);

    const requestBody = {
      name: disciplineName,
      type: selectedType,
      skillId: selectedSkillId,
    };
    const storedToken = localStorage.getItem("authToken");

    axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/user/disciplines`,
        requestBody,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        getUser();

        setSelectedSkillId("");
        setDisciplineName("");
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.log("Error while creating discipline");
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const createSidequest = () => {
    setLoading(true);

    const requestBody = {
      name: sidequestName,
      skillId: selectedSkillIdSq,
    };
    const storedToken = localStorage.getItem("authToken");

    axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/user/sidequests`,
        requestBody,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        getUser();
        setSelectedSkillIdSq("");
        setSidequestName("");
        setIsModalOpen2(false);
      })
      .catch((error) => {
        console.log("Error while creating sidequest");
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const completeSidequest = (id) => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .patch(
        `${import.meta.env.VITE_API_URL}/api/user/sidequests/${id}/complete`,
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
          sideQuests: prev.sideQuests.map((s) =>
            s._id === id ? { ...s, completed: true } : s
          ),
          skills: prev.skills.map((skill) =>
            skill.name === data.skillName
              ? { ...skill, level: data.skillLevel, experience: data.skillExp }
              : skill
          ),
        }));
      })
      .catch((error) => {
        console.log("Error completing Discipline");
        console.log(error);
      });
  };

  const scrollToSection = () => {
    const section = document.getElementById("quests");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="flex justify-center gap-2 mt-4">
        <button className="btn btn-info" onClick={scrollToSection}>
          Go to Quests
        </button>
      </div>

      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/* Left column */}
        <div className="flex flex-col gap-6">
          {/* Experience */}
          <div className="card bg-base-100 shadow-xl p-4">
            <div className="flex flex-wrap md:flex-nowrap items-center gap-6">
              <figure>
                <img
                  src={userInfo.profileImg}
                  alt="User avatar"
                  className="rounded-full w-24 h-24"
                />
              </figure>

              <div className="flex flex-col justify-center">
                <h2 className="card-title">{userInfo.name}</h2>
                <p>Level: {userInfo.level}</p>
              </div>

              <div className="flex flex-col justify-center flex-1">
                <p>Current XP:</p>
                <ExperienceBar currentXp={userInfo.experience} />
              </div>
            </div>
            {/* Skills column */}
            <div className="card bg-base-100 shadow-xl p-4">
              <p className="card-title">Skills Progress</p>
              {userInfo.skills.map((skill) => {
                return (
                  <div
                    key={skill._id}
                    className="flex flex-col items-center text-center"
                  >
                    <p className="text-sm">
                      {skill.name} | Level: {skill.level}
                    </p>
                    <ExperienceBar currentXp={skill.experience} />
                  </div>
                );
              })}
            </div>
            <div className="flex items-center card bg-base-100 shadow-xl p-4 h-100 w-full">
              <SkillRadar skills={userInfo.skills} />
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          {/* Disciplines & Sidequests */}
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
            {/* Disciplines */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="card-title">Disciplines</h2>
                  <div className="tooltip" data-tip="For your daily routines!">
                    <span className="btn btn-sm cursor-pointer">?</span>
                  </div>
                  <div>
                    <button
                      className="btn btn-accent"
                      onClick={() => setIsModalOpen(true)}
                    >
                      Add
                    </button>
                  </div>
                </div>
                <DisciplinesList
                  disciplines={userInfo.disciplines}
                  onComplete={completeDiscipline}
                />
              </div>
            </div>

            {/* Modal add discipline*/}
            {isModalOpen && (
              <div className="modal modal-open">
                <div className="modal-box">
                  <h3 className="font-bold text-lg mb-4">Add Discipline</h3>
                  <input
                    type="text"
                    placeholder="Wake up at 7am"
                    className="input input-bordered w-full mb-4"
                    value={disciplineName}
                    onChange={(e) => setDisciplineName(e.target.value)}
                  />
                  <select
                    className="select select-bordered w-full mb-4"
                    value={selectedSkillId}
                    onChange={(e) => setSelectedSkillId(e.target.value)}
                  >
                    <option value="">-- Select a skill --</option>
                    {userInfo.skills.map((s) => {
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
                      disabled={!disciplineName || loading}
                      onClick={createDiscipline}
                    >
                      {loading ? "Saving..." : "Save"}
                    </button>
                    <button
                      className="btn"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Sidequests */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="card-title">Side Quests</h2>
                  <div className="tooltip" data-tip="For the urgent tasks!">
                    <span className="btn btn-sm cursor-pointer">?</span>
                  </div>
                  <div>
                    <button
                      className="btn btn-accent"
                      onClick={() => setIsModalOpen2(true)}
                    >
                      Add
                    </button>
                  </div>
                </div>
                <SidequestsList
                  sidequests={userInfo.sideQuests}
                  onComplete={completeSidequest}
                />
              </div>
            </div>
            {/* Modal add sidequest */}
            {isModalOpen2 && (
              <div className="modal modal-open">
                <div className="modal-box">
                  <h3 className="font-bold text-lg mb-4">Add Side Quest</h3>
                  <input
                    type="text"
                    placeholder="Sidequest name"
                    className="input input-bordered w-full mb-4"
                    value={sidequestName}
                    onChange={(e) => setSidequestName(e.target.value)}
                  />
                  <select
                    className="select select-bordered w-full mb-4"
                    value={selectedSkillIdSq}
                    onChange={(e) => setSelectedSkillIdSq(e.target.value)}
                  >
                    <option value="">-- Select a skill --</option>
                    {userInfo.skills.map((s) => {
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
                      disabled={!sidequestName || loading}
                      onClick={createSidequest}
                    >
                      {loading ? "Saving..." : "Save"}
                    </button>
                    <button
                      className="btn"
                      onClick={() => setIsModalOpen2(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <QuestsPage setUserInfo={setUserInfo} getUser={getUser} />
    </>
  );
}

export default Profile;
