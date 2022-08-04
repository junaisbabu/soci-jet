import React from "react";
import { NavLink } from "react-router-dom";
import "./trendingLatest.css";
import { HiClock } from "react-icons/hi";
import { FaFireAlt } from "react-icons/fa";

function TrendingLatest({ setTrendLatest, trendLatest }) {
  const handleTrend = () => {
    setTrendLatest("trend");
  };

  const handleLatest = () => {
    setTrendLatest("latest");
  };
  return (
    <div className="trendingLatest-container">
      <ul className="nav">
        <li
          className={trendLatest === "trend" ? "clicked nav-item" : "nav-item"}
          onClick={handleTrend}
        >
          <FaFireAlt /> Trending
        </li>
        <li
          className={trendLatest === "latest" ? "clicked nav-item" : "nav-item"}
          onClick={handleLatest}
        >
          <HiClock /> Latest
        </li>
      </ul>
    </div>
  );
}

export default TrendingLatest;
