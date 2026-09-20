import { useState } from "react";

export default function ChatWindow({
  messages = [],
  loading = false,
  onRegenerate,
}) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const formatMessage = (text) => {
    if (!text) return "";

    return text
      // Escape HTML
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")

      // Bold
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")

      // Headings
      .replace(/^### (.*)$/gm, "<h3>$1</h3>")
      .replace(/^## (.*)$/gm, "<h2>$1</h2>")
      .replace(/^# (.*)$/gm, "<h1>$1</h1>")

      // Horizontal line
      .replace(/^---$/gm, "<hr />")

      // Bullet points
      .replace(/^\*\*\* (.*)$/gm, "• $1")
      .replace(/^- (.*)$/gm, "• $1")

      // Numbered list
      .replace(/^\d+\.\s(.*)$/gm, "→ $1")

      // New lines
      .replace(/\n/g, "<br />");
  };

  // ==========================================
  // COPY MESSAGE
  // ==========================================

  const handleCopy = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);

      setCopiedIndex(index);

      setTimeout(() => {
        setCopiedIndex(null);
      }, 1500);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  // ==========================================
  // FIND LAST AI MESSAGE
  // ==========================================

  let lastAIMessageIndex = -1;

  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].sender === "ai") {
      lastAIMessageIndex = i;
      break;
    }
  }

  return (
    <div className="flex-1 overflow-y-auto bg-[#F1F2F4] text-[#25272B]">
      <div className="px-4 py-6 md:px-6 pb-24">

        {/* ==========================================
            EMPTY STATE
        ========================================== */}

        {messages.length === 0 ? (
          <div className="h-full min-h-[70vh] flex flex-col items-center justify-center text-center">

            <div className="w-16 h-16 mb-5 rounded-2xl bg-[#FFE4DE] flex items-center justify-center text-3xl shadow-sm">
              🤖
            </div>

            <h2 className="text-2xl md:text-3xl font-semibold text-[#25272B] mb-2">
              How can I help you?
            </h2>

            <p className="text-[#686B72] text-sm md:text-base">
              Ask me anything.
            </p>

          </div>
        ) : (

          /* ==========================================
             MESSAGES
          ========================================== */

          <div className="max-w-4xl mx-auto space-y-6">

            {messages.map((message, index) => {

              const isUser = message.sender === "user";
              const isLastAI = index === lastAIMessageIndex;

              return (
                <div
                  key={index}
                  className={`flex items-start gap-3 ${
                    isUser
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  {/* ==================================
                      AI AVATAR
                  ================================== */}

                  {!isUser && (
                    <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-[#FFE4DE] flex items-center justify-center text-lg">
                      🤖
                    </div>
                  )}

                  {/* ==================================
                      MESSAGE AREA
                  ================================== */}

                  <div
                    className={`max-w-[85%] md:max-w-[75%] ${
                      isUser
                        ? "flex flex-col items-end"
                        : "flex flex-col items-start"
                    }`}
                  >

                    {/* ==================================
                        MESSAGE
                    ================================== */}

                    <div
                      className={`px-5 py-4 text-sm md:text-base leading-7 break-words ${
                        isUser
                          ? "bg-[#252525] text-white rounded-2xl rounded-br-md"
                          : "bg-white text-[#25272B] border border-[#D9DADF] rounded-2xl rounded-bl-md shadow-sm"
                      }`}
                    >

                      {isUser ? (

                        <p className="whitespace-pre-wrap break-words">
                          {message.text}
                        </p>

                      ) : (

                        <div
                          className="
                            break-words

                            [&_strong]:font-bold
                            [&_strong]:text-[#25272B]

                            [&_h1]:text-2xl
                            [&_h1]:font-bold
                            [&_h1]:mb-3
                            [&_h1]:mt-2
                            [&_h1]:text-[#25272B]

                            [&_h2]:text-xl
                            [&_h2]:font-bold
                            [&_h2]:mb-3
                            [&_h2]:mt-2
                            [&_h2]:text-[#25272B]

                            [&_h3]:text-lg
                            [&_h3]:font-semibold
                            [&_h3]:mb-2
                            [&_h3]:mt-2
                            [&_h3]:text-[#25272B]

                            [&_hr]:my-4
                            [&_hr]:border-[#D9DADF]

                            [&_br]:leading-7
                          "
                          dangerouslySetInnerHTML={{
                            __html: formatMessage(message.text),
                          }}
                        />

                      )}

                    </div>

                    {/* ==================================
                        AI ACTION BUTTONS
                    ================================== */}

                    {!isUser && message.text && !loading && (

                      <div className="flex items-center gap-2 mt-2">

                        {/* COPY */}

                        <button
                          type="button"
                          onClick={() =>
                            handleCopy(message.text, index)
                          }
                          className="
                            px-3
                            py-1.5
                            text-xs
                            font-medium
                            text-[#686B72]
                            border
                            border-[#D9DADF]
                            bg-white
                            rounded-lg
                            hover:bg-[#E8E9EC]
                            hover:text-[#25272B]
                            transition
                          "
                        >
                          {copiedIndex === index
                            ? "✓ Copied"
                            : "📋 Copy"}
                        </button>

                        {/* REGENERATE */}

                        {isLastAI && onRegenerate && (

                          <button
                            type="button"
                            onClick={onRegenerate}
                            className="
                              px-3
                              py-1.5
                              text-xs
                              font-medium
                              text-[#686B72]
                              border
                              border-[#D9DADF]
                              bg-white
                              rounded-lg
                              hover:bg-[#E8E9EC]
                              hover:text-[#25272B]
                              transition
                            "
                          >
                            🔄 Regenerate
                          </button>

                        )}

                      </div>

                    )}

                  </div>

                  {/* ==================================
                      USER AVATAR
                  ================================== */}

                  {isUser && (

                    <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-[#252525] flex items-center justify-center text-white text-sm font-semibold">
                      You
                    </div>

                  )}

                </div>
              );
            })}

            {/* ==========================================
                LOADING
            ========================================== */}

            {loading && (

              <div className="flex items-start gap-3">

                <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-[#FFE4DE] flex items-center justify-center text-lg">
                  🤖
                </div>

                <div className="bg-white border border-[#D9DADF] rounded-2xl rounded-bl-md shadow-sm px-5 py-4">

                  <div className="flex items-center gap-1.5">

                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />

                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{
                        animationDelay: "0.15s",
                      }}
                    />

                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{
                        animationDelay: "0.3s",
                      }}
                    />

                  </div>

                </div>

              </div>

            )}

          </div>
        )}

      </div>
    </div>
  );
}