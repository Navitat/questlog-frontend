import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function SkillRadar({ skills }) {
  const data = {
    labels: skills.map((s) => s.name),
    datasets: [
      {
        label: "Skill Levels",
        data: skills.map((s) => s.level),
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(59, 130, 246, 1)",
      },
    ],
  };

  const options = {
    scales: {
      r: {
        beginAtZero: true,
        max: 10,
        grid: {
          color: "#110D0D",
        },
        angleLines: {
          color: "#110D0D",
        },
        pointLabels: {
          font: {
            size: 14,
          },
          color: "#FFFFFF",
        },
      },
    },
  };

  return <Radar data={data} options={options} />;
}

export default SkillRadar;
