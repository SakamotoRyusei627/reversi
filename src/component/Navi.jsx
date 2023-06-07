import React, { useState, useEffect, useContext } from "react";

const Navi = (props) => {
  const { color } = props;
  return (
    <div className="message-Box">
      <p>{`${color}のターンです`}</p>
    </div>
  );
};

export default Navi;
