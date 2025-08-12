import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { API_URL } from "../utils/api";
import axios from "axios";
import ExperienceBar from "../components/ExperienceBar";
import DisciplinesList from "../components/DisciplinesList";

function Profile() {
  const { user, isLoading } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({ disciplines: [] });

  const getUser = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/api/user`, {
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
        `${API_URL}/api/user/disciplines/${id}/complete`,
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
        }));
      })
      .catch((error) => {
        console.log("Error completing Discipline");
        console.log(error);
      });
  };

  return (
    <>
      <div className="flex items-center justify-center m-2">
        <div className="card bg-base-100 shadow-xl p-4">
          <div className="flex items-center gap-6">
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
            <div className="flex flex-col justify-center">
              <h2 className="card-title"></h2>
              <div>
                <p>Current XP:</p>
                <ExperienceBar currentXp={userInfo.experience} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 my-4">
        <button className="btn btn-primary">Go to Quests</button>
        <button className="btn btn-secondary">Inventory</button>
      </div>

      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center gap-2">
              <h2 className="card-title">Disciplines</h2>
              <div className="tooltip" data-tip="For your daily routines!">
                <span className="btn btn-sm cursor-pointer">?</span>
              </div>
            </div>
            <DisciplinesList
              disciplines={userInfo.disciplines}
              onComplete={completeDiscipline}
            />
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center gap-2">
              <h2 className="card-title">Side Quests</h2>
              <div className="tooltip" data-tip="For the urgent tasks!">
                <span className="btn btn-sm cursor-pointer">?</span>
              </div>
            </div>
            <p>...</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
