import React, { useEffect } from "react";
import "./Board.css";

const Board = (props) => {
  const {
    board,
    setBoard,
    color,
    setColor,
    playID,
    canBePlacedWhite,
    canBePlacedBlack,
  } = props;
  const URL =
    process.env.NODE_ENV === "production"
      ? `/stones/${playID}`
      : `http://localhost:8000/stones/${playID}`;

  useEffect(() => {
    const postStone = async () => {
      if (playID === undefined) {
        return;
      }
      const postData = { board: board, color: color };
      console.log();
      await fetch(`${URL}`, {
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
      console.log("クリックされました。");
      const indexNum = e.target.id.split("_");
      let [raw, column] = indexNum;
      raw = Number(raw);
      column = Number(column);
      if (board[raw][column] === 1 || board[raw][column] === 2) {
        if (
          e.target.className !== "cell" &&
          e.target.className !== "cell-canBePlace"
        ) {
          return;
        }
      }

      let colorNum;
      let canBePlaced;
      if (color === "黒") {
        colorNum = 2;
        canBePlaced = canBePlacedBlack[raw][column];
        setColor("白");
      } else if (color === "白") {
        colorNum = 1;
        canBePlaced = canBePlacedWhite[raw][column];
        setColor("黒");
      }
      console.log(canBePlaced);

      console.log();

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

      setBoard((prevState) =>
        prevState.map((elem1, index1) => {
          return elem1.map((elem2, index2) => {
            let changeFlag = false;
            canBePlaced.forEach((element) => {
              if (
                JSON.stringify(element) === JSON.stringify([index1, index2])
              ) {
                changeFlag = true;
              }
            });
            if (changeFlag) {
              return board[index1][index2] === 1 ? 2 : 1;
              // colorNum = colorNum === 1 ? 2 : 1;
            }

            return elem2;
          });
        })
      );
    };
    let cellClassName;
    let clickEvent;
    if (canBePlacedWhite[raw][index].length !== 0 && color === "白") {
      cellClassName = "cell-canBePlace";
      clickEvent = (e) => putStone(e);
    } else if (canBePlacedBlack[raw][index].length !== 0 && color === "黒") {
      cellClassName = "cell-canBePlace";
      clickEvent = (e) => putStone(e);
    } else {
      cellClassName = "cell";
    }

    return (
      <div
        className={cellClassName}
        id={`${raw}_${index}`}
        onClick={(e) => {
          if (clickEvent !== undefined) clickEvent(e);
        }}
      >
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

export default Board;
