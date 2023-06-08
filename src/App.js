import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./component/Header";
import Board from "./component/Board";
import Navigation from "./component/Navigation";
import getCanBePlaced from "./logic";
import firework from "./finish.gif";
console.log(process.env.NODE_ENV);

function App() {
  // 0は何もない
  // 1は白
  // 2は黒
  // 黒からスタート
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const [canBePlacedWhite, setCanBePlacedWhite] = useState([
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
  ]);
  const [canBePlacedBlack, setCanBePlacedBlack] = useState([
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
  ]);
  const [color, setColor] = useState("黒");
  const [finishFlag, setFinishFlag] = useState(false);
  const [playID, setPlayID] = useState();
  const [matchResult, setMatchResult] = useState({
    whiteStone: 0,
    blackStone: 0,
  });
  useEffect(() => {
    const asyncFetch = async () => {
      const matchCard = await fetch(
        `/cards`
        // `http://localhost:8000/cards`
      )
        .then((data) => data.json())
        .catch((e) => console.error(e));

      setPlayID(Number(matchCard[0].id));
      const situation = JSON.parse(matchCard[0].situation);

      const finishConfirmation = () => {
        for (let i = 0; i < situation.length; i++) {
          for (let j = 0; j < situation[i].length; j++) {
            if (situation[i][j] === 0) {
              setFinishFlag(false);
              return;
            }
          }
        }
        setFinishFlag(true);
      };
      finishConfirmation();

      setMatchResult((prevState) => ({
        ...prevState,
        whiteStone: situation.flat().filter((elem) => elem === 1).length,
        blackStone: situation.flat().filter((elem) => elem === 2).length,
      }));

      setBoard((prevState) =>
        prevState.map((elem1, index1) => {
          return elem1.map((elem2, index2) => {
            if (elem2 === situation[index1][index2]) {
              return elem2;
            } else {
              return situation[index1][index2];
            }
          });
        })
      );
      setColor(matchCard[0].color);
      const whiteStone = getCanBePlaced(situation, "白");
      const blackStone = getCanBePlaced(situation, "黒");
      setCanBePlacedWhite((prevState) =>
        prevState.map((elem1, index1) => {
          return elem1.map((elem2, index2) => {
            return whiteStone[index1][index2];
          });
        })
      );
      setCanBePlacedBlack((prevState) =>
        prevState.map((elem1, index1) => {
          return elem1.map((elem2, index2) => {
            return blackStone[index1][index2];
          });
        })
      );
    };

    const interval = setInterval(() => {
      asyncFetch();
    }, 1000);
    return () => clearInterval(interval);
  }, [finishFlag]);

  return (
    <>
      <Header />
      {finishFlag || (
        <Board
          board={board}
          setBoard={setBoard}
          color={color}
          setColor={setColor}
          playID={playID}
          canBePlacedWhite={canBePlacedWhite}
          canBePlacedBlack={canBePlacedBlack}
        />
      )}
      {finishFlag && (
        <div className="container">
          <img src={firework} alt="花火の画像" />
        </div>
      )}
      <Navigation
        color={color}
        setColor={setColor}
        finishFlag={finishFlag}
        matchResult={matchResult}
        playID={playID}
        setFinishFlag={setFinishFlag}
        setBoard={setBoard}
      />
    </>
  );
}

export default App;
