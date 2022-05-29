import { authRoles } from "app/auth";
import i18next from "i18next";
import ar from "./navigation-i18n/ar";
import en from "./navigation-i18n/en";
import tr from "./navigation-i18n/tr";

i18next.addResourceBundle("en", "navigation", en);
i18next.addResourceBundle("tr", "navigation", tr);
i18next.addResourceBundle("ar", "navigation", ar);

const navigationConfig = [
  {
    id: "applications",
    title: "Admin dashboard",
    translate: "Admin dashboard",
    type: "group",
    icon: "apps",
    auth: authRoles.admin,

    children: [
      {
        id: "Analytics-dashboard",
        title: "Analytics-dashboard",
        translate: "Analytics-dashboard",
        type: "collapse",
        icon: "account_box",
       auth: authRoles.admin,

        children: [
          { 
            id: "Analytics ",
            title: "Analytics ",
            type: "item",
            url: "/apps/dashboards/analytics",
             auth: authRoles.admin,
          },
         
        ],
      },
      {
        id: "dashboards",
        title: "Staff management",
        translate: "Staff management",
        type: "collapse",
        icon: "account_box",
        auth: authRoles.admin,

        children: [
          {
            id: "Ajouter Staff",
            title: "Ajouter Staff",
            type: "item",
            url: "/apps/add_staf",
            auth: authRoles.admin,
          },
          {
            id: "Table Staff",
            title: "Table Staff",
            type: "item",
            url: "/apps/Table_staf",
            auth: authRoles.admin,
          },
        ],
      },
      {
        id: "Scrumboard",
        title: "Scrumboard",
        translate: "Scrumboard",
        type: "item",
        icon: "assessment",
        url: "/apps/scrumboard",
        auth: authRoles.admin,
      },
    ],
  },
  {
    id: "Staff",
    title: "Staff dashboard",
    translate: "Staff dashboard",
    type: "group",
    icon: "apps",
    auth: authRoles.staff,
    children: [
      {
        id: "Scrumboard",
        title: "Scrumboard",
        translate: "Scrumboard",
        type: "item",
        icon: "assessment",
        url: "/apps/scrumboard",
        auth: authRoles.staff,
      },
    ],
  },
];

export default navigationConfig;
