import React, { useContext, useRef } from "react";
import PlotComponentDashboard from "./PlotComponentDashboard";
import PlotComponentStory from "./PlotComponentStory";
import Story from "./Story";
import { Link, useParams } from "react-router-dom";

const StoryPlot = ({ selectedStory, selected, storyParam }) => {
  const story = selectedStory.buttonContain.find((s) => s.name === selected);


  if (story.hasOwnProperty("workbooks")) {
    console.log("sheets");
    return (
      <div>
        <PlotComponentStory story={story} />
      </div>
    );
  }
  if (!story.hasOwnProperty("workbooks")) {
    console.log("dashboard");
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gridTemplateRows: "1fr ",
        }}
      >
        {story?.graphs?.map((sheet) => (
          <div
            style={{
              border: "1px solid black",
              width: "395px",
              height: "254px",
              margin: "2px",
            }}
          >
            <PlotComponentDashboard story={story} sheet={sheet} />
          </div>
        ))}
      </div>
    );
  }

  return <Story />;
};
export default StoryPlot;
