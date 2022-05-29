import _ from '@lodash';
import Divider from '@material-ui/core/Divider';
import { alpha } from '@material-ui/core/styles/colorManipulator';
import { makeStyles, ThemeProvider, useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { memo, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { selectContrastMainTheme } from 'app/store/fuse/settingsSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    color: theme.palette.primary.contrastText,
  },
}));

function First_analyse(props) {
  const classes = useStyles(props);
  const theme = useTheme();
  const contrastTheme = useSelector(selectContrastMainTheme(theme.palette.primary.main));
const {data}=props


  return (
    <ThemeProvider theme={contrastTheme}>
      <div className={clsx(classes.root)}>
        <div className="container relative p-16 sm:p-24 flex flex-col sm:flex-row justify-between items-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex flex-col items-center sm:items-start mb-16 sm:mb-0">
              <Typography className="h2 font-medium" color="textPrimary">
              Contrôle
              </Typography>
              <Typography className="h5" color="textSecondary">
              Nombre de Contrôle par date
              </Typography>
            </div>
          </motion.div>

      
        </div>
        <div className="container relative h-200 sm:h-256 pb-16">
        <ReactApexChart
            options={data.options}
            series={data.series}
            type={data.options.chart.type}
            height={data.options.chart.height}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default memo(First_analyse);
