"use client";

import Link from "next/link";
import { CodeEditor } from "./Editor";
import { ClipboardCheck, Copy, Sparkles } from "lucide-react";
import useSound from "use-sound";
import { useState } from "react";
import { usePlayClick } from "@/hooks/usePlayClick";
import { RainbowButton } from "../ui/RainbowButton";
import Header from "../ui/Header";

const copiedSound = "/assets/sounds/copied.mp3";

export const CodeViewer = ({ code }: { code: any }) => {
  const [copied, setCopied] = useState(false);
  const [playCopied] = useSound(copiedSound);
  const playClick = usePlayClick();

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code?.code);
    playCopied();
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="h-screen relative">
      <Header>
        <div className="space-y-4">
          {(code?.title || code?.author) && (
            <div className="flex items-center gap-4">
              {code?.title && (
                <h1 className="text-lg font-bold">{code.title}</h1>
              )}
              {code?.author && (
                <p className="text-xs italic">by {code.author}</p>
              )}
            </div>
          )}
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
    </div>
  );
};
