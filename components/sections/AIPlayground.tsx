"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, Play } from "lucide-react";

export default function AIPlayground() {
    const [output, setOutput] = useState<string[]>([
        "> System initialized...",
        "> Waiting for role definition...",
    ]);
    const [input, setInput] = useState("");

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const newOutput = [...output, `> User: ${input}`];
        setOutput(newOutput);
        setInput("");

        // Simulate AI delay
        setTimeout(() => {
            setOutput((prev) => [
                ...prev,
                `> AI Agent: Configurado rol "${input}". Iniciando módulos de inferencia...`,
                `> ANALYZING_CONTEXT... OK`,
                `> READY_TO_ASSIST.`,
            ]);
        }, 800);
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

                    {/* Terminal Body */}
                    <div className="p-6 h-[350px] overflow-y-auto flex flex-col">
                        <div className="space-y-2 mb-4 text-green-500/80">
                            {output.map((line, i) => (
                                <div key={i}>{line}</div>
                            ))}
                        </div>

                        <form onSubmit={handleCommand} className="mt-auto flex gap-2">
                            <span className="text-blue-500">{">"}</span>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ingresa un rol (ej. Asesor Comercial)..."
                                className="bg-transparent border-none outline-none text-white w-full placeholder:text-white/20"
                            />
                        </form>
                    </div>

                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 to-transparent" />
                </motion.div>
            </div>
        </section>
    );
}
