"use client";

import Link from "next/link";
import { CodeEditor } from "./Editor";
import { Button } from "../ui/button";
import { NeonGradientCard } from "../ui/NeonCard";
import { ClipboardCheck, Copy, Sparkles } from "lucide-react";
import useSound from "use-sound";
import { useState } from "react";
import useKeyboardShortcut from "@/hooks/useKeyboardShortcut";
import { usePlayClick } from "@/hooks/usePlayClick";

const copiedSound = "/assets/sounds/copied.mp3";

export const CodeViewer = ({ code }: { code: any }) => {
  const [copied, setCopied] = useState(false);

  const [playCopied] = useSound(copiedSound);

  const playClick = usePlayClick();

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code?.code);
    playCopied();
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  useKeyboardShortcut("c", handleCopyCode, "ctrl");

  return (
    <div className="h-screen relative">
      <CodeEditor height="100vh" language={code?.language} value={code?.code} />
      <NeonGradientCard className="absolute top-6 right-10 w-max h-max max-w-xs lg:max-w-max">
        <div className={(code?.title || code?.author) && "space-y-4"}>
          <div className="flex items-center gap-4">
            {code?.title && <h1>{code?.title}</h1>}
            {code?.author && (
              <p className="text-xs">
                <i>by {code?.author}</i>
              </p>
            )}
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={handleCopyCode}
              className="w-[164px] flex justify-center"
              icon={copied ? <ClipboardCheck size={16} /> : <Copy size={16} />}
            >
              {copied ? "Code Copied!" : "Copy Code"}
            </Button>
            <Link href={`/`} onClick={() => playClick()}>
              <Button
                disabled={!code}
                size="large"
                icon={<Sparkles size={16} />}
              >
                Create New
              </Button>
            </Link>
          </div>
        </div>
      </NeonGradientCard>
    </div>
  );
};
