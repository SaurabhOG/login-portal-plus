import { useChatContext } from "@/contexts/ChatContext";
import { v4 as uuidv4 } from "uuid";
import { PenSquare, Trash2, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const {
    allThreads,
    setAllThreads,
    currThreadId,
    setNewChat,
    setPrompt,
    setReply,
    setCurrThreadId,
    setPrevChats,
  } = useChatContext();

  const createNewChat = () => {
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setCurrThreadId(uuidv4());
    setPrevChats([]);
  };

  const changeThread = (threadId: string, chats: any[]) => {
    setCurrThreadId(threadId);
    setPrevChats(chats || []);
    setNewChat(false);
  };

  const deleteThread = (threadId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setAllThreads((prev) => prev.filter((t) => t.threadId !== threadId));
    if (threadId === currThreadId) {
      createNewChat();
    }
  };

  return (
    <section className="bg-sidebar h-screen w-64 lg:w-72 flex flex-col border-r border-sidebar-border">
      {/* New Chat Button */}
      <button
        onClick={createNewChat}
        className="flex items-center justify-between m-3 px-4 py-3 rounded-lg border border-sidebar-border bg-transparent hover:bg-sidebar-accent transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="h-7 w-7 bg-primary rounded-full flex items-center justify-center">
            <MessageSquare className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-sidebar-foreground font-medium">SigmaGPT</span>
        </div>
        <PenSquare className="h-5 w-5 text-sidebar-foreground/70" />
      </button>

      {/* Thread History */}
      <div className="flex-1 overflow-y-auto px-3 space-y-1 scrollbar-thin scrollbar-thumb-sidebar-accent scrollbar-track-transparent">
        {allThreads.map((thread) => (
          <div
            key={thread.threadId}
            onClick={() => changeThread(thread.threadId, [])}
            className={cn(
              "group flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors text-sm",
              currThreadId === thread.threadId
                ? "bg-sidebar-accent text-sidebar-foreground"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50"
            )}
          >
            <span className="truncate flex-1">{thread.title}</span>
            <Trash2
              className="h-4 w-4 opacity-0 group-hover:opacity-100 text-sidebar-foreground/50 hover:text-destructive transition-all"
              onClick={(e) => deleteThread(thread.threadId, e)}
            />
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border text-center">
        <p className="text-xs text-sidebar-foreground/50">
          By SaurabhOG <span className="text-red-400">♥</span>
        </p>
      </div>
    </section>
  );
};

export default Sidebar;
