import { lazy } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Layout from "../layouts";
import Loadable from "../utils/loadable";

import store from "../redux/store/index";
import jwt from "jwt-decode";
import { Box } from "@mui/material";
import Notfound from "../pages/notfound";
const Login = Loadable(lazy(() => import("../pages/login")));
const Home = Loadable(lazy(() => import("../pages/home")));
const Password = Loadable(lazy(() => import("../pages/password")));
const Role = Loadable(lazy(() => import("../pages/role/index")));
const RoleDetail = Loadable(lazy(() => import("../pages/role/[id]")));
const Permission = Loadable(lazy(() => import("../pages/permission/index")));

const Routes = () => {
  const location = useLocation();
  let isLoggedIn = true;
  if (!localStorage.getItem("TOKEN") ? true : false) {
    isLoggedIn = false;
  } else {
    store?.dispatch({
      type: "SET_PAGE",
      payload: location.pathname.split("/")[1],
    });
    let tokenStorage = jwt(localStorage.getItem("TOKEN"));
    store?.dispatch({
      type: "SET_PERMISSION",
      payload: tokenStorage.permission,
    });
    store?.dispatch({
      type: "SET_COMPONENT",
      payload: tokenStorage.component,
    });
    store?.dispatch({
      type: "SET_ROLE",
      payload: tokenStorage.role,
    });
  }

  return [
    {
      path: "/",
      element: isLoggedIn ? <Layout /> : <Navigate to="/login" />,
      children: [
        {
          path: "/",
          element: <Navigate to="/home" />,
        },
        {
          path: "/home",
          element: (
            <Box display="flex" justifyContent="center">
              <Home />
            </Box>
          ),
        },
        {
          path: "/permission/role-setting",
          element: <Role />,
        },
        {
          path: "/permission/role-setting/:id",
          element: <RoleDetail />,
        },
        {
          path: "/permission/permission-setting",
          element: <Permission />,
        },
        {
          path: "/password",
          element: <Password />,
        },
      ],
    },
    {
      path: "/",
      element: !isLoggedIn ? <Outlet /> : <Navigate to="/" />,
      children: [
        { path: "login", element: <Login /> },
        { path: "/", element: <Navigate to="/login" /> },
      ],
    },
    {
      path: "*",
      element: <Notfound />,
    },
  ];
};

export default Routes;
