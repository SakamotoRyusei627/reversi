const getCanBePlaced = (stateArr, myStoneColor) => {
  let setData = [
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], []],
  ];

  for (let i = 0; i <= 7; i++) {
    for (let j = 0; j <= 7; j++) {
      // 行がrow
      // 列がcolumn
      const row = i;
      const column = j;
      let myStone;
      if (myStoneColor === "白") {
        myStone = 1;
      } else if (myStoneColor === "黒") {
        myStone = 2;
      } else {
        return;
      }
      let rightSide,
        leftSide,
        upSide,
        downSide,
        upwardRight,
        upwardLeft,
        downwardRight,
        downwardLeft;

      [
        rightSide,
        leftSide,
        upSide,
        downSide,
        upwardRight,
        upwardLeft,
        downwardRight,
        downwardLeft,
      ] = [true, true, true, true, true, true, true, true];

      let rightSideData,
        leftSideData,
        upSideData,
        downSideData,
        upwardRightData,
        upwardLeftData,
        downwardRightData,
        downwardLeftData;
      [
        rightSideData,
        leftSideData,
        upSideData,
        downSideData,
        upwardRightData,
        upwardLeftData,
        downwardRightData,
        downwardLeftData,
      ] = [[], [], [], [], [], [], [], []];

      if (stateArr[row][column] === 0) {
        for (let k = 1; k <= 7; k++) {
          if (column + k <= 7 && rightSide === true) {
            if (
              stateArr[row][column + k] === myStone ||
              stateArr[row][column + k] === 0
            ) {
              if (stateArr[row][column + k] !== myStone) {
                rightSideData = [];
              }
              rightSide = false;
            } else {
              if (column + k === 7) {
                rightSideData = [];
              } else {
                rightSideData.push([row, column + k]);
              }
            }
          }

          if (column - k >= 0 && leftSide === true) {
            if (
              stateArr[row][column - k] === myStone ||
              stateArr[row][column - k] === 0
            ) {
              if (stateArr[row][column - k] !== myStone) {
                leftSideData = [];
              }
              leftSide = false;
            } else {
              if (column - k === 0) {
                leftSideData = [];
              } else {
                leftSideData.push([row, column - k]);
              }
            }
          }
          if (row + k <= 7 && downSide === true) {
            if (
              stateArr[row + k][column] === myStone ||
              stateArr[row + k][column] === 0
            ) {
              if (stateArr[row + k][column] !== myStone) {
                downSideData = [];
              }
              downSide = false;
            } else {
              if (row + k === 7) {
                downSideData = [];
              } else {
                downSideData.push([row + k, column]);
              }
            }
          }
          if (row - k >= 0 && upSide === true) {
            if (
              stateArr[row - k][column] === myStone ||
              stateArr[row - k][column] === 0
            ) {
              if (stateArr[row - k][column] !== myStone) {
                upSideData = [];
              }
              upSide = false;
            } else {
              if (row - k === 0) {
                upSideData = [];
              } else {
                upSideData.push([row - k, column]);
              }
            }
          }
          if (row + k <= 7 && column - k >= 0 && downwardLeft === true) {
            if (
              stateArr[row + k][column - k] === myStone ||
              stateArr[row + k][column - k] === 0
            ) {
              if (stateArr[row + k][column - k] !== myStone) {
                downwardLeftData = [];
              }
              downwardLeft = false;
            } else {
              if (row + k === 7 || column - k === 0) {
                downwardLeftData = [];
              } else {
                downwardLeftData.push([row + k, column - k]);
              }
            }
          }

          if (row - k >= 0 && column + k <= 7 && upwardRight === true) {
            if (
              stateArr[row - k][column + k] === myStone ||
              stateArr[row - k][column + k] === 0
            ) {
              if (stateArr[row - k][column + k] !== myStone) {
                upwardRightData = [];
              }
              upwardRight = false;
            } else {
              if (row - k === 0 || column + k === 7) {
                upwardRightData = [];
              } else {
                upwardRightData.push([row - k, column + k]);
              }
            }
          }
          if (row + k <= 7 && column + k <= 7 && downwardRight === true) {
            if (
              stateArr[row + k][column + k] === myStone ||
              stateArr[row + k][column + k] === 0
            ) {
              if (stateArr[row + k][column + k] !== myStone) {
                downwardRightData = [];
              }
              downwardRight = false;
            } else {
              if (row + k === 7 || column + k === 7) {
                downwardRightData = [];
              } else {
                downwardRightData.push([row + k, column + k]);
              }
            }
          }
          if (row - k >= 0 && column - k >= 0 && upwardLeft === true) {
            if (
              stateArr[row - k][column - k] === myStone ||
              stateArr[row - k][column - k] === 0
            ) {
              if (stateArr[row - k][column - k] !== myStone) {
                upwardLeftData = [];
              }
              upwardLeft = false;
            } else {
              if (row - k === 0 || column - k === 0) {
                upwardLeftData = [];
              } else {
                upwardLeftData.push([row - k, column - k]);
              }
            }
          }
        }
      }
      setData[row][column] = setData[row][column].concat(
        rightSideData,
        leftSideData,
        upSideData,
        downSideData,
        upwardRightData,
        upwardLeftData,
        downwardRightData,
        downwardLeftData
      );
    }
  }
  return setData;
};

export default getCanBePlaced;
