"use client";

import { Editor, loader, EditorProps } from "@monaco-editor/react";
import { useEffect } from "react";
import gitHubDark from "@/constants/theme.json";
import { defaultCodeSnippet } from "@/assets/defaultCode";

export const CodeEditor = (props: EditorProps) => {
  useEffect(() => {
    loader.init().then((monaco: any) => {
      monaco.editor.defineTheme("gitHubDark", gitHubDark as any);
      monaco.editor.model?._languageIdentifier?.language;
    });
  }, []);

  // Handler to focus the editor when it mounts
  const handleEditorDidMount = (editor: any, monaco: any) => {
    editor.focus(); // Focus the editor on mount
  };

  return (
    <Editor
      theme="gitHubDark"
      // defaultValue={defaultCodeSnippet}
      options={{
        fontSize: 16,
        fontLigatures: true,
        wordBasedSuggestionsOnlySameLanguage: true,
        wordWrap: "wordWrapColumn",
        minimap: {
          enabled: false,
        },
      }}
      onMount={handleEditorDidMount}
      {...props}
    />
  );
};
