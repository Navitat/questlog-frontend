import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { API_URL } from "../utils/api";
import axios from "axios";
import ExperienceBar from "../components/ExperienceBar";

function Profile() {
  const { user, isLoading } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({});

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

  return (
    <>
      <div className="flex items-center justify-center m-2">
        <div className="card w-100 bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <img
              src={userInfo.profileImg}
              alt="User avatar"
              className="rounded-full w-24 h-24"
            />
            <h2 className="card-title p-10">{userInfo.name}</h2>
            <p>Level: {userInfo.level}</p>
          </figure>
          <div className="card-body items-center text-center">
            <div className="card-actions mt-4">
              <ExperienceBar currentXp={userInfo.experience} />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Card 1</h2>
            <p>Content for the first card.</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Card 2</h2>
            <p>Content for the second card.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
