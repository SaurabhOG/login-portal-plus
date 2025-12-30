import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { useChatContext } from "@/contexts/ChatContext";
import { useState, useEffect } from "react";
import { User, Bot } from "lucide-react";

const ChatMessage = () => {
  const { newChat, prevChats, reply } = useChatContext();
  const [latestReply, setLatestReply] = useState<string | null>(null);

  useEffect(() => {
    if (reply === null) {
      setLatestReply(null);
      return;
    }

    if (!prevChats?.length) return;

    const words = reply.split(" ");
    let idx = 0;

    const interval = setInterval(() => {
      setLatestReply(words.slice(0, idx + 1).join(" "));
      idx++;
      if (idx >= words.length) clearInterval(interval);
    }, 20);

    return () => clearInterval(interval);
  }, [prevChats, reply]);

  if (newChat) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Bot className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            How can I help you today?
          </h1>
          <p className="text-muted-foreground">
            Start a conversation with SigmaGPT
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 max-w-4xl mx-auto w-full">
      {prevChats?.slice(0, -1).map((chat, idx) => (
        <div key={idx} className="flex gap-4">
          {chat.role === "user" ? (
            <>
              <div className="flex-1" />
              <div className="bg-secondary text-secondary-foreground px-4 py-3 rounded-2xl rounded-tr-sm max-w-[80%]">
                <p className="text-sm">{chat.content}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                <User className="h-4 w-4 text-accent-foreground" />
              </div>
            </>
          ) : (
            <>
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="flex-1 prose prose-invert prose-sm max-w-none">
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                  {chat.content}
                </ReactMarkdown>
                <hr className="border-border/20 my-4" />
              </div>
            </>
          )}
        </div>
      ))}

      {prevChats.length > 0 && (
        <div className="flex gap-4">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
            <Bot className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="flex-1 prose prose-invert prose-sm max-w-none">
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
              {latestReply !== null ? latestReply : prevChats[prevChats.length - 1]?.content || ""}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
