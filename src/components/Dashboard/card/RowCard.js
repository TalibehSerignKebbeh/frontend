import React from "react";

const RowCard = ({ text, amount, icon }) => {
  return (
    <div
      className="card-shadow gap-x-16 rounded-sm max-w-xs p-2 px-4 bg-white flex flex-row 
                items-center justify-between place-content-center gap-1 "
    >
      <div className="">
        <h3>{text}</h3>
        <h1 className="px-1">{amount}</h1>
      </div>
      {icon}
    </div>
  );
};

export default RowCard;
