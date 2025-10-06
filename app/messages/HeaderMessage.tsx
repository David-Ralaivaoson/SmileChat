"use client";


import { motion } from "framer-motion";
import { FiArrowLeft, FiSettings, FiEdit2 } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { useRouter } from "nextjs-toploader/app";

interface HeaderMessagesProps {
  onBack?: () => void;
  hasSelectedChat: boolean;
}

export default function HeaderMessages({ onBack, hasSelectedChat }: HeaderMessagesProps) {
  const router = useRouter();

  const handleBack = () => {
    if (hasSelectedChat && onBack) {
      onBack(); // 🔙 Retour à la liste de conversations
    } else {
      router.push("/"); // 🏠 Retour à la page d'accueil
    }
  };

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-50 w-full bg-gradient-to-r from-blue-500 to-purple-600 
                 shadow-md text-white flex items-center justify-between 
                 px-4 py-3 rounded-b-2xl"
    >
      {/* Bouton retour (toujours visible maintenant) */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBack}
          className="text-white hover:bg-white/20 transition"
          title="Retour"
        >
          <FiArrowLeft size={20} />
        </Button>
        <h1 className="text-lg font-semibold">
          {hasSelectedChat ? "Discussion" : "Messages"}
        </h1>
      </div>

      {/* Boutons d’action */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20"
          title="Nouveau message"
        >
          <FiEdit2 size={18} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20"
          title="Paramètres"
        >
          <FiSettings size={18} />
        </Button>
      </div>
    </motion.header>
  );
}
