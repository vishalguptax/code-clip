"use client";
import React from "react";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

export function CopyrightText() {
  const pullupVariant = {
    initial: { y: 100, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05,
      },
    }),
  };

  const year = new Date().getFullYear();
  const letters = `© ${year} | Made with ❤️ by Vishal`.split("");
  let skip = 0;

  return (
    <div className="flex justify-center absolute bottom-3 right-8 text-gray-300">
      {letters.map((letter, i) => {
        if (skip > 0) {
          skip--;
          return null;
        }

        if (letters.slice(i, i + 6).join("") === "Vishal") {
          skip = 5;
          return (
            <motion.span
              key={i}
              variants={pullupVariant}
              initial="initial"
              animate="animate"
              custom={i}
              className={cn(
                "font-display text-center text-xs tracking-[-0.02em] drop-shadow-sm"
              )}
            >
              <a
                href="https://linkedin.com/in/vishalgupta26"
                target="_blank"
                rel="noreferrer"
                className="text-red-400 hover:underline-offset-1 hover:underline"
              >
                Vishal
              </a>
            </motion.span>
          );
        }

        return (
          <motion.span
            key={i}
            variants={pullupVariant}
            initial="initial"
            animate="animate"
            custom={i}
            className={cn(
              "font-display text-center text-xs tracking-[-0.02em] drop-shadow-sm"
            )}
          >
            {letter === " " ? <span>&nbsp;</span> : letter}
          </motion.span>
        );
      })}
    </div>
  );
}
