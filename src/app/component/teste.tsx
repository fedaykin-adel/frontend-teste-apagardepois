"use client";
import { fremenRecord } from "@shaayud/sdk-web";
import { useEffect } from "react";

export default function Bla() {
  useEffect(() => {
    console.log("Chamando captura_informacoes()");
    fremenRecord({
      host: "http://localhost:4000",
      enableMouse: { maxMs: 8000, targetFps: 30, sendIntervalMs: 0 },
    });
    console.log("terminou");
  }, []);

  return <>bla</>;
}
