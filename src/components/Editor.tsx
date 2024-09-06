"use client";

import { Editor, loader, EditorProps } from "@monaco-editor/react";
import { useEffect } from "react";
import gitHubDark from "@/constants/theme.json";

export const CodeEditor = (props: EditorProps) => {
  useEffect(() => {
    loader.init().then((monaco: any) => {
      monaco.editor.defineTheme("gitHubDark", gitHubDark as any);
      monaco.editor.model?._languageIdentifier?.language;
    });
  }, []);

  return (
    <Editor
      theme="gitHubDark"
      options={{
        fontSize: 16,
        fontLigatures: true,
        // automaticLayout: true,
        minimap: {
          enabled: false,
        },
      }}
      {...props}
    />
  );
};
