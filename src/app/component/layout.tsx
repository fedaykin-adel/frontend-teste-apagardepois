"use client";
import "@/app/modules/index";

import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  useEffect(() => {}, []);

  return <>{children}</>;
}
