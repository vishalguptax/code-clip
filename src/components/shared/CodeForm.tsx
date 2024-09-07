"use client";

import axios from "axios";
import flourite from "flourite";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CodeEditor } from "./Editor";
import { NeonGradientCard } from "../ui/NeonCard";
import { Button } from "../ui/button";
import { Sparkles } from "lucide-react";
import { cn } from "@/utils/cn";
import useKeyboardShortcut from "@/hooks/useKeyboardShortcut";
import useSound from "use-sound";
import { usePlayClick } from "@/hooks/usePlayClick";

const createdSound = "/assets/sounds/created.mp3";

const durationOptions = [
  {
    label: "10 Minutes",
    value: 600,
  },
  {
    label: "1 Hour",
    value: 3600,
  },
  {
    label: "1 Day",
    value: 86400,
  },
  {
    label: "1 Week",
    value: 604800,
  },
];

export const CodeForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lang, setLang] = useState("javascript");
  const [code, setCode] = useState("");
  const [duration, setDuration] = useState<number>(3600);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [playCreated] = useSound(createdSound);
  const playClick = usePlayClick();

  const router = useRouter();

  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(parseInt(event.target.value, 10));
    playClick();
  };

  const handleValueChange = (value: any) => {
    const lang = flourite(value, {
      noUnknown: true,
      shiki: true,
    }).language;

    setLang(lang || "javascript");

    setCode(value.trim());
  };

  const handleSubmit = async () => {
    if (!code) {
      return;
    }

    setIsLoading(true);

    const payload = {
      title,
      code,
      language: lang,
      author,
      expiresAt: new Date(Date.now() + duration * 1000),
    };
    try {
      const { data } = await axios.post("/api/codes", payload);
      router.push(`/${data.id}`);
      playCreated();
      navigator.clipboard.writeText(`${window.location.origin}/${data.id}`);
    } catch (error) {
      console.log(error, "code-post-form.tsx", "25");
    } finally {
      setIsLoading(false);
    }
  };

  useKeyboardShortcut("s", handleSubmit, "ctrl");

  return (
    <div className="h-screen relative">
      <CodeEditor onChange={handleValueChange} language={lang} />
      {!code && (
        <h4 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl italic text-center uppercase opacity-25 font-bold w-full select-none">
          Paste or write your code
        </h4>
      )}
      <NeonGradientCard className="absolute top-6 right-10 w-max h-max max-w-xs lg:max-w-max">
        <div className="space-y-4">
          {/* <div className="flex space-x-4">
            <input
              placeholder="Code Title"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              placeholder="Your Name"
              type="text"
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div> */}
          <div className="flex items-center gap-4 flex-wrap">
            <p>Duration</p>
            {durationOptions.map((option) => (
              <label
                key={option.value}
                className={cn(
                  duration === option.value
                    ? "border-blue-500 bg-black"
                    : "border-slate-500",
                  "cursor-pointer border px-3 py-1 rounded text-sm hover:border-blue-500 transition"
                )}
              >
                <input
                  type="radio"
                  className="hidden"
                  id={option.value.toString()}
                  name="duration"
                  value={option.value.toString()}
                  checked={duration === option.value}
                  onChange={handleDurationChange}
                />
                {option.label}
              </label>
            ))}
          </div>

          <div className="justify-between flex items-center flex-wrap">
            <p className="text-xs">
              Made with ❤️ by{" "}
              <a
                href="https://linkedin.com/in/vishalgupta26"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                Vishal
              </a>
            </p>
            <Button
              disabled={!code}
              onClick={handleSubmit}
              size="large"
              icon={<Sparkles size={16} />}
              loading={isLoading}
            >
              {isLoading ? "Creating..." : "Create Clip"}
            </Button>
          </div>
        </div>
      </NeonGradientCard>
    </div>
  );
};
