"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiSend, FiArrowLeft } from "react-icons/fi";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import HeaderMessages from "./HeaderMessage";

const conversations = [
  { id: 1, name: "Élodie Laurent", lastMsg: "Salut, ça va ?" },
  { id: 2, name: "Petit James Cyber", lastMsg: "Je t’envoie les fichiers..." },
  { id: 3, name: "Lova", lastMsg: "Ok, parfait !" },
];

const messagesMock = [
  { from: "me", text: "Salut, comment tu vas ?" },
  { from: "them", text: "Super bien, merci ! Et toi ?" },
  { from: "me", text: "Ça va tranquille 😎" },
];

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [messages, setMessages] = useState(messagesMock);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, { from: "me", text: newMessage }]);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* 🌈 Header stylisé */}
      <HeaderMessages
        onBack={() => setSelectedChat(null)}
        hasSelectedChat={!!selectedChat}
      />

      {/* 💬 Contenu principal */}
      <div className="flex flex-1 mt-2 md:mx-2 lg:mx-4 gap-4 overflow-hidden">
        {/* Section liste des conversations */}
        {(!selectedChat ||
          (typeof window !== "undefined" && window.innerWidth >= 768)) && (
          <Card className="w-full md:w-1/3 flex flex-col shadow-lg rounded-2xl bg-white dark:bg-gray-800">
            <CardContent className="flex-1 overflow-y-auto p-2">
              {conversations.map((conv) => (
                <motion.div
                  key={conv.id}
                  onClick={() => setSelectedChat(conv)}
                  className={`flex items-center gap-3 p-3 mb-2 rounded-xl cursor-pointer ${
                    selectedChat?.id === conv.id
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <Image
                    src="/images/users/user.png"
                    alt="Avatar"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{conv.name}</p>
                    <p className="text-sm opacity-70">{conv.lastMsg}</p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Section chat */}
        {selectedChat && (
          <Card className="flex-1 flex flex-col shadow-lg rounded-2xl bg-white dark:bg-gray-800">
            <CardContent className="flex-1 flex flex-col">
              {/* Historique messages */}
              <div className="flex flex-col flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`max-w-xs p-3 rounded-2xl ${
                      msg.from === "me"
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white self-end"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 self-start"
                    }`}
                  >
                    {msg.text}
                  </motion.div>
                ))}
              </div>

              {/* Zone input */}
              <div className="p-3 border-t border-gray-200 dark:border-gray-700 flex gap-2">
                <Input
                  placeholder="Écrire un message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
                <Button
                  onClick={handleSend}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <FiSend size={20} />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
