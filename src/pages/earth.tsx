import * as React from "react";
import { cn } from "../lib/utils";
import { EarthAnimation } from "@/components/earthAnimation";

export default function Index() {
  return (
    <div className={cn("w-full min-h-screen md:h-screen relative")}>
      <div
        className={cn(
          "mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-12 lg:py-0"
        )}
      >
        <EarthAnimation />
      </div>
    </div>
  );
}
