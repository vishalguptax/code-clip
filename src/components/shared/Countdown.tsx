"use client";

import React, { useState, useEffect } from "react";

const Countdown = ({ expiresAt }: { expiresAt: string }) => {
  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const target = new Date(expiresAt).getTime();
    const difference = target - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0 }; // Expired
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000); // Update every minute

    return () => clearInterval(timer); // Cleanup on component unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expiresAt]);

  const { days, hours, minutes } = timeLeft;

  if (days === 0 && hours === 0 && minutes === 0) {
    return <div className="absolute bottom-3 left-3">Expired</div>;
  }

  return (
    <div className="absolute bottom-3 left-3 text-[10px] bg-black/30 px-2 rounded">
      Expires in: {days > 0 && `${days} days`} {hours > 0 && `${hours} hours`}{" "}
      {minutes > 0 && `${minutes} minutes`}
    </div>
  );
};

export default Countdown;
