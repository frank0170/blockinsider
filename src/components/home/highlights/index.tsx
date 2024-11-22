import React from "react";

const globalCard = "rounded-[10px] p-[16px] w-[438px] h-[236px]";
const globalTitle = "text-black font-semibold text-[20px]";

const BitcoinCard = () => {
  return (
    <div className={globalCard} style={{ border: "1px solid black" }}>
      <div className="w-full flex justify-between">
        <span className={globalTitle}>Bitcoin Dominance</span>
        <span>7D</span>
      </div>
    </div>
  );
};

const FearGreedCard = () => {
  return (
    <div className={globalCard} style={{ border: "1px solid black" }}>
      <div className="w-full flex">
        <span className={globalTitle}>Fear & Greed Index</span>
      </div>
    </div>
  );
};

const EventsCard = () => {
  return (
    <div className={globalCard} style={{ border: "1px solid black" }}>
      <div className="w-full flex">
        <span className={globalTitle}>Hot Events</span>
      </div>
    </div>
  );
};

export const Highlights = () => {
  return (
    <div className="flex justify-between gap-[20px] items-center">
      <BitcoinCard />
      <FearGreedCard />
      <EventsCard />
    </div>
  );
};
