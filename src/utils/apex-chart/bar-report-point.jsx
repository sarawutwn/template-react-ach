import React from 'react';
import ReactApexChart from 'react-apexcharts';

const BarChartReportPoint = ({ data, labels }) => {
  const options = {
    chart: {
      id: 'basic-bar',
      fontFamily: 'Kanit'
    },
    xaxis: {
      categories: labels
    },
    colors: ['#f89616'],
    plotOptions: {
        bar: {
          borderRadius: 4,
        }
      }
  };

  const series = [
    {
      name: 'คะแนนของเดือนนี้',
      data: data
    }
  ];

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="bar"
      height={350}
    />
  );
};

export default BarChartReportPoint;





