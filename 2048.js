function getInitialArray() {
  const arr = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  let firstNumber = getRandomNumber();
  arr[getRandomPosition()][getRandomPosition()] = firstNumber;

  insertRandomNumberAtEmptySpace(arr);
  return arr;
}

let startX;
let startY;
let endX;
let endY;
const arr = getInitialArray();

function insertRandomNumberAtEmptySpace(arr) {
  do {
    const randomX = getRandomPosition();
    const randomY = getRandomPosition();
    if (arr[randomX][randomY] === 0) {
      arr[randomX][randomY] = getRandomNumber();
      break;
    }
  } while (true);
}

function getRandomNumber() {
  return (Math.floor(Math.random() * 2) + 1) * 2;
}
function getRandomPosition() {
  return Math.floor(Math.random() * 4);
}

function printArray(arr) {
  for (let i = 0; i < 4; i++) {
    console.log(`${arr[i][0]}  ${arr[i][1]}  ${arr[i][2]}  ${arr[i][3]}`);
  }
  console.log("   ");
}

function refreshArrayOnPage(arr) {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const element = document.getElementById(`${i},${j}`);
      element.innerHTML = arr[i][j] ? arr[i][j] : "";
      switch (arr[i][j]) {
        case 0:
          element.style = "background-color:#CDC1B4";
          break;
        case 2:
          element.style = "background-color:#eee4da; color: #776E65;";
          break;
        case 4:
          element.style = "background-color:#eee1c9; color: #776E65;";
          break;
        case 8:
          element.style = "background-color:#f3b27a; color: #f9f6f2;";
          break;
        case 16:
          element.style = "background-color:#f69664; color: #f9f6f2;";
          break;
        case 32:
          element.style = "background-color:#f77c5f; color: #f9f6f2;";
          break;
        case 64:
          element.style = "background-color:#f75f3b; color: #f9f6f2;";
          break;
        case 128:
          element.style = "background-color:#edd073; color: #f9f6f2;";
          break;
        case 256:
          element.style = "background-color:#edcc62; color: #f9f6f2;";
          break;
        case 512:
          element.style = "background-color:#edc950; color: #f9f6f2;";
          break;
        case 1024:
          element.style = "background-color:#edc53f; color: #f9f6f2;";
          break;
        case 2048:
          element.style = "background-color:#edc53f; color: #f9f6f2;";
          break;
        case 4096:
          element.style = "background-color:#eee4da; color: #f9f6f2;";
          break;
        case 8192:
          element.style = "background-color:#eee4da; color: #f9f6f2;";
          break;
        default:
          element.style = "background-color:#eee4da; color: #f9f6f2;";
          break;
      }
    }
  }
}

function swipeUp(arr) {
  for (let col = 0; col < 4; col++) {
    let nonZeroItems = [];
    for (let row = 0; row < 4; row++) {
      if (arr[row][col] !== 0) {
        nonZeroItems.push(arr[row][col]);
        arr[row][col] = 0;
      }
    }
    //move non zero items up
    for (let i = 0; i < nonZeroItems.length; i++) {
      arr[i][col] = nonZeroItems[i];
    }

    //add equal numbers
    for (let i = 0; i < 3; i++) {
      if (arr[i][col] === arr[i + 1][col] && arr[i][col] !== 0) {
        // console.log("match", i, col);
        arr[i][col] = arr[i][col] * 2;
        setTimeout(() => {
          document.getElementById(`${i},${col}`).style.transform = "scale(1.2)";
          setTimeout(() => {
            document.getElementById(`${i},${col}`).style.transform = "";
          }, 100);
        }, 100);
        arr[i + 1][col] = 0;
        //move rest of the list up
        for (let j = i + 1; j < 3; j++) {
          const temp = arr[j + 1][col];
          arr[j + 1][col] = arr[j][col];
          arr[j][col] = temp;
        }
      }
    }
  }
}

function swipeDown(arr) {
  for (let col = 0; col < 4; col++) {
    let nonZeroItems = [];
    for (let row = 0; row < 4; row++) {
      if (arr[row][col] !== 0) {
        nonZeroItems.unshift(arr[row][col]);
        arr[row][col] = 0;
      }
    }
    //move non zero items down
    for (let i = 0; i < nonZeroItems.length; i++) {
      arr[3 - i][col] = nonZeroItems[i];
    }

    //add equal numbers
    for (let i = 3; i > 0; i--) {
      if (arr[i][col] === arr[i - 1][col] && arr[i][col] !== 0) {
        // console.log("match", i, col);
        arr[i][col] = arr[i][col] * 2;
        setTimeout(() => {
          document.getElementById(`${i},${col}`).style.transform = "scale(1.2)";
          setTimeout(() => {
            document.getElementById(`${i},${col}`).style.transform = "";
          }, 100);
        }, 100);
        arr[i - 1][col] = 0;
        //move rest of the list down
        for (let j = i - 1; j > 0; j--) {
          const temp = arr[j - 1][col];
          arr[j - 1][col] = arr[j][col];
          arr[j][col] = temp;
        }
      }
    }
  }
}

