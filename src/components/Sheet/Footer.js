import React, { useEffect, useContext, useRef, useState } from "react";
import {
  FaCompress,
  FaAngleRight,
  FaForward,
  FaTh,
  FaPlusCircle,
} from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTable,
  faBookOpen,
  faChartLine,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import { GlobalContext } from "../../GlobalProvider";
import Menu from "../../Menu";
import AlanTalk from "./AlanTalk";
import "../../App.css";
const Footer = () => {
  // const { x, y, showMenu } = useRightClickMenu();
  const {
    sheets,
    setSheets,
    dashboards,
    setDashboards,
    storys,
    setStorys,
    showMenu,
    setShowMenu,
    matchedUser,
    disableComponenet,
    setDisableComponent,
  } = useContext(GlobalContext);
  const handleAddSheet = () => {
    const newSheet = { name: `sheet${sheets.length}`, workbooks: [], rows: [] };
    setSheets((prev) => [...prev, newSheet]);
  };

  const handleAddDashboard = () => {
    const newDashboard = {
      name: `dashboard${dashboards.length}`,
      graphs: [0, 1, 2, 3, 4, 5],
    };
    setDashboards((prev) => [...prev, newDashboard]);
  };
  const handleAddStory = (index) => {
    const newStory = {
      name: `story${storys.length}`,
      buttonContain: [],
    };
    setStorys((prev) => [...prev, newStory]);
  };

  const updateSheetname = (e) => {
    e.preventDefault();
    setShowMenu(true);
  };
  const handleContextMenu = (e) => {
    e.preventDefault();
    setShowMenu(true);
  };
  const handleClick = () => {
    showMenu && setShowMenu(false);
  };
  useEffect(() => {
    if (matchedUser === "Basic") {
      setDisableComponent(true);
      document.getElementById("disableFooterStory").style.pointerEvents =
        "none";
      document.getElementById("disableFooterAnalytics").style.pointerEvents =
        "none";
      document.getElementById("disableFooterStory").style.opacity = 0.1;
      document.getElementById("disableFooterAnalytics").style.opacity = 0.1;
    }
    if (matchedUser === "Standard") {
      document.getElementById("disableFooterAnalytics").style.pointerEvents =
        "none";
      document.getElementById("disableFooterAnalytics").style.opacity = 0.1;
    }
  }); //
  console.log(storys);

  return (
    <>
      <hr></hr>
      <AlanTalk />
      <div className="footer">
        <button className="footer-button">
          <FontAwesomeIcon icon={faListCheck} className="icon" />
          <Link to="/Datasource">Data Source</Link>
        </button>

        {sheets.map((sheet, idx) => (
          <button key={idx} className="footer-button">
            <Link
              to={`/Sheet/${sheet.name}`}
              onContextMenu={updateSheetname}
              contextmenu="mymenu"
            >
              <FontAwesomeIcon icon={faTable} className="icon" />
              {sheet.name}
            </Link>
          </button>
        ))}
        <button onClick={handleAddSheet}>
          <FaPlusCircle className="button-plus" id="disableFooterStory" />
        </button>
        {dashboards.map((dashboard, idx) => (
          <button key={idx} className="footer-button">
            <Link to={`/dashboard/${dashboard.name}`}>
              <FaTh className="icon" />
              {dashboard.name}
            </Link>
          </button>
        ))}
        <button onClick={handleAddDashboard} disabled={disableComponenet}>
          <FaPlusCircle className="button-plus" id="disableFooterStory" />
        </button>
        {storys.map((story, idx) => (
          <button
            key={idx}
            disabled={disableComponenet}
            className="footer-button"
          >
            <Link to={`/story/${story.name}`} id="disableFooterStory">
              <FontAwesomeIcon icon={faBookOpen} className="icon" />
              {story.name}
            </Link>
          </button>
        ))}
        <button onClick={handleAddStory} disabled={disableComponenet}>
          <FaPlusCircle className="button-plus" id="disableFooterStory" />
        </button>
        <button disabled={disableComponenet} className="footer-button">
          <Link to={"/AnalyticsMain"} id="disableFooterAnalytics">
            <FontAwesomeIcon icon={faChartLine} className="icon" />
            Analytics
          </Link>
        </button>
      </div>

      <hr></hr>
    </>
  );
};

export default Footer;
