import React from "react";

type Props = { active: boolean };

function Loading({ active }: Readonly<Props>) {
  if (!active) {
    return null;
  }

  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70">
      <svg
        className="animate-spin h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 6l0 -3" />
        <path d="M16.25 7.75l2.15 -2.15" />
        <path d="M18 12l3 0" />
        <path d="M16.25 16.25l2.15 2.15" />
        <path d="M12 18l0 3" />
        <path d="M7.75 16.25l-2.15 2.15" />
        <path d="M6 12l-3 0" />
        <path d="M7.75 7.75l-2.15 -2.15" />
      </svg>
    </div>
  );
}

export default Loading;
