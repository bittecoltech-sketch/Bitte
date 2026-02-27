"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Play } from "lucide-react";

export default function AIPlayground() {
    const [output, setOutput] = useState<string[]>([
        "> System initialized...",
        "> Waiting for agent setup...",
    ]);
    const [input, setInput] = useState("");
    const [agentName, setAgentName] = useState("");
    const [agentContext, setAgentContext] = useState("");
    const [initialized, setInitialized] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const API_KEY = "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";
    const MODEL = "nvidia/nemotron-3-nano-30b-a3b:free";

    const handleInitialize = async () => {
        setOutput([
            "> System initialized...",
            `> Agent name: ${agentName}`,
            `> Context: ${agentContext}`,
            "> AGENT READY. You can now interact."
        ]);
        setInitialized(true);
    };

    const handleCommand = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || !initialized) return;

        const userLine = `> Usuario: ${input}`;
        setOutput((prev) => [...prev, userLine]);
        setIsLoading(true);
        const promptMessages = [
            { role: "system", content: agentContext || "" },
            { role: "user", content: input }
        ];
        try {
            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": "https://bitte.tech",
                    "X-Title": "BITTE MiniAgent",
                },
                body: JSON.stringify({
                    model: MODEL,
                    messages: promptMessages,
                }),
            });
            if (!response.ok) throw new Error(`Error ${response.status}`);
            const data = await response.json();
            const aiContent = data.choices?.[0]?.message?.content || "[Sin respuesta de IA]";
            setOutput((prev) => [
                ...prev,
                `> ${agentName || "AI Agent"}: ${aiContent}`
            ]);
        } catch (err) {
            setOutput((prev) => [
                ...prev,
                `> ERROR: No se pudo obtener respuesta del agente.`
            ]);
        } finally {
            setIsLoading(false);
            setInput("");
        }
    };

    return (
        <section id="playground" className="py-24 bg-black/40 border-y border-white/5">
            <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                <div>
                    <div className="inline-flex items-center gap-2 text-bitte-green mb-4">
                        <Terminal className="w-5 h-5" />
                        <span className="font-mono text-sm tracking-widest">INTERACTIVE CONSOLE</span>
                    </div>
                    <h2 className="text-4xl font-bold mb-6">AI Agent Playground</h2>
                    <p className="text-bitte-steel mb-8">
                        Define el rol de tu agente y observa cómo se adapta en tiempo real.
                        Nuestra arquitectura RAG permite inyección de contexto dinámica.
                    </p>

                    <div className="flex gap-4">
                        <div className="px-4 py-2 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/60">
                            Model: BITTE-7B-v2
                        </div>
                        <div className="px-4 py-2 rounded bg-white/5 border border-white/10 text-xs font-mono text-bitte-green">
                            Status: IDLE
                        </div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="bg-[#0c0c0c] rounded-xl overflow-hidden border border-white/10 shadow-2xl font-mono text-sm relative"
                >
                    {/* Terminal Header */}
                    <div className="bg-white/5 px-4 py-2 flex items-center gap-2 border-b border-white/5">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                        <span className="ml-2 text-xs text-white/30">agent_runtime.sh</span>
                    </div>

                    {/* Agent Setup Dialogs */}
                    <div className="px-6 pt-4 pb-2 bg-black/30 border-b border-white/10 flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <label htmlFor="agentName" className="text-xs text-white/50 w-20">Nombre:</label>
                            <input
                                id="agentName"
                                type="text"
                                value={agentName}
                                onChange={(e) => setAgentName(e.target.value)}
                                placeholder="Ej. Ada, Max, etc."
                                className="bg-white/5 border border-white/10 rounded px-2 py-1 text-white text-xs w-40 placeholder:text-white/20"
                                disabled={initialized}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <label htmlFor="agentContext" className="text-xs text-white/50 w-20">Contexto:</label>
                            <input
                                id="agentContext"
                                type="text"
                                value={agentContext}
                                onChange={(e) => setAgentContext(e.target.value)}
                                placeholder="Personalidad, objetivo, etc."
                                className="bg-white/5 border border-white/10 rounded px-2 py-1 text-white text-xs w-full placeholder:text-white/20"
                                disabled={initialized}
                            />
                        </div>
                        <button
                            className={`mt-2 px-4 py-1 rounded bg-bitte-green text-black font-bold text-xs transition disabled:opacity-40 disabled:cursor-not-allowed w-fit`}
                            onClick={handleInitialize}
                            disabled={initialized || !agentName.trim() || !agentContext.trim()}
                        >
                            Inicializar agente
                        </button>
                    </div>

                    {/* Terminal Body */}
                    <div className="p-6 h-[290px] overflow-y-auto flex flex-col">
                        <div className="space-y-2 mb-4 text-green-500/80">
                            {output.map((line, i) => (
                                <div key={i}>{line}</div>
                            ))}
                        </div>

                        <form onSubmit={handleCommand} className="mt-auto flex gap-2">
                            <span className="text-blue-500">{" >"}</span>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={initialized ? "Escribe tu mensaje..." : "Inicializa el agente primero"}
                                className="bg-transparent border-none outline-none text-white w-full placeholder:text-white/20"
                                disabled={!initialized || isLoading}
                            />
                            {isLoading && <span className="text-xs text-white/40 ml-2">Enviando...</span>}
                        </form>
                    </div>

                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 to-transparent" />
                </motion.div>
            </div>
        </section>
    );
}
