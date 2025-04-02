import Board from "@/app/components/board";
import { useState } from "react";

export default function Game() {
  const [history, setHistory] = useState<any[]>([
    { board: Array(9).fill(null), position: null },
  ]);

  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove].board;

  const [isAscending, setIsAscending] = useState(true); // Nuevo estado para el orden

  const xIsNext = currentMove % 2 === 0;
  console.log(currentSquares);
  function handlePlay(nextSquares: any, clickedIndex: number) {
    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      {
        board: nextSquares,
        position: clickedIndex,
      },
    ];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: any) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((step, move) => {
    const description =
      move > 0 ? "Ir al movimiento #" + move : "Ir al inicio del juego";
    let positionDescription = "";

    if (step.position !== null) {
      const col = Math.floor(step.position / 3);
      const row = step.position % 3;
      positionDescription = ` (${col + 1}, ${row + 1})`;
    }

    return (
      <li key={move} className="border-2 p-2 rounded-md px-10">
        <button onClick={() => jumpTo(move)}>
          {description}
          {positionDescription}
        </button>
      </li>
    );
  });

  const orderedMoves = isAscending ? moves : [...moves].reverse(); // Orden dinámico

  return (
    <div className="flex gap-6">
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      <div className="flex flex-col gap-6">
        <h2 className="text-3xl">Historial de movimientos</h2>
        <p className="text-2xl">Jugadas: {currentMove}</p>
        <div>
          <button
            className="mb-4 border-2 px-4 py-2 rounded bg-white/20"
            onClick={() => setIsAscending(!isAscending)}
          >
            Ordenar {isAscending ? "descendente" : "ascendente"}
          </button>
          <ol className="flex flex-col gap-4 max-h-72 overflow-auto pr-2">
            {orderedMoves}
          </ol>
        </div>
      </div>
    </div>
  );
}
