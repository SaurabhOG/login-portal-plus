import React, { createContext, useContext, useState, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface Thread {
  threadId: string;
  title: string;
}

interface ChatContextType {
  prompt: string;
  setPrompt: (prompt: string) => void;
  reply: string | null;
  setReply: (reply: string | null) => void;
  currThreadId: string;
  setCurrThreadId: (id: string) => void;
  newChat: boolean;
  setNewChat: (newChat: boolean) => void;
  prevChats: ChatMessage[];
  setPrevChats: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  allThreads: Thread[];
  setAllThreads: React.Dispatch<React.SetStateAction<Thread[]>>;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState<string | null>(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv4());
  const [prevChats, setPrevChats] = useState<ChatMessage[]>([]);
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState<Thread[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <ChatContext.Provider
      value={{
        prompt,
        setPrompt,
        reply,
        setReply,
        currThreadId,
        setCurrThreadId,
        newChat,
        setNewChat,
        prevChats,
        setPrevChats,
        allThreads,
        setAllThreads,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};
