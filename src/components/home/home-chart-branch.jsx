import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { defaults } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
defaults.font.family = "Kanit, sans-serif";
// defaults.font.weight = "bold";

export function HomeChartBranch({ chartData }) {
  const labels = ['']
  const data = {
    labels,
    datasets: chartData.map((d) => {
      return {
        label: d.name,
        data: [d.value],
        backgroundColor: d.color
      };
    })
  }
  return (
    <Bar
      options={{
        // indexAxis: 'y',
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
          datalabels: {
            opacity: 0
          }
        },
        
      }}
      data={data}
    />
  );
}
