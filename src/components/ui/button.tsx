import React from "react";
import { cn } from "@/utils/cn";
import { Loader } from "lucide-react"; // Importing the Lucide loader icon

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode; // Optional icon
  size?: "small" | "medium" | "large"; // Define size prop
  loading?: boolean; // Define loading prop
}

export const Button: React.FC<ButtonProps> = ({
  className,
  children,
  icon,
  size = "medium", // Default size is medium
  loading = false, // Default loading is false
  ...props
}) => {
  // Handle size-based styles
  const sizeStyles = {
    small: "py-2 px-3", // Small size styles
    medium: "py-3 px-4", // Medium size styles
    large: "py-4 px-5", // Large size styles
  };

  const iconSize = {
    small: 12,
    medium: 16,
    large: 20,
  };

  return (
    <button
      className={cn(
        className,
        // Apply size classes dynamically
        "bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px font-semibold leading-6 inline-block"
      )}
      disabled={loading} // Disable button when loading
      {...props}
    >
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </span>
      <div
        className={cn(
          sizeStyles[size],
          "relative flex space-x-2 items-center z-10 rounded-full bg-slate-950 ring-1 ring-white/10 w-full justify-center"
        )}
      >
        <span>{children}</span>
        {(icon || loading) && (
          <span className="ml-2">
            {loading ? <Loader className="animate-spin" size={16} /> : icon}
          </span>
        )}
      </div>
      <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
    </button>
  );
};
