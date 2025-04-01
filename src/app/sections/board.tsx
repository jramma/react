import { useState } from "react";
import { Square } from "@/app/components/square";

export default function Board({ xIsNext, squares, onPlay }: any) {
  function handleClick(i: number) {
    const nextSquares = squares.slice();

    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares, i);
  }

  const winner = calculateWinner(squares);
  const winnerIndexes = winner ? winner[1] : []; // ⬅️ índices ganadores

  let status;

  if (winner) {
    status = "Ganador: " + winner[0];
  } else if (!winner && squares.every(Boolean)) {
    status = "Empate";
  } else {
    status = "Siguiente jugador: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="flex flex-col gap-20 pb-16">
      <div className="status text-3xl self-start">{status}</div>
      <div className="grid grid-cols-3 gap-2 ">
        {[0, 1, 2].map((col) => (
          <div key={col} className="flex flex-col gap-2">
            {[0, 1, 2].map((row) => {
              const index = col * 3 + row;
              const isWinner = winnerIndexes.includes(index); // ⬅️ check
              return (
                <Square
                  key={index}
                  value={squares[index]}
                  onSquareClick={() => handleClick(index)}
                  isWinner={isWinner} // ⬅️ prop para destacar
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function calculateWinner(squares: any): [string, number[]] | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], [a, b, c]];
    }
  }
  return null;
}
