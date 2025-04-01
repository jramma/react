

export function MyButton({ count, onClick }: any) {
    return (
      <button
        className="border-2 border-white solid p-2 rounded-2xl"
        onClick={onClick}
      >
        Hiciste clic {count} veces
      </button>
    );
  }
  
