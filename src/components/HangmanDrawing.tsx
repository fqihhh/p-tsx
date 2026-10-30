const HEAD = (
  <div className="rounded-full border-4 border-black w-12 h-12 absolute top-12 -right-5" key="head" />
);
const BODY = (
  <div className="w-2 h-24 bg-black absolute top-24 right-0" key="body" />
);
const RIGHT_ARM = (
  <div className="w-20 h-2 bg-black absolute top-32 -right-20 -rotate-30 origin-bottom-left" key="right-arm" />
);
const LEFT_ARM = (
  <div className="w-20 h-2 bg-black absolute top-32 right-2 rotate-30 origin-bottom-right" key="left-arm" />
);
const RIGHT_LEG = (
  <div className="w-20 h-2 bg-black absolute top-44 -right-18 rotate-60 origin-top-left" key="right-leg" />
);
const LEFT_LEG = (
  <div className="w-20 h-2 bg-black absolute top-44 right-0 -rotate-60 origin-top-right" key="left-leg" />
);

// Urutan tubuh yang muncul setiap kali tebakan salah (max 6)
const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG];

type HangmanDrawingProps = {
  numberOfGuesses: number;
};

export default function HangmanDrawing({ numberOfGuesses }: HangmanDrawingProps) {
  return (
    <section className="relative">
      {/* Tampilkan bagian tubuh sesuai jumlah salah */}
      {BODY_PARTS.slice(0, numberOfGuesses)}

      {/* Tiang & tali */}
      <div className="bg-black w-2 h-12 absolute right-0" />
      <div className="bg-black w-40 h-2 ml-32" />
      <div className="bg-black w-2 h-80 ml-32" />
      <div className="bg-black w-64 h-2" />
    </section>
  );
}