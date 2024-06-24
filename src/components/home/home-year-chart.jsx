import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

export default function HomeChartUserYear({ json }) {
  let data = {
    options: {
      colors: ['rgb(52, 73, 94)'],
      chart: {
        type: 'bar',
        fontFamily: 'Kanit, sans-serif',
      },
      plotOptions: {
        bar: {
          borderRadius: 0,
          dataLabels: {
            position: 'center'
          },
        }
      },
      dataLabels: {
        total: {
          enabled: true,
        },
        style: {
          fontSize: "16px",
          fontFamily: "Kanit",
          colors: ["#FFFFFF"]
        }
      },
      xaxis: {
        categories: json.map(item => item.name),
        style: {
          fontFamily: "Kanit"
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            }
          }
        },
        tooltip: {
          enabled: true,
        }
      },
    },
    series: [{
      name: 'ผู้ใช้งานใหม่',
      data: json.map(item => item.value)
    }],
  };


  return (
    <div>
      <Chart
        options={data.options}
        series={data.series}
        type="bar"
        height="250%"
      />
    </div>
  );
}
