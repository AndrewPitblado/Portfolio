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
  const shownMonths = 6;

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

  return (
    <div className="github-calendar-container relative" ref={containerRef}>
      <GitHubCalendar
        username={username}
        // transformData={selectLastHalfYear}
        theme={{
          light: [
            "#a0a0a0",
            "rgb(117, 197, 237)",
            "rgb(37, 130, 192)",
            "rgb(22, 100, 218)",
            "rgb(7, 49, 148)",
          ],
          dark: [
            "rgb(41, 41, 41)",
            "rgb(117, 197, 237)",
            "rgb(37, 130, 192)",
            "rgb(22, 100, 218)",
            "rgb(7, 49, 148)",
          ],
        }}
        blockSize={15}
        blockMargin={5}
        blockRadius={3}
        renderBlock={(block, activity) =>
          React.cloneElement(block, {
            "data-tooltip-id": "react-tooltip",
            "data-tooltip-html": `${activity.count} contributions on ${activity.date}`,
            onClick: (event) => handleBlockClick(activity, event),
          })
        }
      />
      <ReactTooltip id="react-tooltip" />
      {selectedActivity &&
        document.body &&
        createPortal(
          <div
            className="activity-details fixed rounded-lg bg-slate-800 p-4 shadow-lg"
            style={{
              // Position the modal at the click location, adjusted to prevent overflow
              left: `${clientCoordinates.x}px`,
              top: `${clientCoordinates.y - 20}px`,
              width: "250px",
              transform: "translate(-50%, -100%)", // Center horizontally and position above click
              zIndex: 999,
              color: "white",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)", // Add some space between pointer and modal
            }}
          >
            {/* Add a pointer triangle at the bottom of the modal */}
            <div
              className="absolute h-4 w-4 rotate-45 transform bg-slate-800"
              style={{
                bottom: "-8px",
                left: "50%",
                marginLeft: "-8px",
              }}
            />
            <h3 className="mb-2 text-xl font-bold">
              {new Date(selectedActivity.date).toDateString()}
            </h3>
            <div className="mb-2 flex items-center">
              <div className="mr-2">Contribution level:</div>
              <div className="flex">
                {[0, 1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`mr-1 h-4 w-4 rounded-sm ${
                      level <= selectedActivity.level
                        ? "bg-blue-500"
                        : "bg-gray-700"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-lg">
              {selectedActivity.count}{" "}
              {selectedActivity.count === 1 ? "contribution" : "contributions"}
            </p>
            <button
              onClick={() => {
                setSelectedActivity(null);
                setModalPosition(null);
              }}
              className="mt-2 text-sm text-blue-400 hover:text-blue-300"
            >
              Close
            </button>
          </div>,
          document.body,
        )}
    </div>
  );
}
