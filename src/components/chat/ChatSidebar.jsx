import { useState } from "react";

export default function ChatSidebar({
  chats,
  activeChatId,
  onNewChat,
  onSelectChat,
  onRenameChat,
  onDeleteChat,
  onPinChat,
}) {
  const [openMenuId, setOpenMenuId] = useState(null);

  const handleRename = (chat) => {
    setOpenMenuId(null);

    const newTitle = window.prompt(
      "Enter new chat name:",
      chat.title
    );

    if (newTitle && newTitle.trim()) {
      onRenameChat(chat.id, newTitle.trim());
    }
  };

  const handleDelete = (chatId) => {
    setOpenMenuId(null);

    const confirmed = window.confirm(
      "Are you sure you want to delete this chat?"
    );

    if (confirmed) {
      onDeleteChat(chatId);
    }
  };

  const handlePin = (chat) => {
    setOpenMenuId(null);

    if (onPinChat) {
      onPinChat(chat.id);
    }
  };

  const sortedChats = [...(chats || [])].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });

  return (
    <div className="w-72 h-full bg-[#F1F2F4] border-r border-[#D9DADF] p-5 flex flex-col text-[#25272B]">

      {/* New Chat */}
      <button
        type="button"
        onClick={onNewChat}
        className="
          w-full
          bg-[#252525]
          hover:bg-[#111111]
          active:bg-[#111111]
          text-white
          py-3
          rounded-xl
          font-semibold
          mb-6
          transition-all
          duration-200
        "
      >
        + New Chat
      </button>

      {/* Recent Chats */}
      <h2 className="text-[#686B72] text-sm font-semibold mb-4">
        Recent Chats
      </h2>

      {/* Chat List */}
      <div className="space-y-2 overflow-y-auto flex-1">

        {sortedChats.length === 0 ? (
          <p className="text-[#9A9CA2] text-sm px-2 py-3">
            No recent chats
          </p>
        ) : (
          sortedChats.map((chat) => (
            <div
              key={chat.id}
              className={`
                relative
                flex
                items-center
                gap-2
                p-2
                rounded-xl
                border
                transition-all
                duration-200
                ${
                  activeChatId === chat.id
                    ? "bg-[#FFE4DE] border-[#FFC9BE]"
                    : "bg-white border-transparent hover:bg-[#E8E9EC]"
                }
              `}
            >

              {/* Chat Name */}
              <button
                type="button"
                onClick={() => {
                  setOpenMenuId(null);
                  onSelectChat(chat.id);
                }}
                className="flex-1 min-w-0 text-left p-1"
              >
                <span
                  className={`
                    block
                    truncate
                    text-sm
                    ${
                      activeChatId === chat.id
                        ? "text-[#25272B] font-medium"
                        : "text-[#45474C]"
                    }
                  `}
                >
                  {chat.pinned && (
                    <span className="mr-1">
                      📌
                    </span>
                  )}

                  {chat.title || "New Chat"}
                </span>
              </button>

              {/* More Menu Button */}
              <button
                type="button"
                onClick={() =>
                  setOpenMenuId(
                    openMenuId === chat.id
                      ? null
                      : chat.id
                  )
                }
                className="
                  w-8
                  h-8
                  flex
                  items-center
                  justify-center
                  rounded-lg
                  text-[#686B72]
                  hover:text-[#25272B]
                  hover:bg-[#D9DADF]
                  transition
                "
                title="Chat options"
              >
                ⋯
              </button>

              {/* Dropdown Menu */}
              {openMenuId === chat.id && (
                <div
                  className="
                    absolute
                    right-2
                    top-11
                    z-50
                    w-32
                    bg-white
                    border
                    border-[#D9DADF]
                    rounded-xl
                    shadow-lg
                    p-1
                  "
                >

                  {/* Pin / Unpin */}
                  <button
                    type="button"
                    onClick={() => handlePin(chat)}
                    className="
                      w-full
                      text-left
                      px-3
                      py-2
                      text-sm
                      text-[#45474C]
                      hover:bg-[#F1F2F4]
                      rounded-lg
                    "
                  >
                    📌 {chat.pinned ? "Unpin" : "Pin"}
                  </button>

                  {/* Rename */}
                  <button
                    type="button"
                    onClick={() => handleRename(chat)}
                    className="
                      w-full
                      text-left
                      px-3
                      py-2
                      text-sm
                      text-[#45474C]
                      hover:bg-[#F1F2F4]
                      rounded-lg
                    "
                  >
                    ✏️ Rename
                  </button>

                  {/* Delete */}
                  <button
                    type="button"
                    onClick={() => handleDelete(chat.id)}
                    className="
                      w-full
                      text-left
                      px-3
                      py-2
                      text-sm
                      text-[#D83A22]
                      hover:bg-[#FFF0ED]
                      rounded-lg
                    "
                  >
                    🗑️ Delete
                  </button>

                </div>
              )}

            </div>
          ))
        )}

      </div>

    </div>
  );
}