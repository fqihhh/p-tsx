import { useState, useEffect, useCallback } from "react";
import HangmanDrawing from "./components/HangmanDrawing";
import HangmanWord from "./components/HangmanWord";
import Keyboard from "./components/Keyboard";

const WORDS = [
  { word: "typescript", hint: "Bahasa pemrograman superset dari JavaScript" },
  { word: "javascript", hint: "Bahasa scripting utama untuk web browser" },
  { word: "react", hint: "Library UI buatan Meta untuk bikin komponen Web" },
  { word: "tailwind", hint: "Utility-first CSS framework populer" },
  { word: "frontend", hint: "Bagian tampilan aplikasi yang dilihat oleh user" },
  { word: "developer", hint: "Orang yang menulis kode dan membuat aplikasi" },
  { word: "component", hint: "Bagian terpisah dari UI yang reusable" },
  { word: "variable", hint: "Wadah untuk menyimpan nilai data dalam kode" },
];

function getRandomWordObj() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

function App() {
  const [currentWordObj, setCurrentWordObj] = useState(getRandomWordObj);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const wordToGuess = currentWordObj.word;
  const hint = currentWordObj.hint;

  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  // Penentuan Status Menang & Kalah (Maksimal 6 kesalahan)
  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  const addGuessedLetter = useCallback(
    (letter: string) => {
      // Mencegah penambahan huruf jika game sudah berakhir atau huruf sudah pernah ditebak
      if (guessedLetters.includes(letter) || isWinner || isLoser) return;
      setGuessedLetters((current) => [...current, letter]);
    },
    [guessedLetters, isWinner, isLoser]
  );

  const resetGame = useCallback(() => {
    setGuessedLetters([]);
    setCurrentWordObj(getRandomWordObj());
  }, []);

  // Event Listener Listener Keyboard Fisik
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if (key === "enter") {
        e.preventDefault();
        resetGame();
        return;
      }

      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessedLetter(key);
    };

    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [addGuessedLetter, resetGame]);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen gap-6 p-4 bg-slate-50">
      {/* Pesan Menang / Kalah */}
      <div className="text-3xl font-bold h-10 text-center">
        {isWinner && (
          <span className="text-green-600">
            You win, refresh and try again! 🎉
          </span>
        )}
        {isLoser && (
          <span className="text-red-600">
            Nice try, refresh and try again! 💀
          </span>
        )}
      </div>

      {/* Tampilan Klu / Hint */}
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 p-3 rounded shadow-sm text-center max-w-md">
        <span className="font-bold">Klu: </span>
        {hint}
      </div>

      {/* Tombol Reset / Play Again */}
      <button
        onClick={resetGame}
        className="px-6 py-2 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all cursor-pointer shadow-md"
      >
        Play Again
      </button>

      {/* Gambar Hangman */}
      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />

      {/* Tampilan Kata */}
      <HangmanWord
        reveal={isLoser}
        guessedLetters={guessedLetters}
        wordToGuess={wordToGuess}
        isWinner={isWinner}
        isLoser={isLoser}
      />

      {/* Keyboard Virtual */}
      <div className="w-full max-w-[800px]">
        <Keyboard
          disabled={isWinner || isLoser} // Kunci semua tombol jika sudah menang/kalah
          activeLetters={guessedLetters.filter((letter) =>
            wordToGuess.includes(letter)
          )}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
    </section>
  );
}

export default App;