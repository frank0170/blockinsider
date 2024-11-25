"use client";

import React from "react";
import styles from "./calendar.module.css";

const BitcoinCalendar = ({ data }) => {
  const today = new Date();
  const startDay = new Date();
  startDay.setDate(today.getDate() - 30);

  const changesMap = data.reduce((acc, { date, change }) => {
    acc[date] = change;
    return acc;
  }, {});

  const days = [];
  for (let d = new Date(startDay); d <= today; d.setDate(d.getDate() + 1)) {
    const formattedDate = d.toISOString().split("T")[0];
    days.push({
      date: formattedDate,
      change: changesMap[formattedDate] || null,
    });
  }

  return (
    <div className={styles.calendar}>
      {days.map((day) => (
        <div
          key={day.date}
          className={`${styles.day} ${
            day.change > 0
              ? styles.green
              : day.change < 0
              ? styles.red
              : styles.neutral
          }`}
        >
          <div>{new Date(day.date).toLocaleDateString()}</div>
          {day.change !== null && <div>{day.change}%</div>}
        </div>
      ))}
    </div>
  );
};

export default BitcoinCalendar;
