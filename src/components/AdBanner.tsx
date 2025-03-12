import React from "react";
import { Card } from "./ui/card";

interface AdBannerProps {
  width?: string;
  height?: string;
  position?: "top" | "sidebar" | "inline" | "footer";
  className?: string;
}

const AdBanner = ({
  width = "100%",
  height = "90px",
  position = "top",
  className = "",
}: AdBannerProps) => {
  // Different background colors based on position for visual distinction
  const getBgColor = () => {
    switch (position) {
      case "top":
        return "bg-gradient-to-r from-indigo-200/40 to-purple-200/40 dark:from-indigo-900/40 dark:to-purple-900/40";
      case "sidebar":
        return "bg-gradient-to-r from-blue-200/40 to-indigo-200/40 dark:from-blue-900/40 dark:to-indigo-900/40";
      case "inline":
        return "bg-gradient-to-r from-purple-200/40 to-pink-200/40 dark:from-purple-900/40 dark:to-pink-900/40";
      case "footer":
        return "bg-gradient-to-r from-gray-200/40 to-gray-300/40 dark:from-gray-900/40 dark:to-gray-800/40";
      default:
        return "bg-gray-200/40 dark:bg-gray-800/40";
    }
  };

  return (
    <Card
      className={`flex items-center justify-center border border-gray-400 dark:border-gray-700 ${getBgColor()} ${className}`}
      style={{ width, height }}
    >
      <div className="text-center">
        <p className="text-gray-600 dark:text-gray-400 text-sm">Reklam Alanı</p>
        <p className="text-gray-700 dark:text-gray-500 text-xs">
          {position} pozisyonu
        </p>
      </div>
    </Card>
  );
};

export default AdBanner;
