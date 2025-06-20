"use client";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import socket from "@/utils/socket";

type ChatBoxProps = {
  open: boolean;
  onClose: () => void;
  role: "tenant" | "landlord"; // e.g., "tenant"
  userId: string; // current user ID
  toUserId: string; // ID of the user you're chatting with
};

type Message = {
  from: string;
  text: string;
};

export default function ChatBox({
  open,
  onClose,
  role,
  userId,
  toUserId,
}: ChatBoxProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!open) return;

    // Identify user to the server
    socket.emit("join", { role, userId });

    // Listen for messages
    socket.on("receive_message", ({ message, fromRole }) => {
      setMessages((prev) => [...prev, { from: fromRole, text: message }]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [open, role, userId]);

  const sendMessage = () => {
    if (!input.trim()) return;

    // Emit to server
    socket.emit("private_message", {
      toUserId, // receiver's ID
      fromRole: role,
      message: input,
    });

    // Add to local chat
    setMessages((prev) => [...prev, { from: "me", text: input }]);
    setInput("");
  };

  if (!open) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="w-80 bg-white shadow-xl rounded-2xl border border-gray-300 flex flex-col overflow-hidden">
        <div className="bg-blue-600 text-white px-4 py-2 flex justify-between items-center">
          <span className="font-semibold">Chat</span>
          <X className="cursor-pointer" onClick={onClose} />
        </div>

        <div className="flex-1 p-3 overflow-y-auto max-h-64 space-y-2 text-sm">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded-md max-w-[75%] ${
                msg.from === "me"
                  ? "bg-blue-100 ml-auto text-right"
                  : "bg-gray-100"
              }`}
            >
              <p>{msg.text}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center border-t border-gray-200 p-2">
          <input
            type="text"
            className="flex-grow px-3 py-2 text-sm border rounded-md focus:outline-none"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="ml-2 px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
