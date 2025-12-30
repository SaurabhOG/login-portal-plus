import Sidebar from "@/components/chat/Sidebar";
import ChatWindow from "@/components/chat/ChatWindow";
import { useChatContext } from "@/contexts/ChatContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Chat = () => {
  const { isAuthenticated } = useChatContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <ChatWindow />
    </div>
  );
};

export default Chat;
