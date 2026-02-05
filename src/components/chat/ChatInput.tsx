"use client";

import { useState, useRef } from "react";
import { Send, Loader2 } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim() || disabled) return;
    onSend(message.trim());
    setMessage("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }

  function handleInput() {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 160) + "px";
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-end gap-2 bg-white border border-navy-200 rounded-xl p-2 shadow-sm focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-transparent">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          disabled={disabled}
          placeholder="Ask about your taxes, expenses, or anything business-related..."
          rows={1}
          className="flex-1 resize-none text-sm text-navy-800 placeholder:text-navy-400 bg-transparent border-0 focus:outline-none py-1.5 px-2 max-h-40"
        />
        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className="flex-shrink-0 w-9 h-9 bg-teal-500 hover:bg-teal-600 disabled:bg-navy-200 rounded-lg flex items-center justify-center transition-colors"
        >
          {disabled ? (
            <Loader2 className="w-4 h-4 text-navy-400 animate-spin" />
          ) : (
            <Send className="w-4 h-4 text-white" />
          )}
        </button>
      </div>
      <p className="text-xs text-navy-400 mt-2 text-center">
        AI-powered guidance. Not regulated financial advice. Always verify
        important decisions with a qualified accountant.
      </p>
    </form>
  );
}
