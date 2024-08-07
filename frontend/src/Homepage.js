import React from "react";
import "./Homepage.css";
import Sidenav from "./navigation/Sidenav";
import { Outlet, useLocation  } from "react-router-dom";

function Homepage() {
  const location = useLocation();
  const isSpecialLink = location.pathname === "/DM";

  return (
    <div className="homepage">
      <div className={`homepage__nav`}>
        <Sidenav />
      </div>
      <div className="homepage__timeline">
        <Outlet />
      </div>
    </div>
  );
}

export default Homepage;
