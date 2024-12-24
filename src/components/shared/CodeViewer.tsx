"use client";

import Link from "next/link";
import { CodeEditor } from "./Editor";
import { ClipboardCheck, Copy, Sparkles } from "lucide-react";
import useSound from "use-sound";
import { useState } from "react";
import { usePlayClick } from "@/hooks/usePlayClick";
import { RainbowButton } from "../ui/RainbowButton";
import Header from "../ui/Header";
import Countdown from "./Countdown";

const copiedSound = "/assets/sounds/copied.mp3";

export const CodeViewer = ({ code }: { code: any }) => {
  const [copied, setCopied] = useState(false);
  const [playCopied] = useSound(copiedSound);
  const playClick = usePlayClick();

  console.log(code);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code?.code);
    playCopied();
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="h-screen relative">
      <Header>
        <div className="flex items-center gap-2 sm:gap-4 justify-between flex-col lg:flex-row justify-self-end w-full">
          <div className="border border-slate-700 bg-slate-950/30 py-1.5 px-4 flex flex-1 justify-center items-center gap-2 w-full text-center rounded-full">
            <input
              type="text"
              value={
                code?.title || "Untitled Clip | Explore and Share Code Snippets"
              }
              placeholder="Enter Code Title"
              readOnly
              className="w-full outline-none bg-transparent text-center border-none p-0 line-clamp-1"
            />
          </div>
          <div className="flex items-center gap-4">
            <RainbowButton
              onClick={handleCopyCode}
              className="flex items-center gap-2"
              variant="light"
            >
              {copied ? "Code Copied!" : "Copy Code"}{" "}
              {copied ? <ClipboardCheck size={16} /> : <Copy size={16} />}
            </RainbowButton>
            <Link href="/" onClick={() => playClick()}>
              <RainbowButton
                disabled={!code}
                className="flex items-center gap-2"
              >
                Create New <Sparkles size={16} />
              </RainbowButton>
            </Link>
          </div>
        </div>
      </Header>
      <CodeEditor
        className="pt-4"
        language={code?.language}
        value={code?.code}
      />
      <Countdown expiresAt={code?.expiresAt} />
    </div>
  );
};
