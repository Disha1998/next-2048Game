import { useState, useEffect } from 'react';

const GameBoard = () => {
  const [board, setBoard] = useState(null);  // Start with null or undefined
  const [score, setScore] = useState(0);

  // Initialization on client side only
  useEffect(() => {
    if (typeof window !== 'undefined' && !board) {  // Ensure it runs only once
      setBoard(createInitialBoard());
    }
  }, []);

  // Setup key listener once and clean up
  useEffect(() => {
    const handleKeyUp = (e) => {
      if (!board) return;  // Don't run if board hasn't been initialized
      if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) return;

      const newBoard = moveTiles(board, e.key);
      const newScore = calculateScore(newBoard, score);

      setBoard(newBoard);
      setScore(newScore);
    };

    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [board, score]);

    // Ensure board is not null before rendering
    if (!board) {
      return <div>Loading game...</div>;
    }

  function createInitialBoard() {
    let newBoard = Array(4).fill().map(() => Array(4).fill(0));
    return addRandomTiles(addRandomTiles(newBoard));
  }

  function addRandomTiles(bd) {
    let added = false;
    let newBoard = [...bd].map(row => [...row]);
    while (!added) {
      let rand1 = Math.floor(Math.random() * 4);
      let rand2 = Math.floor(Math.random() * 4);
      if (newBoard[rand1][rand2] === 0) {
        newBoard[rand1][rand2] = Math.random() > 0.5 ? 2 : 4;
        added = true;
      }
    }
    return newBoard;
  }

  function moveTiles(bd, direction) {
    let newBoard = rotateBoard(bd, direction);
    for (let i = 0; i < newBoard.length; i++) {
      newBoard[i] = compressRow(newBoard[i]);
      newBoard[i] = mergeRow(newBoard[i]);
      newBoard[i] = compressRow(newBoard[i]);
    }
    newBoard = rotateBoardBack(newBoard, direction);
    newBoard = addRandomTiles(newBoard);
    return newBoard;
  }

  function compressRow(row) {
    let newRow = row.filter(val => val);
    while (newRow.length < 4) {
      newRow.push(0);
    }
    return newRow;
  }

  function mergeRow(row) {
    for (let i = 0; i < row.length - 1; i++) {
      if (row[i] === row[i + 1]) {
        row[i] *= 2;
        row[i + 1] = 0;
      }
    }
    return row;
  }

  function rotateBoard(board, direction) {
    let newBoard = [];
    switch (direction) {
      case "ArrowUp":
        for (let col = 0; col < 4; col++) {
          newBoard.push([board[0][col], board[1][col], board[2][col], board[3][col]]);
        }
        break;
      case "ArrowDown":
        for (let col = 0; col < 4; col++) {
          newBoard.push([board[3][col], board[2][col], board[1][col], board[0][col]]);
        }
        break;
      case "ArrowLeft":
        newBoard = [...board];
        break;
      case "ArrowRight":
        newBoard = board.map(row => [...row].reverse());
        break;
      default:
        newBoard = [...board];
    }
    return newBoard;
  }

  function rotateBoardBack(board, direction) {
    let newBoard = [];
    switch (direction) {
      case "ArrowUp":
        for (let col = 0; col < 4; col++) {
          newBoard.push([board[0][col], board[1][col], board[2][col], board[3][col]]);
        }
        break;
      case "ArrowDown":
        for (let col = 3; col >= 0; col--) {
          newBoard.push([board[0][col], board[1][col], board[2][col], board[3][col]]);
        }
        break;
      case "ArrowLeft":
        newBoard = [...board];
        break;
      case "ArrowRight":
        newBoard = board.map(row => [...row].reverse());
        break;
      default:
        newBoard = [...board];
    }
    return newBoard;
  }

  function calculateScore(newBoard, currentScore) {
    let newScore = currentScore;
    for (let row of newBoard) {
      for (let num of row) {
        if (num > currentScore) {
          newScore += num;
        }
      }
    }
    return newScore;
  }

  // In GameBoard component

return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
    <h1 className="text-4xl font-bold text-center mb-4">2048</h1>
    <div className="bg-gray-300 p-1 w-80 h-80 grid grid-cols-4 gap-2">
      {board.flat().map((num, index) => (
        <div
          key={index}
          className={`w-full h-full flex items-center justify-center rounded shadow-md ${getColor(num)}`}
        >
          {num > 0 ? num : ''}
        </div>
      ))}
    </div>
    <div className="mt-4">
      <h2 className="text-xl">Score: {score}</h2>
    </div>
  </div>
);

function getColor(num) {
  switch (num) {
    case 2: return "bg-yellow-100 text-yellow-800";
    case 4: return "bg-yellow-200 text-yellow-800";
    case 8: return "bg-orange-300 text-white";
    case 16: return "bg-orange-400 text-white";
    case 32: return "bg-orange-500 text-white";
    case 64: return "bg-red-500 text-white";
    case 128: return "bg-red-600 text-white";
    case 256: return "bg-red-700 text-white";
    case 512: return "bg-purple-500 text-white";
    case 1024: return "bg-purple-600 text-white";
    case 2048: return "bg-purple-700 text-white";
    default: return "bg-gray-200";
  }
}

};

export default GameBoard;
