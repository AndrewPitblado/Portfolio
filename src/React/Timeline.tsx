import React from "react";
import pkg from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
// Import icons (you can use react-icons for this)
import { useState } from "react";
import { FaApple, FaHtml5, FaLaptopCode, FaReact } from "react-icons/fa";

const { VerticalTimeline, VerticalTimelineElement } = pkg;

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  iconStyle?: React.CSSProperties;
  tags?: string[];
  longDescription?: string;
}

const events: TimelineEvent[] = [
  {
    date: "Jun 2021",
    title: "First Website",
    description: "Built my first HTML/CSS site to learn the basics.",
    icon: <FaHtml5 />,
    iconStyle: { background: "#5E81AC", color: "#ECEFF4" },
    tags: ["HTML", "CSS", "JavaScript"],
    longDescription:
      "I started my journey into web development by creating a simple static website using HTML and CSS. This project helped me understand the fundamentals of web design and layout.",
  },

  {
    date: "Sep 2023",
    title: "Humour Hub (ios app)",
    description: "My first iOS App.",
    icon: <FaApple />,
    iconStyle: { background: "#5E81AC", color: "#ECEFF4" },
    tags: ["Swift", "SwiftUI", "TestFlight"],
    longDescription:
      "I developed an iOS app called Humour Hub, which is a platform for sharing jokes and funny content. This project was a significant step in my journey as it introduced me to mobile app development using Swift and SwiftUI.",
  },
  {
    date: "Dec 2024",
    title: "LogoQuiz Game",
    description: "Created my first React app and learned hooks.",
    icon: <FaReact />,
    iconStyle: { background: "#5E81AC", color: "#ECEFF4" },
    tags: ["React", "JavaScript", "Hooks"],
    longDescription:
      "I built a LogoQuiz game using React, which was my first hands-on experience with React hooks. This project deepened my understanding of state management and component lifecycle.",
  },

  {
    date: "April 2025",
    title: "Hangman Game",
    description: "My version of the classic game using webhooks.",
    icon: <FaReact />,
    iconStyle: { background: "#5E81AC", color: "#ECEFF4" },
    tags: ["React", "Web-hooks", "Node.js"],
    longDescription:
      "For my school project I decided to imporve upon the classic Hangman game by adding multiplayer support using webhooks. This project was a great way for me to learn about webhooks and how to use them in a real-world application.",
  },
  {
    date: "April 2025",
    title: "Updated Portfolio",
    description: "Launched this Astro + React portfolio site.",
    icon: <FaLaptopCode />,
    iconStyle: { background: "#5E81AC", color: "#ECEFF4" },
    tags: ["Astro", "React", "Tailwind CSS"],
    longDescription:
      "I revamped my portfolio using Astro and React, showcasing my projects and skills. This site is fully responsive and optimized for performance, reflecting my growth as a developer.",
  },
];

export default function Timeline() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };
  return (
    <VerticalTimeline lineColor="#5E81AC">
      {events.map((e, i) => (
        <VerticalTimelineElement
          className="vertical-timeline-element-custom"
          key={i}
          date={e.date}
          iconStyle={e.iconStyle || { background: "#5E81AC", color: "#ECEFF4" }}
          contentStyle={{ background: "#3B4252", color: "#ECEFF4" }}
          contentArrowStyle={{ borderRight: "7px solid #4C566A" }}
          icon={e.icon || <DefaultIcon />}
        >
          <h3 className="text-xl font-bold">{e.title}</h3>
          <p>{e.description}</p>

          {e.longDescription && (
            <div className="mt-3">
              <button
                onClick={() => toggleExpand(i)}
                className="text-sm text-[#88C0D0] hover:underline"
              >
                {expandedId === i ? "Show less" : "Read more"}
              </button>

              {expandedId === i && (
                <div className="animate-fadeIn mt-2 text-sm">
                  {e.longDescription}
                </div>
              )}
            </div>
          )}
          {e.tags && (
            <div className="mt-3 flex flex-wrap gap-2">
              {e.tags.map((tag, index) => (
                <span
                  key={index}
                  className="rounded-full bg-[#4C566A] px-3 py-1 text-xs text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
  );
}

// Keep your fallback icon
const DefaultIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="24"
    height="24"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
  </svg>
);
