import React, { useState } from "react";
import logo from "../../images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTable,
  faBookOpen,
  faChartLine,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";
import {
  LuLayoutDashboard,
  // GoHome,
  // LuSheet,
  // GiOpenBook,
  // TbDeviceAnalytics,
  FaBars,
  FaTh,
  FaHome,
  TbSettings,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/",
      name: "Home",
      icon: <FaHome className={"sidebar-icon"} />,
    },
    {
      path: "/sheet/sheet",
      name: "Sheet",
      icon: <FontAwesomeIcon icon={faTable} className={"sidebar-icon"} />,
    },

    {
      path: "/datasource",
      name: "Data Source",
      icon: <FontAwesomeIcon icon={faListCheck} className={"sidebar-icon"} />,
    },

    {
      path: "/dashboard/dashboard",
      name: "Dashboard",
      icon: <FaTh className={"sidebar-icon"} />,
    },

    {
      path: "/story/story",
      name: "Story",
      icon: <FontAwesomeIcon icon={faBookOpen} className={"sidebar-icon"} />,
    },

    {
      path: "/AnalyticsMain",
      name: "Analytics",
      icon: <FontAwesomeIcon icon={faChartLine} className={"sidebar-icon"} />,
    },
  ];
  return (
    <div className="container">
      <div
        style={{ width: isOpen ? "200px" : "50px", zIndex: isOpen ? 1000 : 0 }}
        className="sidebar"
      >
        <div className="top_section">
          <img
            src={logo}
            width={100}
            height={20}
            style={{ display: isOpen ? "block" : "none" }}
            className="logo"
            alt="Aceslogo"
          />
          <div
            style={{ marginLeft: isOpen ? "50px" : "0px", cursor: "pointer" }}
            className="bars"
          >
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeclassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
