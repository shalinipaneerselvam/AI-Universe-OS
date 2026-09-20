import { useState } from "react";

export default function ChatWindow({
  messages = [],
  loading = false,
  onRegenerate,
}) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  // ==========================================
  // CLEAN AI RESPONSE
  // ==========================================

  const cleanText = (text = "") => {
    return text
      .replace(/\\###/g, "###")
      .replace(/\\##/g, "##")
      .replace(/\\#/g, "#")
      .replace(/\\\*\*/g, "**")
      .replace(/\\\*/g, "*")
      .replace(/\\`/g, "`");
  };

  // ==========================================
  // INLINE MARKDOWN
  // ==========================================

  const formatInline = (text = "") => {
    const result = [];
    let remaining = text;
    let partIndex = 0;

    while (remaining.length > 0) {
      const codeMatch = remaining.match(/`([^`]+)`/);
      const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
      const italicMatch = remaining.match(
        /(?<!\*)\*([^*]+?)\*(?!\*)/
      );

      const matches = [
        codeMatch
          ? {
              type: "code",
              match: codeMatch,
            }
          : null,
        boldMatch
          ? {
              type: "bold",
              match: boldMatch,
            }
          : null,
        italicMatch
          ? {
              type: "italic",
              match: italicMatch,
            }
          : null,
      ].filter(Boolean);

      if (matches.length === 0) {
        result.push(
          <span key={`text-${partIndex}`}>
            {remaining}
          </span>
        );

        break;
      }

      let earliest = matches[0];

      matches.forEach((item) => {
        if (
          item.match.index <
          earliest.match.index
        ) {
          earliest = item;
        }
      });

      const match = earliest.match;
      const matchIndex = match.index;

      if (matchIndex > 0) {
        result.push(
          <span key={`before-${partIndex}`}>
            {remaining.slice(
              0,
              matchIndex
            )}
          </span>
        );
      }

      if (earliest.type === "code") {
        result.push(
          <code
            key={`code-${partIndex}`}
            className="px-1.5 py-0.5 rounded-md bg-[#F1F2F4] text-[#D83A22] font-mono text-[13px]"
          >
            {match[1]}
          </code>
        );
      }

      if (earliest.type === "bold") {
        result.push(
          <strong
            key={`bold-${partIndex}`}
            className="font-semibold"
          >
            {match[1]}
          </strong>
        );
      }

      if (earliest.type === "italic") {
        result.push(
          <em
            key={`italic-${partIndex}`}
            className="italic"
          >
            {match[1]}
          </em>
        );
      }

      remaining = remaining.slice(
        matchIndex + match[0].length
      );

      partIndex += 1;
    }

    return result;
  };

  // ==========================================
  // FORMAT MESSAGE
  // ==========================================

  const formatMessage = (text = "") => {
    if (!text) {
      return null;
    }

    const cleanedText = cleanText(text);
    const lines = cleanedText.split("\n");

    const elements = [];

    let insideCodeBlock = false;
    let codeLines = [];
    let elementIndex = 0;

    lines.forEach((line) => {
      // ========================================
      // CODE BLOCK
      // ========================================

      if (
        line.trim().startsWith("```")
      ) {
        if (!insideCodeBlock) {
          insideCodeBlock = true;
          codeLines = [];
        } else {
          insideCodeBlock = false;

          elements.push(
            <pre
              key={`code-block-${elementIndex}`}
              className="my-4 p-4 rounded-xl bg-[#252525] text-white overflow-x-auto text-sm leading-6"
            >
              <code>
                {codeLines.join("\n")}
              </code>
            </pre>
          );

          codeLines = [];
          elementIndex += 1;
        }

        return;
      }

      // ========================================
      // INSIDE CODE BLOCK
      // ========================================

      if (insideCodeBlock) {
        codeLines.push(line);
        return;
      }

      // ========================================
      // EMPTY LINE
      // ========================================

      if (!line.trim()) {
        elements.push(
          <div
            key={`space-${elementIndex}`}
            className="h-3"
          />
        );

        elementIndex += 1;
        return;
      }

      // ========================================
      // H1
      // ========================================

      if (/^\s*#\s+/.test(line)) {
        const heading = line
          .replace(/^\s*#\s+/, "")
          .trim();

        elements.push(
          <h1
            key={`h1-${elementIndex}`}
            className="text-xl font-bold mt-4 mb-2 text-[#25272B]"
          >
            {formatInline(heading)}
          </h1>
        );

        elementIndex += 1;
        return;
      }

      // ========================================
      // H2
      // ========================================

      if (/^\s*##\s+/.test(line)) {
        const heading = line
          .replace(/^\s*##\s+/, "")
          .trim();

        elements.push(
          <h2
            key={`h2-${elementIndex}`}
            className="text-lg font-bold mt-4 mb-2 text-[#25272B]"
          >
            {formatInline(heading)}
          </h2>
        );

        elementIndex += 1;
        return;
      }

      // ========================================
      // H3
      // ========================================

      if (/^\s*###\s+/.test(line)) {
        const heading = line
          .replace(/^\s*###\s+/, "")
          .trim();

        elements.push(
          <h3
            key={`h3-${elementIndex}`}
            className="text-[16px] font-bold mt-4 mb-2 text-[#25272B]"
          >
            {formatInline(heading)}
          </h3>
        );

        elementIndex += 1;
        return;
      }

      // ========================================
      // BULLET -
      // ========================================

      if (/^\s*-\s+/.test(line)) {
        const bullet = line
          .replace(/^\s*-\s+/, "")
          .trim();

        elements.push(
          <div
            key={`bullet-${elementIndex}`}
            className="flex items-start gap-2 ml-1 my-1"
          >
            <span className="mt-[2px]">
              •
            </span>

            <div className="flex-1">
              {formatInline(bullet)}
            </div>
          </div>
        );

        elementIndex += 1;
        return;
      }

      // ========================================
      // BULLET *
      // ========================================

      if (/^\s*\*\s+/.test(line)) {
        const bullet = line
          .replace(/^\s*\*\s+/, "")
          .trim();

        elements.push(
          <div
            key={`star-bullet-${elementIndex}`}
            className="flex items-start gap-2 ml-1 my-1"
          >
            <span className="mt-[2px]">
              •
            </span>

            <div className="flex-1">
              {formatInline(bullet)}
            </div>
          </div>
        );

        elementIndex += 1;
        return;
      }

      // ========================================
      // NUMBERED LIST
      // ========================================

      const numberedMatch =
        line.match(
          /^\s*(\d+)\.\s+(.*)$/
        );

      if (numberedMatch) {
        elements.push(
          <div
            key={`number-${elementIndex}`}
            className="flex items-start gap-2 ml-1 my-1"
          >
            <span className="font-medium min-w-[24px]">
              {numberedMatch[1]}.
            </span>

            <div className="flex-1">
              {formatInline(
                numberedMatch[2]
              )}
            </div>
          </div>
        );

        elementIndex += 1;
        return;
      }

      // ========================================
      // NORMAL TEXT
      // ========================================

      elements.push(
        <div
          key={`line-${elementIndex}`}
          className="min-h-[1.5rem]"
        >
          {formatInline(line)}
        </div>
      );

      elementIndex += 1;
    });

    // ==========================================
    // UNCLOSED CODE BLOCK
    // ==========================================

    if (
      insideCodeBlock &&
      codeLines.length > 0
    ) {
      elements.push(
        <pre
          key={`code-final-${elementIndex}`}
          className="my-4 p-4 rounded-xl bg-[#252525] text-white overflow-x-auto text-sm leading-6"
        >
          <code>
            {codeLines.join("\n")}
          </code>
        </pre>
      );
    }

    return elements;
  };

  // ==========================================
  // COPY
  // ==========================================

  const handleCopy = async (
    text,
    index
  ) => {
    try {
      await navigator.clipboard.writeText(
        text
      );

      setCopiedIndex(index);

      setTimeout(() => {
        setCopiedIndex(null);
      }, 1500);
    } catch (error) {
      console.error(
        "Copy failed:",
        error
      );
    }
  };

  // ==========================================
  // EMPTY STATE
  // ==========================================

  if (
    messages.length === 0 &&
    !loading
  ) {
    return null;
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="flex-1 min-h-0 overflow-y-auto px-4 md:px-8 py-6">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* ======================================
            MESSAGES
        ====================================== */}

        {messages.map(
          (message, index) => {
            const isUser =
              message.sender === "user";

            const text =
              message.text || "";

            return (
              <div
                key={
                  message.id || index
                }
                className={`flex w-full ${
                  isUser
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                {/* ==================================
                    MESSAGE BUBBLE
                ================================== */}

                <div
                  className={`max-w-[85%] md:max-w-[75%] ${
                    isUser
                      ? "bg-[#252525] text-white rounded-2xl rounded-br-md"
                      : "bg-white text-[#25272B] rounded-2xl rounded-bl-md border border-[#D9DADF]"
                  }`}
                >

                  {/* ==================================
                      MESSAGE TEXT
                  ================================== */}

                  <div
                    className={`px-5 py-4 text-[15px] leading-7 ${
                      isUser
                        ? "text-white"
                        : "text-[#25272B]"
                    }`}
                  >
                    {formatMessage(text)}
                  </div>

                  {/* ==================================
                      AI ACTIONS
                  ================================== */}

                  {!isUser &&
                    text.trim() && (
                      <div className="flex items-center gap-4 px-5 pb-3">

                        {/* COPY */}

                        <button
                          type="button"
                          onClick={() =>
                            handleCopy(
                              text,
                              index
                            )
                          }
                          className="text-xs text-[#686B72] hover:text-[#25272B] transition-colors flex items-center gap-1.5"
                        >
                          <span>
                            {copiedIndex ===
                            index
                              ? "✓"
                              : "📋"}
                          </span>

                          <span>
                            {copiedIndex ===
                            index
                              ? "Copied"
                              : "Copy"}
                          </span>
                        </button>

                        {/* REGENERATE */}

                        {onRegenerate && (
                          <button
                            type="button"
                            onClick={
                              onRegenerate
                            }
                            disabled={
                              loading
                            }
                            className="text-xs text-[#686B72] hover:text-[#25272B] transition-colors flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <span>
                              🔄
                            </span>

                            <span>
                              Regenerate
                            </span>
                          </button>
                        )}

                      </div>
                    )}

                </div>
              </div>
            );
          }
        )}

        {/* ======================================
            LOADING
        ====================================== */}

        {loading && (
          <div className="flex justify-start">

            <div className="bg-white border border-[#D9DADF] rounded-2xl rounded-bl-md px-5 py-4">

              <div className="flex items-center gap-1.5">

                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />

                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />

                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />

              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}