function swipeLeft(arr) {
  for (let row = 0; row < 4; row++) {
    let nonZeroItems = [];
    for (let col = 0; col < 4; col++) {
      if (arr[row][col] !== 0) {
        nonZeroItems.push(arr[row][col]);
        arr[row][col] = 0;
      }
    }
    //move items to left
    for (let i = 0; i < nonZeroItems.length; i++) {
      arr[row][i] = nonZeroItems[i];
    }

    //add equal numbers
    for (let i = 0; i < 3; i++) {
      if (arr[row][i] === arr[row][i + 1] && arr[row][i] !== 0) {
        // console.log("match", row, i);
        arr[row][i] = arr[row][i] * 2;
        setTimeout(() => {
          document.getElementById(`${row},${i}`).style.transform = "scale(1.2)";
          setTimeout(() => {
            document.getElementById(`${row},${i}`).style.transform = "";
          }, 100);
        }, 100);
        arr[row][i + 1] = 0;
        //move rest of the list left
        for (let j = i + 1; j < 3; j++) {
          const temp = arr[row][j + 1];
          arr[row][j + 1] = arr[row][j];
          arr[row][j] = temp;
        }
      }
    }
  }
}

function swipeRight(arr) {
  for (let row = 0; row < 4; row++) {
    let nonZeroItems = [];
    for (let col = 0; col < 4; col++) {
      if (arr[row][col] !== 0) {
        nonZeroItems.unshift(arr[row][col]);
        arr[row][col] = 0;
      }
    }
    //move non zero items to right
    for (let i = 0; i < nonZeroItems.length; i++) {
      arr[row][3 - i] = nonZeroItems[i];
    }

    //add equal numbers
    for (let i = 3; i > 0; i--) {
      if (arr[row][i] === arr[row][i - 1] && arr[row][i] !== 0) {
        // console.log("match", row, i);
        arr[row][i] = arr[row][i] * 2;
        setTimeout(() => {
          document.getElementById(`${row},${i}`).style.transform = "scale(1.2)";
          setTimeout(() => {
            document.getElementById(`${row},${i}`).style.transform = "";
          }, 100);
        }, 100);
        arr[row][i - 1] = 0;
        //move rest of the list right
        for (let j = i - 1; j > 0; j--) {
          const temp = arr[row][j - 1];
          arr[row][j - 1] = arr[row][j];
          arr[row][j] = temp;
        }
      }
    }
  }
}
function compareArrays(arr1, arr2) {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (arr1[i][j] !== arr2[i][j]) {
        return false;
      }
    }
  }
  return true;
}

function cloneArray(arr) {
  const arr2 = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      arr2[i][j] = arr[i][j];
    }
  }
  return arr2;
}

function touchDown($event) {
    startX = $event.changedTouches[0].screenX;
  startY = $event.changedTouches[0].screenY;
}
function touchUp($event) {
  endX = $event.changedTouches[0].screenX;
  endY = $event.changedTouches[0].screenY;
  const arrCopy = cloneArray(arr);
  console.log(startX, startY, endX, endY);
  console.log(startX - endX, startY - endY);
  let xdiff = startX - endX;
  let ydiff = startY - endY;
  if(xdiff<0){
    xdiff = xdiff * -1
  }
  if(ydiff<0){
    ydiff = ydiff * -1
  }
  if (xdiff < ydiff) {
    if (endY > startY) {
      console.log("swiping down");
      swipeDown(arr);
    } else {
      console.log("swiping up");
      swipeUp(arr);
    }
  } else if (xdiff > ydiff) {
    if (endX > startX) {
      console.log("swiping right");
      swipeRight(arr);
    } else {
      console.log("swiping left");
      swipeLeft(arr);
    }
  }
  if (!compareArrays(arrCopy, arr)) {
    insertRandomNumberAtEmptySpace(arr);
    // insertRandomNumberAtEmptySpace(arr);
    refreshArrayOnPage(arr);
  }
}
