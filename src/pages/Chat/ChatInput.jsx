import { useState } from "react";

export default function ChatInput({ onSend, disabled = false }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || disabled) return;

    onSend(trimmedMessage);
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-[#F1F2F4] px-4 pt-2 pb-4">
      <div className="max-w-4xl mx-auto flex items-end gap-3">

        {/* MESSAGE INPUT */}
        <div
          className="
            flex-1
            flex
            items-center
            bg-[#F8F8F8]
            border
            border-[#D9DADF]
            rounded-2xl
            px-4
            py-2
            transition-all
            duration-200
            focus-within:border-[#FF4B2B]
            focus-within:shadow-[0_0_0_3px_rgba(255,75,43,0.08)]
          "
        >
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              disabled
                ? "AI is thinking..."
                : "Message AI..."
            }
            disabled={disabled}
            rows={1}
            className="
              flex-1
              bg-transparent
              text-[#25272B]
              placeholder:text-[#9A9CA2]
              outline-none
              resize-none
              py-2
              text-sm
              leading-6
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          />
        </div>

        {/* SEND BUTTON */}
        <button
          type="button"
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          title={disabled ? "AI is thinking" : "Send message"}
          className="
            h-11
            px-5
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#252525]
            hover:bg-[#111111]
            disabled:bg-[#D9DADF]
            disabled:text-[#9A9CA2]
            text-white
            text-sm
            font-medium
            transition-all
            duration-200
            disabled:cursor-not-allowed
          "
        >
          {disabled ? (
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9A9CA2] animate-bounce" />

              <span
                className="w-1.5 h-1.5 rounded-full bg-[#9A9CA2] animate-bounce"
                style={{ animationDelay: "120ms" }}
              />

              <span
                className="w-1.5 h-1.5 rounded-full bg-[#9A9CA2] animate-bounce"
                style={{ animationDelay: "240ms" }}
              />
            </span>
          ) : (
            <>
              <span>Send</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
            </>
          )}
        </button>
      </div>

      {/* HELPER TEXT */}
      <p className="text-center text-[11px] text-[#9A9CA2] mt-3">
        Press Enter to send • Shift + Enter for a new line
      </p>
    </div>
  );
}