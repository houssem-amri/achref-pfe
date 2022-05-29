import Paper from "@material-ui/core/Paper";

import Typography from "@material-ui/core/Typography";
import _ from "@lodash";
import {  useState } from "react";
import ReactApexChart from "react-apexcharts";

function Widget4_analyse(props) {
  const { series } = props;
  const options = {
    chart: {
      height: 450,
      type: "bar",
      toolbar: {
        show: true
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: "50%",
      },
    },
    stroke: {
      width: 2,
    },

    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + " Tableaux";
      },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#fff"],
      },
    },

    xaxis: {
      type: "category",
      categories: series.categories,
      // position: "top",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },

      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      
    },
    colors: ["rgb(30, 41, 59)"],
  };
  return (
    <Paper className="w-full rounded-20 shadow">
      <div className="flex items-center justify-between p-20">
        <Typography className="text-16 font-medium">
          Nombres de tableaux par date
        </Typography>
      </div>
      <div className="w-full md:w-12/11 p-16 min-h-420 h-420">
        <ReactApexChart
          options={options}
          series={series.series}
          type="bar"
          height={450}
        />
      </div>
    </Paper>
  );
}

export default Widget4_analyse;
