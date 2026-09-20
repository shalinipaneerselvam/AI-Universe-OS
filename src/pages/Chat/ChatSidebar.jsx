import { useState } from "react";

export default function ChatSidebar({
  chats = [],
  activeChatId,
  onNewChat,
  onSelectChat,
  onRenameChat,
  onDeleteChat,
  onPinChat,
}) {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [search, setSearch] = useState("");

  const [renameChat, setRenameChat] = useState(null);
  const [renameTitle, setRenameTitle] = useState("");

  const [deleteChat, setDeleteChat] = useState(null);

  // ==========================================
  // SEARCH + PINNED CHAT SORTING
  // ==========================================

  const filteredChats = chats
    .filter((chat) =>
      (chat.title || "New Chat")
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;

      return 0;
    });

  // ==========================================
  // PIN CHAT
  // ==========================================

  const handlePin = (chat) => {
    if (onPinChat) {
      onPinChat(chat.id);
    }

    setOpenMenuId(null);
  };

  // ==========================================
  // OPEN RENAME
  // ==========================================

  const handleOpenRename = (chat) => {
    setRenameChat(chat);
    setRenameTitle(chat.title || "New Chat");
    setOpenMenuId(null);
  };

  // ==========================================
  // SAVE RENAME
  // ==========================================

  const handleSaveRename = () => {
    const trimmedTitle = renameTitle.trim();

    if (!trimmedTitle) {
      return;
    }

    if (onRenameChat && renameChat) {
      onRenameChat(
        renameChat.id,
        trimmedTitle
      );
    }

    setRenameChat(null);
    setRenameTitle("");
  };

  // ==========================================
  // OPEN DELETE
  // ==========================================

  const handleOpenDelete = (chat) => {
    setDeleteChat(chat);
    setOpenMenuId(null);
  };

  // ==========================================
  // CONFIRM DELETE
  // ==========================================

  const handleConfirmDelete = () => {
    if (onDeleteChat && deleteChat) {
      onDeleteChat(deleteChat.id);
    }

    setDeleteChat(null);
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <aside className="h-full min-h-0 w-full bg-white border-r border-[#D9DADF] flex flex-col overflow-hidden">

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="shrink-0 px-5 pt-5 pb-4 border-b border-[#D9DADF]">

        <h1 className="text-xl font-bold text-[#25272B]">
          AI Universe
        </h1>

        <p className="text-xs text-[#686B72] mt-1">
          Your AI Workspace
        </p>

      </div>

      {/* ======================================
          NEW CHAT
      ====================================== */}

      <div className="shrink-0 p-4">

        <button
          type="button"
          onClick={onNewChat}
          className="w-full h-11 px-4 rounded-xl bg-[#252525] hover:bg-[#111111] text-white text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200"
        >
          <span className="text-lg leading-none">
            +
          </span>

          <span>
            New Chat
          </span>
        </button>

      </div>

      {/* ======================================
          SEARCH
      ====================================== */}

      <div className="shrink-0 px-4 pb-4">

        <div className="relative">

          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
            🔍
          </span>

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search chats..."
            className="w-full h-10 pl-9 pr-3 text-sm text-[#25272B] placeholder:text-[#9A9CA2] bg-white border border-[#D9DADF] rounded-xl outline-none focus:border-[#FF4B2B] transition-all duration-200"
          />

        </div>

      </div>

      {/* ======================================
          RECENT CHATS
      ====================================== */}

      <div className="shrink-0 px-4 pb-3">

        <h2 className="text-xs font-semibold uppercase tracking-wide text-[#686B72]">
          Recent Chats
        </h2>

      </div>

      {/* ======================================
          CHAT LIST
          ONLY THIS AREA SCROLLS
      ====================================== */}

      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-3 pb-4">

        {filteredChats.length === 0 ? (
          <div className="text-center text-sm text-[#9A9CA2] py-8">
            {search
              ? "No chats found"
              : "No chats yet"}
          </div>
        ) : (
          <div className="space-y-1">

            {filteredChats.map((chat) => {

              const isActive =
                String(chat.id) ===
                String(activeChatId);

              return (
                <div
                  key={chat.id}
                  className={`group relative w-full rounded-xl transition-all duration-150 ${
                    isActive
                      ? "bg-[#F1F2F4]"
                      : "hover:bg-[#F8F8F8]"
                  }`}
                >

                  {/* CHAT BUTTON */}

                  <button
                    type="button"
                    onClick={() =>
                      onSelectChat(chat.id)
                    }
                    className="w-full min-w-0 text-left px-3 py-3 pr-10"
                  >

                    <div className="flex items-center gap-2 min-w-0">

                      {chat.pinned && (
                        <span className="shrink-0 text-xs">
                          📌
                        </span>
                      )}

                      <span className="text-sm text-[#25272B] truncate">
                        {chat.title || "New Chat"}
                      </span>

                    </div>

                  </button>

                  {/* THREE DOT MENU */}

                  <button
                    type="button"
                    aria-label="Chat options"
                    onClick={(e) => {
                      e.stopPropagation();

                      setOpenMenuId(
                        openMenuId === chat.id
                          ? null
                          : chat.id
                      );
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg text-[#9A9CA2] hover:text-[#25272B] hover:bg-[#D9DADF] opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-150"
                  >
                    ⋯
                  </button>

                  {/* MENU */}

                  {openMenuId === chat.id && (
                    <div className="absolute right-2 top-10 z-50 w-36 bg-white border border-[#D9DADF] rounded-xl shadow-lg py-1">

                      {/* PIN */}

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();

                          handlePin(chat);
                        }}
                        className="w-full px-3 py-2.5 text-left text-sm text-[#45474C] hover:bg-[#F1F2F4]"
                      >
                        {chat.pinned
                          ? "📌 Unpin"
                          : "📌 Pin"}
                      </button>

                      {/* RENAME */}

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();

                          handleOpenRename(chat);
                        }}
                        className="w-full px-3 py-2.5 text-left text-sm text-[#45474C] hover:bg-[#F1F2F4]"
                      >
                        ✏️ Rename
                      </button>

                      {/* DELETE */}

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();

                          handleOpenDelete(chat);
                        }}
                        className="w-full px-3 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
                      >
                        🗑️ Delete
                      </button>

                    </div>
                  )}

                </div>
              );
            })}

          </div>
        )}

      </div>

      {/* ======================================
          RENAME MODAL
      ====================================== */}

      {renameChat && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">

          <div className="w-full max-w-[380px] bg-white rounded-2xl shadow-xl p-6">

            <h3 className="text-lg font-semibold text-[#25272B]">
              Rename Chat
            </h3>

            <p className="text-sm text-[#686B72] mt-1 mb-4">
              Enter a new name for this chat.
            </p>

            <input
              autoFocus
              type="text"
              value={renameTitle}
              onChange={(e) =>
                setRenameTitle(e.target.value)
              }
              onKeyDown={(e) => {

                if (e.key === "Enter") {
                  handleSaveRename();
                }

                if (e.key === "Escape") {
                  setRenameChat(null);
                  setRenameTitle("");
                }

              }}
              className="w-full h-11 px-3 border border-[#D9DADF] rounded-xl text-sm text-[#25272B] outline-none focus:border-[#FF4B2B]"
            />

            <div className="flex justify-end gap-2 mt-5">

              <button
                type="button"
                onClick={() => {
                  setRenameChat(null);
                  setRenameTitle("");
                }}
                className="px-4 py-2.5 text-sm rounded-xl border border-[#D9DADF] text-[#45474C] hover:bg-[#F1F2F4]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSaveRename}
                className="px-4 py-2.5 text-sm rounded-xl bg-[#252525] text-white hover:bg-[#111111]"
              >
                Save
              </button>

            </div>

          </div>

        </div>
      )}

      {/* ======================================
          DELETE MODAL
      ====================================== */}

      {deleteChat && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">

          <div className="w-full max-w-[380px] bg-white rounded-2xl shadow-xl p-6">

            <h3 className="text-lg font-semibold text-[#25272B]">
              Delete Chat
            </h3>

            <p className="text-sm text-[#686B72] mt-2">
              Are you sure you want to delete{" "}

              <span className="font-medium text-[#25272B]">
                "{deleteChat.title || "New Chat"}"
              </span>

              ?
            </p>

            <div className="flex justify-end gap-2 mt-6">

              <button
                type="button"
                onClick={() =>
                  setDeleteChat(null)
                }
                className="px-4 py-2.5 text-sm rounded-xl border border-[#D9DADF] text-[#45474C] hover:bg-[#F1F2F4]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2.5 text-sm rounded-xl bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>

            </div>

          </div>

        </div>
      )}

    </aside>
  );
}