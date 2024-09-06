"use client";

import Link from "next/link";
import { CodeEditor } from "./Editor";
import { Button } from "./ui/button";
import { NeonGradientCard } from "./ui/NeonCard";
import { Copy, Sparkles } from "lucide-react";

export const CodeViewer = ({ code }: { code: any }) => {
  const handleCopyCode = () => {
    navigator.clipboard.writeText(code?.code);
  };

  return (
    <div className="h-screen relative">
      <CodeEditor height="100vh" language={code?.language} value={code?.code} />
      <NeonGradientCard className="absolute top-6 right-10 w-max h-max">
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
            <Button onClick={handleCopyCode} icon={<Copy size={16} />}>
              Copy code
            </Button>
            <Link href={`/`}>
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
