"use client"
import GameBoard from "@/components/GameBoard";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <hr />
        <GameBoard />
      </div>
    </>
  );
}
