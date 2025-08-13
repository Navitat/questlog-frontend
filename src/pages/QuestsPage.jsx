import axios from "axios";
import { API_URL } from "../utils/api";
import { useEffect, useState } from "react";
import QuestCard from "../components/QuestCard";

function QuestsPage(props) {
  const [quests, setQuests] = useState([]);
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [createModalOpen, setCreateModalOpen] = useState(false);

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
        console.log(response.data.skills);
      })
      .catch((error) => {
        console.log("Error retrieving skills");
        console.log(error);
      });
  };

  const createQuest = () => {
    console.log("Creating quest");
  };

  useEffect(() => {
    getQuests();
    getSkills();
  }, []);

  if (isLoading) {
    <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen">
      <div className="flex justify-center gap-2 mt-4">
        <button className="btn btn-info">Add Quest</button>
      </div>

      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {quests.map((q) => {
          return <QuestCard key={q._id} quest={q} skills={skills} />;
        })}
      </div>
    </div>
  );
}

export default QuestsPage;
