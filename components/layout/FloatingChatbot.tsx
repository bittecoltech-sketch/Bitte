"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send } from "lucide-react";
import { Button } from "@/components/ui/primitives";

export default function FloatingChatbot() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="fixed bottom-8 right-8 z-[60]">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-14 h-14 rounded-full bg-gradient-to-r from-bitte-blue to-bitte-green flex items-center justify-center text-white shadow-[0_0_20px_rgba(59,130,246,0.6)] animate-pulse-slow"
                >
                    {isOpen ? <X /> : <MessageSquare />}
                </motion.button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 right-8 z-[60] w-[350px] h-[500px] glass-panel rounded-2xl flex flex-col shadow-2xl"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-white/10 bg-white/5 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-bitte-blue flex items-center justify-center text-xs font-bold">AI</div>
                            <div>
                                <h4 className="font-bold text-white">Bitte Assistant</h4>
                                <p className="text-xs text-bitte-green">● Online</p>
                            </div>
                        </div>

                        {/* Chat Area */}
                        <div className="flex-1 p-4 space-y-4 overflow-y-auto custom-scrollbar">
                            <div className="bg-white/5 p-3 rounded-tr-xl rounded-bl-xl rounded-br-xl text-sm text-white/90 max-w-[85%]">
                                Hola! Soy el agente virtual de BITTE. ¿En qué puedo ayudarte hoy?
                            </div>
                            <div className="bg-bitte-blue/20 p-3 rounded-tl-xl rounded-bl-xl rounded-br-xl text-sm text-white/90 self-end ml-auto max-w-[85%] border border-bitte-blue/30">
                                Quiero saber más sobre automatización industrial.
                            </div>
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-white/10">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Escribe tu mensaje..."
                                    className="w-full bg-bitte-base border border-white/10 rounded-lg py-3 px-4 text-sm text-white focus:outline-none focus:border-bitte-blue"
                                />
                                <button className="absolute right-2 top-2 p-1 text-bitte-blue hover:text-white">
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
