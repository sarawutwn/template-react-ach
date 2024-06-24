import React, { useState } from "react";
import Chart from "react-apexcharts";

const BarChart = ({ data }) => {
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
          horizontal: true,
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
    series: data,
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

export default BarChart;
