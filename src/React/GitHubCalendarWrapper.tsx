import React, { useRef, useState } from "react";
import { createPortal } from "react-dom";
import GitHubCalendar from "react-github-calendar";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
interface GitHubCalendarWrapperProps {
  username: string;
}

interface ModalPosition {
  x: number;
  y: number;
}

const selectLastHalfYear = (contributions) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const shownMonths = 8;

  return contributions.filter((activity) => {
    const date = new Date(activity.date);
    const activityMonth = date.getMonth();
    const activityYear = date.getFullYear();

    // If we're in the current year
    if (activityYear === currentYear) {
      return activityMonth <= currentMonth;
    }

    // If we're in the previous year, only include months that fall within the last 6 months window
    if (activityYear === currentYear - 1) {
      const monthsFromPreviousYear = shownMonths - (currentMonth + 1);
      return activityMonth >= 12 - monthsFromPreviousYear;
    }

    return false;
  });
};

export default function GitHubCalendarWrapper({
  username,
}: GitHubCalendarWrapperProps) {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [modalPosition, setModalPosition] = useState<ModalPosition | null>(
    null,
  );
  const [clientCoordinates, setClientCoordinates] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleBlockClick = (activity, event) => {
    // Calculate position relative to the container
    if (selectedActivity && selectedActivity.date === activity.date) {
      setSelectedActivity(null);

      return;
    }
    setClientCoordinates({
      x: event.clientX,
      y: event.clientY,
    });
    setSelectedActivity(activity);

    // if (containerRef.current) {
    //   const rect = containerRef.current.getBoundingClientRect();
    //   const x = event.clientX - rect.left;
    //   // Use clientY for more accurate vertical positioning
    //   const y = event.clientY - rect.top;

    //   console.log("Click position:", { x, y });
    //   console.log("Activity:", activity);

    //   setModalPosition({ x, y });
    //   setSelectedActivity(activity);
    // }
  };

  // Nord color palette for GitHub contributions
  const nordTheme = {
    light: [
      "#4C566A", // Level 0: Dark nord slate (polar night)
      "#81A1C1", // Level 1: Light nord blue (frost)
      "#88C0D0", // Level 2: Bright nord blue (frost)
      "#5E81AC", // Level 3: Deep nord blue (frost)
      "#8FBCBB", // Level 4: Nord teal (frost)
    ],
    dark: [
      "#2E3440", // Level 0: Darkest nord color (polar night)
      "#81A1C1", // Level 1: Light nord blue (frost)
      "#88C0D0", // Level 2: Bright nord blue (frost)
      "#5E81AC", // Level 3: Deep nord blue (frost)
      "#8FBCBB", // Level 4: Nord teal (frost)
    ],
  };

  return (
    <div className="github-calendar-container relative" ref={containerRef}>
      <GitHubCalendar
        username={username}
        transformData={selectLastHalfYear}
        theme={nordTheme}
        blockSize={15}
        blockMargin={5}
        blockRadius={3}
        renderBlock={(block, activity) =>
          React.cloneElement(block, {
            "data-tooltip-id": "react-tooltip",
            "data-tooltip-html": `${activity.count} contributions on ${activity.date}`,
            onClick: (event) => handleBlockClick(activity, event),
            className: "cursor-pointer",
          })
        }
      />
      <ReactTooltip id="react-tooltip" />
      {selectedActivity &&
        document.body &&
        createPortal(
          <div
            className="activity-details fixed rounded-lg shadow-lg"
            style={{
              left: `${clientCoordinates.x}px`,
              top: `${clientCoordinates.y - 20}px`,
              width: "250px",
              transform: "translate(-50%, -100%)",
              zIndex: 999,
              backgroundColor: "#3B4252", // Nord background color (polar night)
              color: "#ECEFF4", // Nord text color (snow storm)
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
              padding: "16px",
              border: "1px solid #4C566A", // Nord border color (polar night lightest)
            }}
          >
            {/* Add a pointer triangle at the bottom of the modal */}
            <div
              className="absolute h-4 w-4 rotate-45 transform"
              style={{
                bottom: "-8px",
                left: "50%",
                marginLeft: "-8px",
                backgroundColor: "#3B4252", // Same as modal background
                borderRight: "1px solid #4C566A",
                borderBottom: "1px solid #4C566A",
              }}
            />
            <h3 className="mb-2 text-xl font-bold text-[#88C0D0]">
              {selectedActivity.date}
            </h3>
            <div className="mb-2 flex items-center">
              <div className="mr-2 text-[#E5E9F0]">Contribution level:</div>
              <div className="flex">
                {[0, 1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`mr-1 h-4 w-4 rounded-sm ${
                      level <= selectedActivity.level
                        ? "bg-[#81A1C1]" // Nord frost blue
                        : "bg-[#4C566A]" // Nord darker gray
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-lg text-[#E5E9F0]">
              {selectedActivity.count}{" "}
              {selectedActivity.count === 1 ? "contribution" : "contributions"}
            </p>
            <button
              onClick={() => {
                setSelectedActivity(null);
                setModalPosition(null);
              }}
              className="mt-2 text-sm text-[#88C0D0] hover:text-[#8FBCBB]"
            >
              Close
            </button>
          </div>,
          document.body,
        )}
    </div>
  );
}
