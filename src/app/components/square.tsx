type SquareProps = {
  value: string;
  onSquareClick: () => void;
  isWinner?: boolean;
};

export function Square({ value, onSquareClick, isWinner = false }: SquareProps) {
  return (
    <button
      onClick={onSquareClick}
      className={`w-20 h-20 text-2xl border rounded-2xl ${
        isWinner ? "bg-green-300/50 font-bold" : ""
      }`}
    >
      {value}
    </button>
  );
}
