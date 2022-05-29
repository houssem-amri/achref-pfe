import withReducer from "app/store/withReducer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "@lodash";
import { motion } from "framer-motion";
import reducer from "./store";
import { selectWidgetsEntities, getWidgets } from "./store/widgetsSlice";
import Widget1_analyse from "./widget/Widget1_analyse";
import Widget2_analyse from "./widget/Widget2_analyse";
import Widget3_analyse from "./widget/Widget3_analyse";
import First_analyse from "./widget/First_analyse";
import Widget4_analyse from "./widget/Widget4_analyse";
import { makeStyles } from "@material-ui/core/styles";
import Widget5_analyse from "./widget/Widget5_analyse";
import Widget6_analyse from "./widget/Widget6_analyse";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

function AnalyticsDashboardApp() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const widgets = useSelector(selectWidgetsEntities);
  const container = {
    show: {
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };
  useEffect(() => {
    dispatch(getWidgets());
  }, [dispatch]);


  if (_.isEmpty(widgets)) {
    return null;
  }

  const first = {
    id: "widget1",
    series: widgets.widget7.series.series,
    options: {
      chart: {
        type: "area",
        height: "100%",
        background: "transparent",
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      theme: {
        mode: "dark",
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        type: "datetime",
        tooltip: {
          enabled: false,
        },
        axisBorder: {
          show: false,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
      },
      markers: {
        size: 3,
        strokeWidth: 1.5,
        strokeOpacity: 1,
        strokeDashArray: 0,
        fillOpacity: 1,
        shape: "circle",
        radius: 2,
        hover: {
          size: 5,
        },
      },
      fill: {
        type: "solid",
        opacity: 0.7,
        gradient: {
          shadeIntensity: 0.4,
          opacityFrom: 1,
          opacityTo: 0.5,
          stops: [30, 100, 100],
        },
      },
      grid: {
        show: true,
        strokeDashArray: 3,
        position: "back",
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },
      stroke: {
        show: true,
        curve: "smooth",
        lineCap: "butt",
        width: 1.5,
        dashArray: 0,
      },
    },
  };
  return (
    <div className="w-full">
      <First_analyse data={first} />
      <motion.div
        className="flex flex-wrap"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div
          variants={item}
          className="widget flex w-full sm:w-1/2 md:w-1/3 p-12"
        >
          <Widget1_analyse admin={widgets.widget3.series} />
        </motion.div>
        <motion.div
          variants={item}
          className="widget flex w-full sm:w-1/2 md:w-1/3 p-12"
        >
          <Widget2_analyse staff={widgets.widget2.series} />
        </motion.div>
        <motion.div
          variants={item}
          className="widget flex w-full sm:w-1/2 md:w-1/3 p-12"
        >
          <Widget3_analyse Board={widgets.widget1.series} />
        </motion.div>
        <motion.div variants={item} className="widget flex w-full p-12">
          <Widget4_analyse series={widgets.widget4.series} />
        </motion.div>
        <motion.div variants={item} className="widget flex w-full p-12">
          <Widget5_analyse series={widgets.widget5.series} />
        </motion.div>
        <motion.div variants={item} className="widget flex w-full p-12">
          <Widget6_analyse series={widgets.widget6.series} />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default withReducer(
  "analyticsDashboardApp",
  reducer
)(AnalyticsDashboardApp);
