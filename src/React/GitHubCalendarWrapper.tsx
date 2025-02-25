import React from "react";
import GitHubCalendar from "react-github-calendar";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
interface GitHubCalendarWrapperProps {
  username: string;
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
  return (
    <div className="github-calendar-container">
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
            "data-tooltip-html": `${activity.count} activities on ${activity.date}`,
          })
        }
        eventHandlers={{
          onClick: (event) => (activity) => {
            alert(JSON.stringify(activity));
          },
          onMouseEnter: (event) => (activity) => {
            console.log("on mouse enter");
          },
        }}
      />
      <ReactTooltip id="react-tooltip" />
    </div>
  );
}
