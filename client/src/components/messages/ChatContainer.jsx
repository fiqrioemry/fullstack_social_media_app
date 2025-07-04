/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import useLoadChat from "@/hooks/useLoadChat";
import { chatControl, chatState } from "@/config";
import useScrollToView from "@/hooks/useScrollToView";
import { useFormSchema } from "@/hooks/useFormSchema";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatHeader from "@/components/messages/ChatHeader";
import ChatDisplay from "@/components/messages/ChatDisplay";
import ChatInputForm from "@/components/messages/ChatInputForm";
import ChatSendLoading from "@/components/skeleton/ChatSendLoading";
import ChatContainerLoading from "@/components/skeleton/ChatContainerLoading";

const ChatContainer = () => {
  const { chat, sendChat, loading, selectedUser } = useLoadChat();

  const { viewRef } = useScrollToView(chat, loading);

  const chatForm = useFormSchema(chatState, chatControl, sendChat);

  useEffect(() => {
    chatForm.resetForm();
  }, [selectedUser]);

  if (!chat) return <ChatContainerLoading />;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center border-b border-muted p-2">
        <ChatHeader selectedUser={selectedUser} />
      </div>

      <ScrollArea className="flex-1 overflow-y-auto px-2 text-center border-b border-muted">
        <ChatDisplay
          chat={chat}
          ref={viewRef}
          loading={loading}
          selectedUser={selectedUser}
        />
        {loading && chatForm.values.image && <ChatSendLoading />}
        <div ref={viewRef} />
      </ScrollArea>

      <div className="relative px-2 py-2">
        <ChatInputForm form={chatForm} loading={loading} />
      </div>
    </div>
  );
};

export default ChatContainer;
