"use client";

import React, { useEffect, useState } from "react";
import { getFearGreed } from "@/api/coinMarketCap";

import "./fearGreed.css";

export const FearGreedIndex = () => {
  const [fearGreedScore, setFearGreedScore] = useState(50); // Default to neutral
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFearGreedData = async () => {
      try {
        const response = await getFearGreed();
        const score = response.data.value;
        setFearGreedScore(score);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFearGreedData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const needleRotation = (fearGreedScore / 100) * 180 - 90; // Map 0-100 score to -90° to 90°

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <div
        style={{
          position: "relative",
          width: "auto",
          height: "auto",
          margin: "auto",
        }}
      >
        {/* Gauge Background */}
        <svg viewBox="0 0 100 50" style={{ width: "100%", height: "100%" }}>
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="red" />
              <stop offset="50%" stopColor="yellow" />
              <stop offset="100%" stopColor="green" />
            </linearGradient>
          </defs>
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="5"
          />
        </svg>

        {/* Needle */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "4px",
            height: "50%",
            backgroundColor: "black",
            transformOrigin: "bottom center",
            transform: `rotate(${needleRotation}deg)`,
            transition: "transform 0.5s ease-out",
          }}
        ></div>

        {/* Center Circle */}
        <div
          style={{
            position: "absolute",
            top: "calc(50% - 5px)",
            left: "calc(50% - 5px)",
            width: "10px",
            height: "10px",
            backgroundColor: "black",
            borderRadius: "50%",
          }}
        ></div>
      </div>
      <p style={{ marginTop: "10px", fontSize: "18px" }}>
        Market Sentiment: <strong>{fearGreedScore}</strong>
      </p>
    </div>
  );
};
