import React, { useState } from "react";
import Chart from "react-apexcharts";

const BarChart2 = () => {
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "basic-bar",
        stacked: false,
        toolbar: { show: false },
        fontFamily: 'Kanit'
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 4
        },
      },
      xaxis: {
        categories: ['', '', '', ''],
        colors: ['#F44336', '#E91E63', '#9c27b0', '#673AB7'],
        labels: {
          style: {
            colors: '#373d3f'
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            color: '#373d3f'
          }
        }
      }
    },
    series: [
      {
        name: "Bangchak Bangbuathong",
        data: [33],
      },
      {
        name: "Big C Mahachai 2 Branch",
        data: [166],
      },
      {
        name: "Big C RAMINTRA",
        data: [133],
      },
      {
        name: "Big C Chiang Mai Donchan Branch",
        data: [224],
      },
      {
        name: "Lotus On-Nut 80 Branch ",
        data: [5],
      },
      {
        name: "Big C Tivanon",
        data: [24],
      },
      {
        name: "Lotus Ekkachai 99/1 Branch",
        data: [20],
      },
      {
        name: "Big C Kanlapaphruek Branch",
        data: [19],
      },
      {
        name: "Satree Phuket School branch",
        data: [41],
      },
      {
        name: "โชตนา หน้าสนามกอล์ฟลานนา",
        data: [61],
      },
      {
        name: "Lotus Navanakorn Branch",
        data: [40],
      },
      {
        name: "Thep Krasattri branch",
        data: [42]
      }
    ],
  });

  return (
    <div className="chart">
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default BarChart2;
