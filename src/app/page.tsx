"use client";

import { MyButton } from "@/app/components/btn";
import { useState } from "react";
export default function Home() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-col gap-10 items-center justify-center flex-grow">
        <MyButton count={count} onClick={handleClick} />
        <MyButton count={count} onClick={handleClick} />
      </main>
    </div>
  );
}
