import React from "react";

const Loading = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center absolute top-0 left-0">
      <span className="block w-20 h-20 rounded-full animate-ping bg-purple-500"></span>
    </div>
  );
};

export default Loading;
