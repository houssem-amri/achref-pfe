import Paper from "@material-ui/core/Paper";

import Typography from "@material-ui/core/Typography";
import _ from "@lodash";
import ReactApexChart from "react-apexcharts";

function Widget5_analyse(props) {
  const { series } = props;
  const options5 = {
    chart: {
      height: 450,
      type: "bar",
      stacked: true,
      toolbar: {
        show: true
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: "50%",
        horizontal: false

      },
    },
    stroke: {
      width: 2,
    },
    colors: ["rgb(30, 41, 59)","rgb(33, 150, 243)"],

    // dataLabels: {
    //   enabled: true,
    //   formatter: function (val) {
    //     return val + " Tableaux";
    //   },
    //   offsetY: -20,
    //   style: {
    //     fontSize: "12px",
    //     colors: ["#fff"],
    //   },
    // },

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
 
  };


  return (
    <Paper className="w-full rounded-20 shadow">
      <div className="flex items-center justify-between p-20">
        <Typography className="text-16 font-medium">
          Nombres de Lists et Taches par date
        </Typography>
      </div>
      <div className="w-full md:w-12/11 p-16 min-h-420 h-420">
        {console.log("tetetetetettete",[series,options5])}
        <ReactApexChart
          options={options5}
          series={series.series}
          type="bar"
          height={450}
        />
      </div>
    </Paper>
  );
}

export default Widget5_analyse;
