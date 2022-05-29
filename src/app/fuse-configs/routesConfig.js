import { Redirect } from "react-router-dom";
import FuseUtils from "@fuse/utils";
import ScrumboardAppConfig from "app/main/apps/scrumboard/ScrumboardAppConfig";
import LoginConfig from "app/main/apps/login/LoginConfig";
import Register3PageConfig from "app/main/apps/register-3/Register3PageConfig";
import FuseLoading from "@fuse/core/FuseLoading";
import AddStaffConfig from "app/main/apps/staff/AddStaffConfig";
import Table_staffConfig from "app/main/apps/staff/Table_staffConfig";

// import AnalyseConfig from "app/main/apps/Analyse/AnalyseConfig";
import AnalyticsDashboardAppConfig from "app/main/apps/dashboards/analytics/AnalyticsDashboardAppConfig";

const routeConfigs = [
  ScrumboardAppConfig,
  LoginConfig,
  Register3PageConfig,
  AddStaffConfig,
  Table_staffConfig,
  // AnalyseConfig,
  AnalyticsDashboardAppConfig
];

const routes = [
  // if you want to make whole app auth protected by default change defaultAuth for example:
  // ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
  // The individual route configs which has auth option won't be overridden.
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, null),
  {
    exact: true,
    path: "/",
    component: () => <Redirect to="/login" />,
  },

  {
    exact: true,
    path: "/apps/dashboards/analytics",
    component: () => <Redirect to="/apps/dashboards/analytics" />,
  },

  {
    exact: true,
    path: "/apps/scrumboard",
    component: () => <Redirect to="/apps/scrumboard" />,
  },
  {
    exact: true,
    path: "/apps/add_staf",
    component: () => <Redirect to="/apps/add_staf" />,
  },
  {
    exact: true,
    path: "/apps/edit_staf/:id",
    component: () => <Redirect to="/apps/edit_staf/:id" />,
  },
  {
    exact: true,
    path: "/apps/table_staf",
    component: () => <Redirect to="/apps/table_staf" />,
  },

  {
    exact: true,
    path: "/register",
    component: () => <Redirect to="/register" />,
  },
  {
    path: "/loading",
    exact: true,
    component: () => <FuseLoading />,
  },
];

export default routes;
