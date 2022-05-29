import { authRoles } from "app/auth";
import Add_staff from "./Add_staff";
import Edit_staff from "./Edit_staff";

const AddStaffConfig = {
  auth: authRoles.admin,

  routes: [
    {
      path: "/apps/add_staf",
      component: Add_staff,
    },
    {
      path: "/apps/edit_staf/:id",
      component: Edit_staff,
    },
  ],
};

export default AddStaffConfig;
