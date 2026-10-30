type HangmanWordProps = {
  guessedLetters: string[];
  wordToGuess: string;
  reveal?: boolean;
  isWinner?: boolean;
  isLoser?: boolean;
};

export default function HangmanWord({
  guessedLetters,
  wordToGuess,
  reveal = false,
  isWinner = false,
  isLoser = false,
}: HangmanWordProps) {
  return (
    <div className="flex gap-4 text-6xl font-bold uppercase font-mono">
      {wordToGuess.split("").map((letter, index) => {
        const isGuessed = guessedLetters.includes(letter);
        const isVisible = isGuessed || reveal;

        // Penentuan warna huruf berdasarkan kondisi menang/kalah
        let textColor = "text-black";
        if (isWinner) {
          textColor = "text-green-600"; // Menang: semua huruf jadi hijau
        } else if (isLoser && !isGuessed) {
          textColor = "text-red-600"; // Kalah: huruf yang gagal ditebak jadi merah
        }

        return (
          <span className="border-b-8 border-black pb-2" key={index}>
            <span
              className={`
                ${isVisible ? "visible" : "invisible"}
                ${textColor}
              `}
            >
              {letter}
            </span>
          </span>
        );
      })}
    </div>
  );
}