import { useEffect, useState } from "react";

import ChatSidebar from "../../components/chat/ChatSidebarNew";
import ChatWindow from "./ChatWindow";
import ChatInput from "../../components/chat/ChatInput";

const CHAT_STORAGE_KEY = "ai-universe-chats";
const ACTIVE_CHAT_KEY = "ai-universe-active-chat";

export default function AIChat() {
  // ==========================================
  // LOAD CHATS
  // ==========================================

  const [chats, setChats] = useState(() => {
    try {
      const saved = localStorage.getItem(CHAT_STORAGE_KEY);

      if (saved) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (error) {
      console.error("Failed to load chats:", error);
    }

    return [];
  });

  // ==========================================
  // ACTIVE CHAT
  // ==========================================

  const [activeChatId, setActiveChatId] = useState(() => {
    return localStorage.getItem(ACTIVE_CHAT_KEY) || null;
  });

  // ==========================================
  // LOADING
  // ==========================================

  const [loading, setLoading] = useState(false);

  // ==========================================
  // SIDEBAR
  // ==========================================

  const [sidebarOpen, setSidebarOpen] = useState(true);

  // ==========================================
  // SAVE CHATS
  // ==========================================

  useEffect(() => {
    try {
      localStorage.setItem(
        CHAT_STORAGE_KEY,
        JSON.stringify(chats)
      );
    } catch (error) {
      console.error("Failed to save chats:", error);
    }
  }, [chats]);

  // ==========================================
  // SAVE ACTIVE CHAT
  // ==========================================

  useEffect(() => {
    if (activeChatId) {
      localStorage.setItem(
        ACTIVE_CHAT_KEY,
        activeChatId
      );
    } else {
      localStorage.removeItem(ACTIVE_CHAT_KEY);
    }
  }, [activeChatId]);

  // ==========================================
  // ACTIVE CHAT DATA
  // ==========================================

  const activeChat =
    chats.find(
      (chat) =>
        String(chat.id) === String(activeChatId)
    ) || null;

  const messages = activeChat?.messages || [];

  // ==========================================
  // CREATE NEW CHAT
  // ==========================================

  const createNewChat = () => {
    const newChat = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      pinned: false,
    };

    setChats((previous) => [
      newChat,
      ...previous,
    ]);

    setActiveChatId(newChat.id);
  };

  // ==========================================
  // UPDATE CHAT MESSAGES
  // ==========================================

  const updateChatMessages = (
    chatId,
    newMessages
  ) => {
    setChats((previous) =>
      previous.map((chat) =>
        String(chat.id) === String(chatId)
          ? {
              ...chat,
              messages: newMessages,
              updatedAt:
                new Date().toISOString(),
            }
          : chat
      )
    );
  };

  // ==========================================
  // UPDATE AI MESSAGE
  // ==========================================

  const updateAIMessage = (
    chatId,
    messageIndex,
    text
  ) => {
    setChats((previous) =>
      previous.map((chat) => {
        if (
          String(chat.id) !==
          String(chatId)
        ) {
          return chat;
        }

        const updatedMessages = [
          ...(chat.messages || []),
        ];

        if (!updatedMessages[messageIndex]) {
          return chat;
        }

        updatedMessages[messageIndex] = {
          ...updatedMessages[messageIndex],
          text,
        };

        return {
          ...chat,
          messages: updatedMessages,
          updatedAt:
            new Date().toISOString(),
        };
      })
    );
  };

  // ==========================================
  // RENAME CHAT
  // ==========================================

  const handleRenameChat = (
    chatId,
    newTitle
  ) => {
    setChats((previous) =>
      previous.map((chat) =>
        String(chat.id) === String(chatId)
          ? {
              ...chat,
              title: newTitle,
              updatedAt:
                new Date().toISOString(),
            }
          : chat
      )
    );
  };

  // ==========================================
  // PIN CHAT
  // ==========================================

  const handlePinChat = (chatId) => {
    setChats((previous) =>
      previous.map((chat) =>
        String(chat.id) === String(chatId)
          ? {
              ...chat,
              pinned: !chat.pinned,
              updatedAt:
                new Date().toISOString(),
            }
          : chat
      )
    );
  };

  // ==========================================
  // GET AI RESPONSE
  // ==========================================

  const getAIResponse = async (
    message,
    chatId,
    aiMessageIndex,
    regenerate = false,
    previousResponse = ""
  ) => {
    if (!message?.trim()) {
      return;
    }

    try {
      setLoading(true);

      console.log(
        "📤 Sending message to AI:",
        message
      );

      // ==========================================
      // LIVE RENDER BACKEND
      // ==========================================

      const response = await fetch(
        "https://ai-universe-os.onrender.com/api/chat",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Accept: "text/plain",
          },

          body: JSON.stringify({
            message: message.trim(),
            regenerate,
            previousResponse,
          }),
        }
      );

      console.log(
        "📥 Server status:",
        response.status
      );

      // ==========================================
      // SERVER ERROR
      // ==========================================

      if (!response.ok) {
        let errorMessage =
          `Server error: ${response.status}`;

        try {
          const errorData =
            await response.json();

          if (errorData?.error) {
            errorMessage =
              errorData.error;
          }
        } catch {
          // Response may be plain text.
        }

        throw new Error(errorMessage);
      }

      // ==========================================
      // EMPTY RESPONSE
      // ==========================================

      if (!response.body) {
        throw new Error(
          "AI server returned an empty response."
        );
      }

      // ==========================================
      // STREAM RESPONSE
      // ==========================================

      const reader =
        response.body.getReader();

      const decoder =
        new TextDecoder("utf-8");

      let fullText = "";

      while (true) {
        const result =
          await reader.read();

        if (result.done) {
          break;
        }

        if (result.value) {
          const chunk =
            decoder.decode(
              result.value,
              {
                stream: true,
              }
            );

          fullText += chunk;

          updateAIMessage(
            chatId,
            aiMessageIndex,
            fullText
          );
        }
      }

      // ==========================================
      // REMAINING TEXT
      // ==========================================

      const remaining =
        decoder.decode();

      if (remaining) {
        fullText += remaining;
      }

      const finalText =
        fullText.trim();

      console.log(
        "🤖 AI response:",
        finalText
      );

      // ==========================================
      // FINAL AI RESPONSE
      // ==========================================

      updateAIMessage(
        chatId,
        aiMessageIndex,
        finalText ||
          "The AI server returned an empty response. Please try again."
      );
    } catch (error) {
      console.error(
        "❌ AI response error:",
        error
      );

      updateAIMessage(
        chatId,
        aiMessageIndex,
        `Unable to get an AI response. ${error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // SEND MESSAGE
  // ==========================================

  const sendMessage = async (
    message
  ) => {
    const trimmedMessage =
      message?.trim();

    if (
      !trimmedMessage ||
      loading
    ) {
      return;
    }

    const messageTime =
      new Date().toISOString();

    // ==========================================
    // FIND ACTIVE CHAT
    // ==========================================

    let currentChat =
      chats.find(
        (chat) =>
          String(chat.id) ===
          String(activeChatId)
      ) || null;

    // ==========================================
    // IF NO ACTIVE CHAT
    // ==========================================

    if (!currentChat) {
      const chatId =
        Date.now().toString();

      const title =
        trimmedMessage.length > 30
          ? trimmedMessage.slice(
              0,
              30
            ) + "..."
          : trimmedMessage;

      const userMessageId =
        `${Date.now()}-user`;

      const aiMessageId =
        `${Date.now()}-ai`;

      const userMessage = {
        id: userMessageId,
        sender: "user",
        text: trimmedMessage,
        createdAt: messageTime,
      };

      const aiMessage = {
        id: aiMessageId,
        sender: "ai",
        text: "",
        createdAt: messageTime,
      };

      const newChat = {
        id: chatId,
        title,
        messages: [
          userMessage,
          aiMessage,
        ],
        createdAt: messageTime,
        updatedAt: messageTime,
        pinned: false,
      };

      setChats((previous) => [
        newChat,
        ...previous,
      ]);

      setActiveChatId(chatId);

      await getAIResponse(
        trimmedMessage,
        chatId,
        1,
        false,
        ""
      );

      return;
    }

    // ==========================================
    // EXISTING CHAT
    // ==========================================

    const currentMessages =
      currentChat.messages || [];

    const messageId =
      Date.now().toString();

    const userMessage = {
      id: `${messageId}-user`,
      sender: "user",
      text: trimmedMessage,
      createdAt: messageTime,
    };

    const aiMessage = {
      id: `${messageId}-ai`,
      sender: "ai",
      text: "",
      createdAt: messageTime,
    };

    const updatedMessages = [
      ...currentMessages,
      userMessage,
      aiMessage,
    ];

    updateChatMessages(
      currentChat.id,
      updatedMessages
    );

    // ==========================================
    // AUTO CHAT TITLE
    // ==========================================

    if (
      currentChat.title ===
      "New Chat"
    ) {
      const newTitle =
        trimmedMessage.length > 30
          ? trimmedMessage.slice(
              0,
              30
            ) + "..."
          : trimmedMessage;

      handleRenameChat(
        currentChat.id,
        newTitle
      );
    }

    // ==========================================
    // AI MESSAGE INDEX
    // ==========================================

    const aiMessageIndex =
      updatedMessages.length - 1;

    await getAIResponse(
      trimmedMessage,
      currentChat.id,
      aiMessageIndex,
      false,
      ""
    );
  };

  // ==========================================
  // REGENERATE
  // ==========================================

  const handleRegenerate =
    async () => {
      if (
        loading ||
        !activeChat
      ) {
        return;
      }

      const currentMessages =
        activeChat.messages || [];

      let lastUserIndex = -1;

      // ==========================================
      // FIND LAST USER MESSAGE
      // ==========================================

      for (
        let i =
          currentMessages.length - 1;
        i >= 0;
        i--
      ) {
        if (
          currentMessages[i]
            .sender === "user"
        ) {
          lastUserIndex = i;
          break;
        }
      }

      if (
        lastUserIndex === -1
      ) {
        return;
      }

      const aiMessageIndex =
        lastUserIndex + 1;

      if (
        !currentMessages[
          aiMessageIndex
        ]
      ) {
        return;
      }

      const message =
        currentMessages[
          lastUserIndex
        ].text;

      const previousResponse =
        currentMessages[
          aiMessageIndex
        ]?.text || "";

      if (!message?.trim()) {
        return;
      }

      // ==========================================
      // CLEAR OLD RESPONSE
      // ==========================================

      updateAIMessage(
        activeChat.id,
        aiMessageIndex,
        ""
      );

      // ==========================================
      // GENERATE NEW RESPONSE
      // ==========================================

      await getAIResponse(
        message,
        activeChat.id,
        aiMessageIndex,
        true,
        previousResponse
      );
    };

  // ==========================================
  // SELECT CHAT
  // ==========================================

  const handleSelectChat = (
    chatId
  ) => {
    setActiveChatId(chatId);
  };

  // ==========================================
  // DELETE CHAT
  // ==========================================

  const handleDeleteChat = (
    chatId
  ) => {
    setChats((previous) =>
      previous.filter(
        (chat) =>
          String(chat.id) !==
          String(chatId)
      )
    );

    if (
      String(activeChatId) ===
      String(chatId)
    ) {
      const remainingChats =
        chats.filter(
          (chat) =>
            String(chat.id) !==
            String(chatId)
        );

      if (
        remainingChats.length > 0
      ) {
        setActiveChatId(
          remainingChats[0].id
        );
      } else {
        setActiveChatId(null);
      }
    }
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="h-full min-h-0 w-full overflow-hidden bg-[#F1F2F4] text-[#25272B]">

      <div className="flex h-full min-h-0 w-full overflow-hidden">

        {/* ==========================================
            CHAT SIDEBAR
        ========================================== */}

        {sidebarOpen && (
          <div className="w-[280px] h-full min-h-0 shrink-0 overflow-hidden bg-[#E8E9EC] border-r border-[#D9DADF]">

            <ChatSidebar
              chats={chats}
              activeChatId={activeChatId}
              onSelectChat={
                handleSelectChat
              }
              onNewChat={
                createNewChat
              }
              onRenameChat={
                handleRenameChat
              }
              onDeleteChat={
                handleDeleteChat
              }
              onPinChat={
                handlePinChat
              }
            />

          </div>
        )}

        {/* ==========================================
            MAIN CHAT AREA
        ========================================== */}

        <main className="flex-1 min-w-0 min-h-0 h-full overflow-hidden flex flex-col bg-[#F1F2F4]">

          {/* ==========================================
              HEADER
          ========================================== */}

          <header className="h-[72px] shrink-0 flex items-center px-5 md:px-7 border-b border-[#D9DADF] bg-[#F1F2F4]">

            <div className="flex items-center gap-3">

              <button
                type="button"
                onClick={() =>
                  setSidebarOpen(
                    (previous) =>
                      !previous
                  )
                }
                className="w-9 h-9 flex items-center justify-center rounded-lg text-[#686B72] hover:bg-[#E8E9EC] hover:text-[#25272B] transition-all duration-200"
              >
                ☰
              </button>

              <div>

                <h1 className="font-semibold text-[17px] tracking-tight text-[#25272B]">
                  AI Universe
                </h1>

                <p className="text-xs text-[#686B72]">
                  Your intelligent workspace
                </p>

              </div>

            </div>

          </header>

          {/* ==========================================
              CHAT CONTENT
              ONLY THIS AREA SCROLLS
          ========================================== */}

          <div className="flex-1 min-h-0 relative overflow-hidden flex flex-col bg-[#F1F2F4]">

            {messages.length > 0 && (
              <ChatWindow
                messages={messages}
                loading={loading}
                onRegenerate={
                  handleRegenerate
                }
              />
            )}

          </div>

          {/* ==========================================
              CHAT INPUT
          ========================================== */}

          <div className="shrink-0 px-4 md:px-7 pb-5 pt-3 bg-[#F1F2F4]">

            <div className="max-w-4xl mx-auto">

              <ChatInput
                onSend={sendMessage}
                disabled={loading}
              />

            </div>

            <p className="text-center text-[11px] mt-3 text-[#9A9CA2]">
              AI can make mistakes.
              Check important
              information.
            </p>

          </div>

        </main>

      </div>

    </div>
  );
}