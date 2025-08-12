import axios from "axios";
import { API_URL } from "../utils/api";
import { useEffect, useState } from "react";
import QuestCard from "../components/QuestCard";

function QuestsPage(props) {
  const [quests, setQuests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getQuests = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/api/quests`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response.data);
        setQuests(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Error while retrieving quests");
        console.log(error);
      });
  };

  useEffect(() => {
    getQuests();
  }, []);

  if (isLoading) {
    <p>Loading...</p>;
  }

  return (
    <>
      <h2 className="text-2xl text-center">Your quests</h2>
      <div className="min-h-screen grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {quests.map((q) => {
          return <QuestCard quest={q} />;
        })}
      </div>
    </>
  );
}

export default QuestsPage;
