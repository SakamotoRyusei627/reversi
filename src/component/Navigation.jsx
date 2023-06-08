import React from "react";

const Navigation = (props) => {
  const { color } = props;
  return (
    <div className="message-Box">
      <p>{`${color}のターンです`}</p>
    </div>
  );
};

export default Navigation;
