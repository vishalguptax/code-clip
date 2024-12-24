import React from "react";
import { NeonGradientCard } from "./NeonCard";
import Logo from "../shared/Logo";

export default function Header({ children }: { children: React.ReactNode }) {
  return (
    <NeonGradientCard className="w-full h-max" borderRadius={0} borderSize={1}>
      <div className="flex items-center gap-2 sm:gap-4 justify-between flex-col lg:flex-row">
        <Logo />
        <div className="flex-1">{children}</div>
      </div>
    </NeonGradientCard>
  );
}
