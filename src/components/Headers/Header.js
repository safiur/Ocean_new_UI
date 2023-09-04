import React, { useState, useContext } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate, useParams, Link } from "react-router-dom";
import { saveAs } from "file-saver";
import { logoutUser } from "../actions/authActions";
import Dropdown from "react-dropdown";
import Sequel from "../DataSource/Sequel";
import Sconnect from "../Sheet/Sconnect";
import Weatherapi from "../DataSource/Weatherapi";
import "react-dropdown/style.css";

import { GlobalContext } from "../../GlobalProvider";
const Header = () => {
  const {
    storys,
    dashboards,
    sheets,
    selectedWB,
    selectedWBSheet,
    matchedUser,
    disableComponenet,
    setDisableComponent,
    setIsOpensql,
    setSequelQuery,
    setModalforWeather,
    loginUsername,
  } = useContext(GlobalContext);
  let navigate = useNavigate();
  const sheetParam = useParams().sheet;
  const dashboardParam = useParams().dashboard;
  const storyParam = useParams().story;

  const [isFileDropdownOpen, setIsFileDropdownOpen] = useState(false);
  const [isHelpDropdownOpen, setIsHelpDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const toggleFileDropdown = () => {
    setIsFileDropdownOpen(!isFileDropdownOpen);
  };

  const toggleHelpDropdown = () => {
    setIsHelpDropdownOpen(!isHelpDropdownOpen);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleMenuClick = (menu) => {
    // Implement your logic here based on the menu item clicked
    if (menu === "Sign out") {
      localStorage.removeItem("jwtToken");
      navigate("/", { replace: true });
    }
    if (menu === "Exit") {
      navigate("/", { replace: true });
    }
    if (menu === "open") {
    }
    if (menu === "connectsql") {
      setIsOpensql(true);
      return <Sconnect />;
    }
    if (menu === "writeQuery") {
      setSequelQuery(true);

      return <Sequel />;
    }
    if (menu === "weatherData") {
      setModalforWeather(true);
      return <Weatherapi />;
    }
    if (menu === "Save") {
      let obj = {};
      let allSheetsData = selectedWB;
      obj["sheetParam"] = sheetParam;
      obj["dashboardParam"] = dashboardParam;
      obj["storyParam"] = storyParam;
      // obj["columns"] = columns;
      obj["allworksheetData"] = allSheetsData;
      obj["globalData"] = sheets;
      obj["dashboards"] = dashboards;
      obj["realdata"] = selectedWB[selectedWBSheet];
      obj["storys"] = storys;
      let content = JSON.stringify(obj);
      let blob = new Blob([content], { type: "application/json" });

      saveAs(blob, "File.owbx");
    }
  };
  return (
    <>
      <Sconnect />
      <Sequel />
      <div className="header-main">
        <nav className="navmenu">
          <ul className="header__list">
            <li className="header__list" onClick={toggleFileDropdown}>
              File
              <ul className={`dropdown ${isFileDropdownOpen ? "show" : ""}`}>
                <li onClick={() => handleMenuClick("Option 1")}>Open</li>
                <li onClick={() => handleMenuClick("Save")}>Save</li>
                <li onClick={() => handleMenuClick("connectsql")}>
                  Connect SQL
                </li>
                <li onClick={() => handleMenuClick("writeQuery")}>
                  Execute SQL Query
                </li>
                <li onClick={() => handleMenuClick("weatherData")}>
                  Weather Data
                </li>
              </ul>
            </li>
            <li className="header__list" onClick={toggleHelpDropdown}>
              Help
              <ul className={`dropdown ${isHelpDropdownOpen ? "show" : ""}`}>
                <li onClick={() => handleMenuClick("FAQ")}>FAQ</li>
                <li onClick={() => handleMenuClick("Contact Us")}>
                  Contact Us
                </li>
                {/* Add more dropdown options */}
              </ul>
            </li>
            <li> Data</li>
            <li> Server</li>
          </ul>
        </nav>
        <div>
          <h2 className="toolname">Ocean-Data Analytics Tool</h2>
        </div>
        <div className="user-section text-end">
          <Link
            href="/"
            className="dropdown-toggle"
            onClick={toggleUserDropdown}
          >
            <FaRegUserCircle size="19px" color="#fff" />
            <span className="user-name">{loginUsername}</span>
          </Link>
          <ul
            className={`dropdown ${isUserDropdownOpen ? "show" : ""}`}
            data-popper-placement="bottom-start"
          >
            <li>
              <Link
                className="dropdown-item"
                onClick={() => handleMenuClick("Settings")}
              >
                Settings
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-item"
                // to="/"
                onClick={() => handleMenuClick({ matchedUser })}
              >
                {matchedUser}
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link
                className="dropdown-item"
                to="/"
                onClick={() => handleMenuClick("Sign out")}
              >
                Sign out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default Header;
