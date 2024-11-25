// components/coin/calendar/calendar.tsx
import React from "react";

interface CalendarData {
  date: string;
  change: number;
}

interface BitcoinCalendarProps {
  data: CalendarData[];
}

const BitcoinCalendar: React.FC<BitcoinCalendarProps> = ({ data }) => {
  const today = new Date();
  const daysInMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  ).getDate();
  const month = today.toLocaleString("default", { month: "long" });

  const dataMap = data.reduce((acc, item) => {
    acc[item.date] = item.change;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="grid grid-cols-7 gap-4">
      {/* Calendar Header */}
      <div className="col-span-7 text-center mb-4">
        <h3 className="text-lg font-semibold">
          {month} {today.getFullYear()}
        </h3>
      </div>

      {/* Weekdays */}
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
        <div key={day} className="text-center font-medium text-gray-600">
          {day}
        </div>
      ))}

      {/* Empty cells for the start of the month */}
      {Array.from(
        { length: new Date(today.getFullYear(), today.getMonth(), 1).getDay() },
        (_, i) => (
          <div key={`empty-${i}`} className="h-16" />
        )
      )}

      {/* Calendar Days */}
      {Array.from({ length: daysInMonth }, (_, i) => {
        const day = i + 1;
        const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
        const change = dataMap[formattedDate];

        return (
          <div
            key={day}
            className={`h-16 flex flex-col items-center justify-center rounded-lg text-sm font-medium ${
              change > 0
                ? "bg-green-200 text-green-800"
                : change < 0
                ? "bg-red-200 text-red-800"
                : "bg-gray-200 text-gray-800"
            }`}
            title={`Change: ${change || 0}%`}
          >
            <span>{day}</span>
            <span>{change ? `${change}%` : "0%"}</span>
          </div>
        );
      })}
    </div>
  );
};

export default BitcoinCalendar;
