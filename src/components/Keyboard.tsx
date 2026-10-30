const KEYS = [
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
  "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
];

type KeyboardProps = {
  disabled?: boolean;
  activeLetters: string[];
  inactiveLetters: string[];
  addGuessedLetter: (letter: string) => void;
};

export default function Keyboard({
  disabled = false,
  activeLetters,
  inactiveLetters,
  addGuessedLetter,
}: KeyboardProps) {
  return (
    <div className="grid grid-cols-9 gap-2 max-w-[800px] w-full">
      {KEYS.map((key) => {
        const isActive = activeLetters.includes(key);
        const isInactive = inactiveLetters.includes(key);

        return (
          <button
            key={key}
            disabled={isInactive || isActive || disabled}
            onClick={() => addGuessedLetter(key)}
            className={`
              p-3 text-2xl font-bold uppercase border-2 border-black rounded transition-all cursor-pointer
              ${isActive ? "bg-sky-500 text-white" : ""}
              ${isInactive ? "opacity-30 cursor-not-allowed" : ""}
              ${!isActive && !isInactive ? "hover:bg-sky-200" : ""}
            `}
          >
            {key}
          </button>
        );
      })}
    </div>
  );
}