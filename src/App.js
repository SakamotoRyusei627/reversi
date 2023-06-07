import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import Header from "./component/Header";
import MainBoard from "./component/MainBoard";
import Navi from "./component/Navi";

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
  const [canBePlacedWhite, setCanBePlacedWhite] = useState([]);
  const [canBePlacedBlack, setCanBePlacedBlack] = useState([]);
  const [color, setColor] = useState("黒");
  const [playID, setPlayID] = useState();

  useEffect(() => {
    const asyncFetch = async () => {
      const matchCardJSON = await (
        await fetch("http://localhost:8000/cards")
      ).text();
      const matchCard = JSON.parse(matchCardJSON);
      setPlayID(Number(matchCard[0].id));
      const situation = JSON.parse(matchCard[0].situation);

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
    };

    const interval = setInterval(() => {
      asyncFetch();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />
      {
        <MainBoard
          board={board}
          setBoard={setBoard}
          color={color}
          setColor={setColor}
          playID={playID}
        />
      }
      <Navi color={color} />
    </>
  );
}

export default App;
