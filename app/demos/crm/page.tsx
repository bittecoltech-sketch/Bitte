"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/primitives";
import {
    Users,
    BarChart3,
    Calendar,
    Settings,
    Plus,
    Sparkles,
    X,
    Building2,
    DollarSign,
    Loader2,
    CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const SIDEBAR_ITEMS = [
    { name: "Clientes", icon: Users, active: true },
    { name: "Ventas", icon: BarChart3, active: false },
    { name: "Agenda", icon: Calendar, active: false },
    { name: "Config", icon: Settings, active: false },
];

const INITIAL_CLIENTS = [
    { name: "TechCorp Industries", status: "Negociación", val: 45000, prob: 85 },
    { name: "Global Logistics", status: "Propuesta", val: 12500, prob: 60 },
    { name: "Alpha Manufacturing", status: "Cierre", val: 120000, prob: 92 },
    { name: "Solaris Energy", status: "Lead", val: 8000, prob: 45 },
];

export default function CRMPage() {
    const [clients, setClients] = useState(INITIAL_CLIENTS);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [notification, setNotification] = useState<string | null>(null);

    // Form State
    const [newName, setNewName] = useState("");
    const [newValue, setNewValue] = useState("");

    const handleRowClick = (company: string) => {
        setNotification(`Cargando detalles de ${company}...`);
        setTimeout(() => setNotification(null), 3000);
    };

    const handleSaveClient = () => {
        if (!newName || !newValue) return;

        const newClient = {
            name: newName,
            status: "Lead",
            val: parseFloat(newValue),
            prob: Math.floor(Math.random() * 40) + 10, // Random prob between 10-50 for leads
        };

        setClients([newClient, ...clients]);
        setIsModalOpen(false);
        setNewName("");
        setNewValue("");

        // Success notification
        setNotification(`¡Ciente ${newName} añadido con éxito!`);
        setTimeout(() => setNotification(null), 3000);
    };

    return (
        <div className="flex min-h-screen bg-[#0b0e14] text-white font-sans selection:bg-blue-500/30 pt-20 lg:pt-0">
            {/* Sidebar */}
            <aside className="w-20 lg:w-64 border-r border-white/5 bg-[#0e121a] flex flex-col transition-all duration-300 fixed lg:relative h-full z-20">
                <div className="p-6 hidden lg:block">
                    <div className="flex items-center gap-2 text-xl font-bold tracking-tight">
                        <span className="bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">Bitte</span>
                        <span className="text-[#ff4d4d]">CRM</span>
                    </div>
                </div>

                <nav className="flex-1 px-3 space-y-2 mt-4">
                    {SIDEBAR_ITEMS.map((item) => (
                        <button
                            key={item.name}
                            className={cn(
                                "flex items-center justify-center lg:justify-start gap-3 w-full px-4 py-3 rounded-xl transition-all duration-200 group relative",
                                item.active
                                    ? "bg-blue-600/10 text-blue-400 shadow-[inset_0_0_20px_rgba(59,130,246,0.05)]"
                                    : "text-white/40 hover:text-white hover:bg-white/5"
                            )}
                        >
                            {item.active && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute left-0 w-1 h-6 bg-blue-500 rounded-r-full"
                                />
                            )}
                            <item.icon className={cn("w-5 h-5", item.active && "text-blue-400")} />
                            <span className="font-medium hidden lg:block">{item.name}</span>
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto relative ml-20 lg:ml-0">
                {/* Header */}
                <header className="sticky top-0 z-10 flex items-center justify-between p-6 bg-[#0b0e14]/80 backdrop-blur-md border-b border-white/5">
                    <div className="flex items-center gap-4">
                        <div className="lg:hidden text-lg font-bold">
                            <span className="text-white">B</span><span className="text-[#ff4d4d]">C</span>
                        </div>
                        <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-white/90">Gestión de Clientes</h1>
                    </div>
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-500 text-white border-0 shadow-lg shadow-blue-600/20 px-4 lg:px-6 h-10 lg:h-11 rounded-xl gap-2 font-semibold transition-all hover:scale-[1.02]"
                    >
                        <Plus className="w-5 h-5" />
                        <span className="hidden sm:inline">Nuevo Cliente</span>
                    </Button>
                </header>

                <div className="p-6 space-y-6 max-w-7xl mx-auto">
                    {/* Table Container */}
                    <div className="bg-[#151a24] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-[#1c222d] text-white/40 uppercase text-[10px] font-bold tracking-[0.1em]">
                                    <tr>
                                        <th className="px-6 py-4">Empresa</th>
                                        <th className="px-6 py-4">Estado</th>
                                        <th className="px-6 py-4">Valor</th>
                                        <th className="px-6 py-4">Probabilidad IA</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    <AnimatePresence initial={false}>
                                        {clients.map((row) => (
                                            <motion.tr
                                                layout
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                key={row.name}
                                                onClick={() => handleRowClick(row.name)}
                                                className="group cursor-pointer transition-colors duration-150 relative bg-transparent hover:bg-white/[0.02]"
                                            >
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                                                            <Building2 className="w-4 h-4" />
                                                        </div>
                                                        <span className="font-semibold text-white/90 group-hover:text-white transition-all">{row.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <span className={cn(
                                                        "px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-white/70",
                                                        row.status === "Cierre" && "text-emerald-400 bg-emerald-400/5 border-emerald-400/10",
                                                        row.status === "Negociación" && "text-blue-400 bg-blue-400/5 border-blue-400/10",
                                                        row.status === "Propuesta" && "text-amber-400 bg-amber-400/5 border-amber-400/10"
                                                    )}>
                                                        {row.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5 font-mono text-white/80 tabular-nums">
                                                    ${row.val.toLocaleString()}
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden w-24">
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${row.prob}%` }}
                                                                transition={{ duration: 1, ease: "easeOut" }}
                                                                className={cn(
                                                                    "h-full rounded-full",
                                                                    row.prob >= 80 ? "bg-emerald-500" : row.prob >= 60 ? "bg-amber-500" : "bg-slate-500"
                                                                )}
                                                            />
                                                        </div>
                                                        <span className={cn("text-xs font-bold", row.prob >= 80 ? "text-emerald-400" : "text-white/60")}>
                                                            {row.prob}%
                                                        </span>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* IA Insight Banner - Glassmorphism */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative p-6 rounded-2xl overflow-hidden group shadow-2xl mt-12"
                    >
                        {/* Background with blur and color overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#ff4d4d]/10 via-transparent to-transparent backdrop-blur-xl border border-white/10" />
                        <div className="absolute inset-0 bg-[radial-memory(circle_at_top_left,rgba(255,77,77,0.1),transparent_70%)] opacity-30" />

                        <div className="relative flex items-center gap-5">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff4d4d] to-[#c73e3e] flex items-center justify-center shadow-lg shadow-[#ff4d4d]/20">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                                    Insight de IA
                                    <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-white/60 font-medium">RECOMENDADO</span>
                                </h4>
                                <p className="text-white/70 leading-relaxed max-w-2xl">
                                    <span className="text-white font-semibold">Alpha Manufacturing</span> tiene una alta probabilidad de cierre (92%). Se recomienda programar una reunión técnica para definir los entregables finales.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Toast Notification */}
                <AnimatePresence>
                    {notification && (
                        <motion.div
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.9 }}
                            className="fixed bottom-8 right-8 z-[110] bg-[#1c222d] border border-white/10 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3"
                        >
                            {notification.includes("éxito") ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            ) : (
                                <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                            )}
                            <span className="text-sm font-medium">{notification}</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* New Client Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-md bg-[#151a24] border border-white/10 rounded-2xl shadow-3xl overflow-hidden"
                        >
                            <div className="p-6 border-b border-white/5 flex items-center justify-between">
                                <h3 className="text-xl font-bold">Nuevo Cliente</h3>
                                <button onClick={() => setIsModalOpen(false)} className="text-white/40 hover:text-white transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Nombre de la Empresa</label>
                                    <div className="relative">
                                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                        <input
                                            type="text"
                                            value={newName}
                                            onChange={(e) => setNewName(e.target.value)}
                                            placeholder="Ej: Tesla Inc."
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.07] transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Valor Estimado (USD)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                        <input
                                            type="number"
                                            value={newValue}
                                            onChange={(e) => setNewValue(e.target.value)}
                                            placeholder="0.00"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.07] transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 bg-[#1c222d] flex justify-end gap-3">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-sm font-semibold text-white/60 hover:text-white transition-colors"
                                >
                                    Cancelar
                                </button>
                                <Button
                                    onClick={handleSaveClient}
                                    className="bg-blue-600 hover:bg-blue-500 text-white border-0 px-6 rounded-xl font-bold transition-all disabled:opacity-50"
                                    disabled={!newName || !newValue}
                                >
                                    Guardar Cliente
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
