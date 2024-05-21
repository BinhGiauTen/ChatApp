import React from "react";
import MainTab from "./MainTab";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="layout">
      <MainTab />
      <Outlet />
    </div>
  );
}

export default Layout;
