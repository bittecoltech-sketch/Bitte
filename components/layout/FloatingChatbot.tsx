"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Loader2 } from "lucide-react";

const SYSTEM_PROMPT = `You are BITTE Assistant, the official AI assistant of the company.

Your role is to act as a professional, friendly, and knowledgeable assistant specialized in:
• industrial automation
• artificial intelligence solutions
• digital transformation
• engineering systems
• process optimization

Objectives:
- Answer questions clearly and confidently
- Explain technical topics in an accessible way
- Highlight how the company can solve problems
- Maintain a trustworthy and modern tone
- Encourage engagement naturally

Rules:
- Always respond in Spanish
- Be concise but informative
- Avoid unnecessary jargon unless requested
- If unsure, guide the user toward support
- Stay in assistant role at all times

Tone: Professional, modern, solution-oriented, tech-company style.

Goal: Make the user feel supported and confident in the company's intelligent automation solutions.`;

const API_KEY = "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";
const MODEL = "stepfun/step-3.5-flash:free";

interface Message {
    role: "user" | "assistant";
    content: string;
}

export default function FloatingChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content: "¡Hola! Soy el asistente virtual de BITTE. ¿En qué puedo ayudarte hoy con automatización, IA o transformación digital?",
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    const sendMessage = async () => {
        const trimmed = input.trim();
        if (!trimmed || isLoading) return;

        const userMessage: Message = { role: "user", content: trimmed };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": "https://bitte.tech",
                    "X-Title": "BITTE Assistant",
                },
                body: JSON.stringify({
                    model: MODEL,
                    messages: [
                        { role: "system", content: SYSTEM_PROMPT },
                        ...updatedMessages,
                    ],
                }),
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}`);
            }

            const data = await response.json();
            const assistantContent = data.choices?.[0]?.message?.content ?? "Lo siento, no pude procesar tu mensaje. Por favor intenta de nuevo.";

            setMessages((prev) => [...prev, { role: "assistant", content: assistantContent }]);
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: "Lo siento, hubo un problema al conectarme. Por favor intenta de nuevo en un momento.",
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            {/* Toggle Button */}
            <div className="fixed bottom-8 right-8 z-[60]">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-14 h-14 rounded-full bg-gradient-to-r from-bitte-blue to-bitte-green flex items-center justify-center text-white shadow-[0_0_20px_rgba(59,130,246,0.6)] animate-pulse-slow"
                    aria-label="Abrir chat"
                >
                    {isOpen ? <X /> : <MessageSquare />}
                </motion.button>
            </div>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-24 right-8 z-[60] w-[360px] h-[520px] glass-panel rounded-2xl flex flex-col shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-white/10 bg-gradient-to-r from-bitte-blue/20 to-bitte-green/10 flex items-center gap-3 shrink-0">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-bitte-blue to-bitte-green flex items-center justify-center text-xs font-bold shadow-lg">
                                AI
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-sm">BITTE Assistant</h4>
                                <p className="text-xs text-bitte-green">● En línea</p>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[85%] px-4 py-2.5 text-sm leading-relaxed rounded-2xl ${msg.role === "user"
                                                ? "bg-bitte-blue/30 border border-bitte-blue/40 text-white rounded-tr-sm"
                                                : "bg-white/5 border border-white/10 text-white/90 rounded-tl-sm"
                                            }`}
                                    >
                                        {msg.content}
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-2">
                                        <Loader2 className="w-4 h-4 text-bitte-blue animate-spin" />
                                        <span className="text-xs text-white/50">Escribiendo...</span>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-white/10 shrink-0">
                            <div className="relative flex items-center gap-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Escribe tu mensaje..."
                                    disabled={isLoading}
                                    className="flex-1 bg-bitte-base border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-bitte-blue transition-colors disabled:opacity-50"
                                />
                                <button
                                    onClick={sendMessage}
                                    disabled={isLoading || !input.trim()}
                                    className="p-2.5 rounded-xl bg-bitte-blue/20 border border-bitte-blue/30 text-bitte-blue hover:bg-bitte-blue hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                                    aria-label="Enviar mensaje"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
