"use client";

import axios from "axios";
import flourite from "flourite";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CodeEditor } from "./Editor";
import { Sparkles } from "lucide-react";
import { cn } from "@/utils/cn";
import useKeyboardShortcut from "@/hooks/useKeyboardShortcut";
import useSound from "use-sound";
import { usePlayClick } from "@/hooks/usePlayClick";
import { RainbowButton } from "../ui/RainbowButton";
import Header from "../ui/Header";
import { toast } from "sonner";
import EditorPlaceholder from "./EditorPlaceholder";

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
  {
    label: "1 Month",
    value: 2592000,
  },
  {
    label: "1 Year",
    value: 31536000,
  },
];

export const CodeForm = ({}) => {
  const searchParams = useSearchParams();
  const isError = searchParams.get("e") ?? null;
  const [isLoading, setIsLoading] = useState(false);
  const [lang, setLang] = useState("javascript");
  const [code, setCode] = useState("");
  const [duration, setDuration] = useState<number>(3600);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [playCreated] = useSound(createdSound);
  const playClick = usePlayClick();
  const router = useRouter();
  useEffect(() => {
    if (isError === "404") {
      router.replace("/");
      toast.error("Oops! Code not found 🥲 ", {
        description:
          "The code clip you are looking for is either expired or doesn't exist!",
      });
    }
  }, [isError, router]);

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
    if (!code || isLoading) {
      toast.error("Please enter some code before creating a clip! 🥲", {
        description: "Code cannot be empty!",
      });
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
      const { data } = await axios.post("/api/codes", payload, {
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
        },
      });
      router.push(`/${data.id}`);
      playCreated();
      navigator.clipboard.writeText(`${window.location.origin}/${data.id}`);
      toast.success("Clip Created! 🤩", {
        description: "Code link copied to your clipboard 🔗",
      });
    } catch (error) {
      console.log(error, "code-post-form.tsx", "25");
      toast.error("Oops! Something went wrong 😥", {
        description: "Please try creating again after sometime!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useKeyboardShortcut("s", handleSubmit, "ctrl");

  return (
    <div className="h-screen relative">
      <Header>
        <div className="flex items-center gap-2 sm:gap-4 justify-between flex-col lg:flex-row justify-self-end w-full">
          <div className="border border-slate-700 bg-slate-950/30 py-1.5 px-4 flex flex-1 justify-center items-center gap-2 w-full text-center rounded-full">
            <input
              type="text"
              value={title}
              placeholder="Enter Code Title"
              onChange={(e) => setTitle(e.target.value)}
              className="w-full outline-none bg-transparent text-center border-none p-0 line-clamp-1"
            />
          </div>

          <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-center">
            <div className="flex items-center sm:gap-2 gap-1 flex-wrap justify-center">
              {durationOptions.map((option) => (
                <label
                  role="button"
                  key={option.value}
                  className={cn(
                    duration === option.value
                      ? "border-blue-500 bg-black"
                      : "border-slate-500",
                    "cursor-pointer border px-2.5 py-1 rounded text-xs hover:border-blue-500 transition"
                  )}
                >
                  <input
                    type="radio"
                    className="hidden"
                    id={option.value.toString()}
                    name="duration"
                    value={option.value.toString()}
                    checked={duration === option.value}
                    disabled={isLoading}
                    onChange={handleDurationChange}
                  />
                  {option.label}
                </label>
              ))}
            </div>

            <RainbowButton
              onClick={handleSubmit}
              className="flex items-center gap-2"
            >
              {isLoading ? "Creating..." : "Create Clip"}{" "}
              <Sparkles size={14} className={isLoading ? "animate-spin" : ""} />
            </RainbowButton>
          </div>
        </div>
      </Header>
      <CodeEditor
        className="pt-4"
        onChange={handleValueChange}
        language={lang}
      />
      {!code && <EditorPlaceholder />}
    </div>
  );
};
