import { useChatContext } from "@/contexts/ChatContext";
import { useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";
import { Send, ChevronDown, User, LogOut } from "lucide-react";
import ChatMessage from "./ChatMessage";
import { useNavigate } from "react-router-dom";

const ChatWindow = () => {
  const {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    prevChats,
    setPrevChats,
    setNewChat,
    allThreads,
    setAllThreads,
    setIsAuthenticated,
  } = useChatContext();
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setReply(null);
  }, [currThreadId]);

  const getReply = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    setNewChat(false);

    // Simulate AI response (replace with actual API call)
    const userMessage = prompt;
    setPrevChats((prev) => [...prev, { role: "user", content: userMessage }]);
    setPrompt("");

    // Simulated AI response
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const aiResponse = `This is a simulated response to: "${userMessage}"\n\nTo connect to a real AI backend, you'll need to:\n1. Set up an API endpoint\n2. Configure the API key\n3. Replace this mock response with actual API calls`;

    setReply(aiResponse);
    setPrevChats((prev) => [...prev, { role: "assistant", content: aiResponse }]);

    // Save thread if it's new
    const existingThread = allThreads.find((t) => t.threadId === currThreadId);
    if (!existingThread) {
      setAllThreads((prev) => [
        { threadId: currThreadId, title: userMessage.slice(0, 30) + (userMessage.length > 30 ? "..." : "") },
        ...prev,
      ]);
    }

    setLoading(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/auth");
  };

  return (
    <div className="flex-1 h-screen flex flex-col bg-background">
      {/* Navbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background/95 backdrop-blur sticky top-0 z-10">
        <div className="flex items-center gap-2 text-foreground font-medium">
          <span>SigmaGPT</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center cursor-pointer hover:bg-accent/80 transition-colors">
            <User className="h-4 w-4 text-accent-foreground" />
          </div>
          <button
            onClick={handleLogout}
            className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center cursor-pointer hover:bg-destructive/20 transition-colors"
            title="Logout"
          >
            <LogOut className="h-4 w-4 text-destructive" />
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <ChatMessage />

      {/* Loading Indicator */}
      {loading && (
        <div className="flex justify-center py-4">
          <ScaleLoader color="hsl(var(--primary))" height={20} />
        </div>
      )}

      {/* Input Area */}
      <div className="sticky bottom-0 bg-background px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Ask anything..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && getReply()}
              className="w-full bg-secondary text-foreground placeholder:text-muted-foreground px-5 py-4 pr-14 rounded-full border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
            <button
              onClick={getReply}
              disabled={!prompt.trim() || loading}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-3">
            SigmaGPT can make mistakes. Check important info.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
