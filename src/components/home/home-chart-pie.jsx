import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export function HomeChartPie({ data }) {
  return (
    <Doughnut
      data={{
        labels: data.label,
        datasets: [
          {
            label: "# of Votes",
            data: data.data,
            backgroundColor: [
              "#F44346",
              "#E91E63",
              "#9C27B0",
              "#673AB7",
              "#3F51B5",
              "#F44336",
            ],
            borderColor: ["#FFFF", "#FFFF", "#FFFF", "#FFFF", "#FFFF", "#FFFF"],
            hoverBackgroundColor: [
              "#043478",
              "#043478",
              "#043478",
              "#043478",
              "#043478",
              "#043478",
            ],
            hoverBorderWidth: 0,
            borderWidth: 3,
            precision: 2,
            text: "23%",
          },
        ],
      }}
      options={{
        cutout: "70%",
        radius: "90%",
        animation: {
          animateScale: true,
        },
        plugins: {
          legend: {
            position: "right",
          },
          datalabels: {
            formatter: (value, ctx) => {
                let datasets = ctx.chart.data.datasets;
                if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
                  let sum = datasets[0].data.reduce((a, b) => a + b, 0);
                  let percentage = Math.round((value / sum) * 100) + "%";
                  return percentage;
                } else {
                  return "0%";
                }
              },
              color: "white",
              font: {
                size: "14px",
                // weight: "bold"
              }
          }
        },
      }}
    />
  );
}
