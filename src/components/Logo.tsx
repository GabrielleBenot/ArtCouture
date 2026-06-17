import React from "react";

export function Logo({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <path 
        d="M15,85 C25,45 45,15 75,25 C60,25 35,45 23,85 Z" 
        fill="currentColor" 
      />
      <path 
        d="M45,35 C40,75 60,90 85,75 C95,68 90,82 75,85 C50,90 30,75 35,35 Z" 
        fill="currentColor" 
      />
    </svg>
  );
}
