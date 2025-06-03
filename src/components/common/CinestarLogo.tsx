import React from "react";

const CinestarLogo: React.FC<{ className?: string }> = ({
  className = "h-8 w-8",
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" fill="#FF3366" />
      <polygon
        points="12,5 14.5,10.5 20,11 15.5,14.5 17,20 12,17 7,20 8.5,14.5 4,11 9.5,10.5"
        fill="white"
      />
    </svg>
  );
};

export default CinestarLogo;
