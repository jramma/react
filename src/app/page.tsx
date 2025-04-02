"use client";

import { MyButton } from "@/app/components/btn";
import { useState } from "react";
import Game from "./components/game";
import TaskApp from "./components/todolist";
export default function Home() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div className="flex flex-col min-h-screen items-center  ">
      <main className="flex flex-col  gap-10 items-center justify-center flex-grow pb-80 pt-40" >
        <MyButton count={count} onClick={handleClick} />
        <MyButton count={count} onClick={handleClick} />
        <div className="flex w-full h-[1px] bg-white" ></div>
        <Game />
        <div className="flex w-full h-[1px] bg-white" ></div>
        <TaskApp />
      </main>
    </div>
  );
}
