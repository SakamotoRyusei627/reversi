import React, { useState, useEffect, useContext } from "react";
import "./MainBoard.css";

const MainBoard = (props) => {
  const { board, setBoard, color, setColor, playID } = props;

  useEffect(() => {
    const postStone = async () => {
      if (playID === undefined) {
        return;
      }
      const postData = { board: board, color: color };
      console.log();
      const postReturn = await fetch(`http://localhost:8000/stones/${playID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
    };
    postStone();
  }, [board, color, playID]);

  const circleJudgment = (elem, index, raw) => {
    let colorName;
    switch (elem) {
      case 0:
        colorName = "colorless";
        break;
      case 1:
        colorName = "white";
        break;
      case 2:
        colorName = "black";
        break;
      default:
    }

    const putStone = (e) => {
      const indexNum = e.target.id.split("_");
      let [raw, column] = indexNum;
      raw = Number(raw);
      column = Number(column);
      if (
        board[raw][column] === 1 ||
        board[raw][column] === 2 ||
        e.target.className !== "cell"
      ) {
        return;
      }

      let colorNum;
      if (color === "黒") {
        colorNum = 2;
        setColor("白");
      } else if (color === "白") {
        colorNum = 1;
        setColor("黒");
      }

      setBoard((prevState) =>
        prevState.map((elem1, index1) => {
          if (index1 === raw) {
            return elem1.map((elem2, index2) => {
              return index2 === column ? colorNum : elem2;
            });
          } else {
            return elem1;
          }
        })
      );
    };

    return (
      <div className="cell" id={`${raw}_${index}`} onClick={(e) => putStone(e)}>
        <span className={`circle-${colorName}`}></span>
      </div>
    );
  };

  return (
    <>
      <div className="board">
        {board.map((elem1, index1) => {
          const innerData = elem1.map((elem2, index2) => {
            return circleJudgment(elem2, index2, index1);
          });
          return <div className="row">{innerData}</div>;
        })}
      </div>
    </>
  );
};

export default MainBoard;
