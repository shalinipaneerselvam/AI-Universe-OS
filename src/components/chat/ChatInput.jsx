import { useState } from "react";

export default function ChatInput({ onSend }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

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
    <div className="border-t border-[#D9DADF] bg-[#F1F2F4] p-4">
      <div className="max-w-4xl mx-auto flex items-center gap-3">
        <div className="flex-1 flex items-center bg-[#FFFFFF] border border-[#D9DADF] rounded-2xl px-4 py-2 focus-within:border-[#FF4B2B] focus-within:shadow-[0_0_0_3px_rgba(255,75,43,0.08)] transition-all duration-200">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message AI..."
            rows={1}
            className="flex-1 bg-transparent text-[#25272B] placeholder-[#9A9CA2] outline-none resize-none py-2 text-sm leading-6"
          />
        </div>

        <button
          type="button"
          onClick={handleSend}
          disabled={!message.trim()}
          className="bg-[#252525] hover:bg-[#111111] disabled:bg-[#D9DADF] disabled:text-[#9A9CA2] text-white font-medium px-6 py-3 rounded-2xl transition-all duration-200 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </div>

      <p className="text-center text-xs text-[#9A9CA2] mt-2">
        Press Enter to send • Shift + Enter for a new line
      </p>
    </div>
  );
}