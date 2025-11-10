
import React from 'react';

const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6-10.375A1 1 0 0 1 3.5 2H2" />
    <path d="M14.063 8.5A2 2 0 0 0 15.5 9.937l10.375 6a1 1 0 0 1-1.063 1.938v0l-10.375-6Z" />
    <path d="M22 21.5 18 14" />
    <path d="m3.5 18 6-1" />
    <path d="M12.5 12.5 4 22" />
  </svg>
);

export default SparklesIcon;
