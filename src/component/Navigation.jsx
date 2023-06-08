import React from "react";
import "./Navigation.css";

const Navigation = (props) => {
  const {
    color,
    setColor,
    finishFlag,
    matchResult,
    playID,
    setFinishFlag,
    setBoard,
  } = props;
  let winner;
  if (matchResult.blackStone > matchResult.whiteStone) {
    winner = "黒の勝ち";
  } else if (matchResult.blackStone < matchResult.whiteStone) {
    winner = "白の勝ち";
  } else {
    winner = "引き分け";
  }

  let content;
  if (finishFlag) {
    content = (
      <>
        <h2>{winner}</h2>
        <p>{`黒${matchResult.blackStone}個、白${matchResult.whiteStone}個`}</p>
      </>
    );
  } else {
    content = (
      <>
        <p>{`${color}のターン`}</p>
        <p>{`黒${matchResult.blackStone}個、白${matchResult.whiteStone}個`}</p>
      </>
    );
  }
  const reset = async () => {
    if (playID === undefined) {
      return;
    }
    const defaultData = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 2, 0, 0, 0],
      [0, 0, 0, 2, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    setBoard((prevState) =>
      prevState.map((elem1, index1) => {
        return elem1.map((elem2, index2) => {
          return defaultData[index1][index2];
        });
      })
    );
    await fetch(
      `/data/${playID}`,
      // `http://localhost:8000/data/${playID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(defaultData),
      }
    )
      .then(setFinishFlag(false))
      .catch((e) => console.error(e));
  };

  return (
    <div className="message-Box">
      {content}
      <button
        className="favorite styled"
        type="button"
        onClick={() => {
          if (color === "黒") {
            setColor("白");
          } else if (color === "白") {
            setColor("黒");
          }
        }}
      >
        パス
      </button>
      <button className="favorite styled" type="button" onClick={() => reset()}>
        ゲームリセット
      </button>
    </div>
  );
};

export default Navigation;
