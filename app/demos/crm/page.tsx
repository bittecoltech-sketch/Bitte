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
    CheckCircle2,
    TrendingUp,
    ArrowUpRight,
    Search,
    Clock,
    User,
    Bell,
    Shield
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const SIDEBAR_ITEMS = [
    { id: "clientes", name: "Clientes", icon: Users },
    { id: "ventas", name: "Ventas", icon: BarChart3 },
    { id: "agenda", name: "Agenda", icon: Calendar },
    { id: "config", name: "Config", icon: Settings },
];

const INITIAL_CLIENTS = [
    { name: "TechCorp Industries", status: "Negociación", val: 45000, prob: 85 },
    { name: "Global Logistics", status: "Propuesta", val: 12500, prob: 60 },
    { name: "Alpha Manufacturing", status: "Cierre", val: 120000, prob: 92 },
    { name: "Solaris Energy", status: "Lead", val: 8000, prob: 45 },
];

export default function CRMPage() {
    const [activeTab, setActiveTab] = useState("clientes");
    const [salesFilter, setSalesFilter] = useState("30d");
    const [selectedClient, setSelectedClient] = useState(INITIAL_CLIENTS[2].name); // Default to Alpha
    const [clients, setClients] = useState(INITIAL_CLIENTS);
    const [events, setEvents] = useState([
        { time: "09:30 AM", title: "Review con TechCorp", type: "Reunión Técnica", color: "border-blue-500" },
        { time: "11:00 AM", title: "Cierre Solaris Energy", type: "Ventas", color: "border-emerald-500" },
        { time: "02:00 PM", title: "Feedback Bitte Tech", type: "Interna", color: "border-amber-500" },
        { time: "04:30 PM", title: "Demo IA Pipeline", type: "Sincronización", color: "border-purple-500" },
    ]);
    const [settings, setSettings] = useState({
        insights: true,
        push: true,
        privacy: false
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    const [notification, setNotification] = useState<string | null>(null);

    // Form State Client
    const [newName, setNewName] = useState("");
    const [newValue, setNewValue] = useState("");

    // Form State Event
    const [newEvTitle, setNewEvTitle] = useState("");
    const [newEvTime, setNewEvTime] = useState("");

    const handleRowClick = (company: string) => {
        setNotification(`Cargando detalles de ${company}...`);
        setTimeout(() => {
            setNotification(`Detalles de ${company} cargados con éxito`);
            setSelectedClient(company);
            setTimeout(() => setNotification(null), 2000);
        }, 1500);
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
        setNotification(`¡Cliente ${newName} añadido con éxito!`);
        setTimeout(() => setNotification(null), 3000);
    };

    const handleSaveEvent = () => {
        if (!newEvTitle || !newEvTime) return;

        // Basic normalization: Ensure there's a space before AM/PM if not present
        let formattedTime = newEvTime.trim().toUpperCase();
        if (!formattedTime.includes(" ") && (formattedTime.endsWith("AM") || formattedTime.endsWith("PM"))) {
            formattedTime = formattedTime.replace(/(AM|PM)/, " $1");
        }

        const newEvent = {
            time: formattedTime,
            title: newEvTitle,
            type: "Nuevo Evento",
            color: "border-purple-500"
        };

        setEvents([newEvent, ...events]); // Prepend for immediate visibility
        setIsEventModalOpen(false);
        setNewEvTitle("");
        setNewEvTime("");
        setNotification(`Evento "${newEvTitle}" agendado`);
        setTimeout(() => setNotification(null), 3000);
    };

    const toggleSetting = (key: keyof typeof settings) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const CLIENT_INSIGHTS: Record<string, { text: string; probability: string }> = {
        "TechCorp Industries": {
            text: "Negociación avanzada. Se requiere revisión de contrato legal antes del viernes.",
            probability: "85%"
        },
        "Global Logistics": {
            text: "Propuesta enviada. El cliente solicitó un descuento por volumen. Evaluar margen.",
            probability: "60%"
        },
        "Alpha Manufacturing": {
            text: "Alta probabilidad de cierre. Se recomienda programar una reunión técnica final.",
            probability: "92%"
        },
        "Solaris Energy": {
            text: "Nuevo lead cualificado. Necesita presentación de capacidades de IA Generativa.",
            probability: "45%"
        }
    };

    const renderClientsView = () => {
        const currentInsight = CLIENT_INSIGHTS[selectedClient] || {
            text: "Cliente recién añadido. Analizando datos para generar insight...",
            probability: "10-20%"
        };

        return (
            <div className="space-y-6">
                <div className="bg-[#151a24] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/[0.02]">
                                <th className="px-6 py-4 text-[10px] font-bold text-white/30 uppercase tracking-widest">Empresa</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-white/30 uppercase tracking-widest">Estado</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-white/30 uppercase tracking-widest text-right lg:text-left">Valor</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-white/30 uppercase tracking-widest hidden md:table-cell">Probabilidad IA</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            <AnimatePresence initial={false}>
                                {clients.map((client, i) => (
                                    <motion.tr
                                        layout
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        key={client.name}
                                        onClick={() => handleRowClick(client.name)}
                                        className={cn(
                                            "group cursor-pointer transition-colors duration-150 relative bg-transparent hover:bg-white/[0.02]",
                                            selectedClient === client.name && "bg-blue-500/5"
                                        )}
                                    >
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                                                    <Building2 className="w-4 h-4" />
                                                </div>
                                                <span className="font-semibold text-white/90 group-hover:text-white transition-all">{client.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={cn(
                                                "px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-white/70",
                                                client.status === "Cierre" && "text-emerald-400 bg-emerald-400/5 border-emerald-400/10",
                                                client.status === "Negociación" && "text-blue-400 bg-blue-400/5 border-blue-400/10",
                                                client.status === "Propuesta" && "text-amber-400 bg-amber-400/5 border-amber-400/10"
                                            )}>
                                                {client.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-bold tracking-tight text-right lg:text-left">${client.val.toLocaleString()}</td>
                                        <td className="px-6 py-4 hidden md:table-cell">
                                            <div className="flex items-center gap-3">
                                                <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${client.prob}%` }}
                                                        className={cn(
                                                            "h-full rounded-full transition-all duration-1000",
                                                            client.prob > 80 ? "bg-emerald-500" :
                                                                client.prob > 50 ? "bg-amber-500" : "bg-white/20"
                                                        )}
                                                    />
                                                </div>
                                                <span className={cn(
                                                    "text-[10px] font-bold min-w-[30px]",
                                                    client.prob > 80 ? "text-emerald-500" : "text-white/30"
                                                )}>{client.prob}%</span>
                                            </div>
                                        </td>
                                        {selectedClient === client.name && (
                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-full" />
                                        )}
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                {/* IA Insight Banner - Glassmorphism */}
                <motion.div
                    key={selectedClient}
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
                                <span className="text-white font-semibold">{selectedClient}</span> tiene una probabilidad de cierre del ({currentInsight.probability}). {currentInsight.text}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    };


    const getChartData = () => {
        const data: Record<string, number[]> = {
            "7d": [20, 35, 15, 40, 30, 45, 25],
            "30d": [40, 65, 45, 90, 100, 80, 55, 70, 85, 95, 60, 75],
            "90d": [10, 25, 40, 30, 55, 70, 85, 60, 45, 90, 100, 80, 55, 70, 85, 95, 60, 75, 40, 65, 45, 90, 100, 80]
        };
        return data[salesFilter] || data["30d"];
    };

    const renderSalesView = () => (
        <div className="space-y-8">
            {/* Sales Stats Overlay Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Monto Total", val: salesFilter === "7d" ? "$42,100" : salesFilter === "90d" ? "$580,200" : "$185,400", trend: "+12%", icon: DollarSign, color: "text-emerald-400" },
                    { label: "Ventas Cerradas", val: salesFilter === "7d" ? "4" : salesFilter === "90d" ? "72" : "24", trend: "+5", icon: TrendingUp, color: "text-blue-400" },
                    { label: "Pipeline Activo", val: "$450,000", trend: "7 leads", icon: Sparkles, color: "text-[#ff4d4d]" },
                ].map((stat, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={stat.label}
                        className="p-6 rounded-2xl bg-[#151a24] border border-white/5 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <stat.icon className="w-16 h-16" />
                        </div>
                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">{stat.label}</p>
                        <h3 className="text-2xl lg:text-3xl font-bold mb-2">{stat.val}</h3>
                        <div className={cn("text-xs font-semibold flex items-center gap-1", stat.color)}>
                            <ArrowUpRight className="w-3 h-3" />
                            {stat.trend} <span className="text-white/30 ml-1 font-normal">este mes</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Performance Chart Placeholder (Styled) */}
            <div className="bg-[#151a24] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="font-bold text-lg">Rendimiento {salesFilter === "7d" ? "Semanal" : salesFilter === "90d" ? "Trimestral" : "Mensual"}</h3>
                    <div className="flex gap-2">
                        {['7d', '30d', '90d'].map(t => (
                            <button
                                key={t}
                                onClick={() => setSalesFilter(t)}
                                className={cn(
                                    "px-3 py-1 rounded-lg border text-[10px] font-bold transition-all",
                                    salesFilter === t
                                        ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20"
                                        : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10"
                                )}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="h-48 flex items-end gap-1.5 lg:gap-3 px-2">
                    <AnimatePresence mode="popLayout">
                        {getChartData().map((h, i) => (
                            <motion.div
                                key={`${salesFilter}-${i}`}
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: `${h}%`, opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ delay: i * 0.02, duration: 0.5 }}
                                className={cn(
                                    "flex-1 rounded-t-sm lg:rounded-t-lg transition-all relative group",
                                    h > 90 ? "bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]" : "bg-white/10 hover:bg-white/20"
                                )}
                            >
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1c222d] px-2 py-1 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                                    ${h}k
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
                <div className="flex justify-between mt-4 text-[10px] font-bold text-white/20 uppercase px-2">
                    {salesFilter === "7d" ? (
                        <><span>Lun</span><span>Dom</span></>
                    ) : salesFilter === "90d" ? (
                        <><span>Ene</span><span>Mar</span></>
                    ) : (
                        <><span>Sem 1</span><span>Sem 4</span></>
                    )}
                </div>
            </div>

            {/* Sales IA Insight Banner */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative p-6 rounded-2xl overflow-hidden group shadow-2xl"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent backdrop-blur-xl border border-white/10" />
                <div className="relative flex items-center gap-5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                        <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                        <h4 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                            Optimización de Ventas
                            <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-white/60 font-medium">IA SUGGESTION</span>
                        </h4>
                        <p className="text-white/70 leading-relaxed max-w-2xl">
                            Tu pipeline actual es de <span className="text-white font-semibold">$450,000</span>. Si cierras el trato con <span className="text-emerald-400 font-bold">Alpha Manufacturing</span>, superarás tu meta mensual en un <span className="text-emerald-400 font-bold">15%</span>.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );

    const renderCalendarView = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-xl">Próximos Eventos</h3>
                <Button className="bg-white/5 border border-white/10 text-xs h-8 px-3 rounded-lg hover:bg-white/10 font-bold">Hoy</Button>
            </div>

            <div className="space-y-4">
                {events.map((event, i) => {
                    const timeParts = event.time.split(' ');
                    const period = timeParts.length > 1 ? timeParts[1] : "";
                    const time = timeParts[0];

                    return (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            key={`${event.title}-${i}`}
                            className={cn("bg-[#151a24] border-l-4 p-5 rounded-xl flex items-center gap-6", event.color)}
                        >
                            <div className="flex flex-col items-center min-w-[60px]">
                                <span className="text-xs font-bold text-white/40">{period || "H"}</span>
                                <span className="text-lg font-bold tracking-tighter">{time}</span>
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold mb-0.5">{event.title}</h4>
                                <span className="text-[10px] text-white/30 uppercase font-bold tracking-widest">{event.type}</span>
                            </div>
                            <Button className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 p-0 flex items-center justify-center hover:bg-white/10">
                                <ArrowUpRight className="w-4 h-4 text-white/40" />
                            </Button>
                        </motion.div>
                    );
                })}
            </div>

            {/* AI Scheduling Tip */}
            <div className="p-6 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex gap-4 mt-8">
                <Clock className="w-6 h-6 text-blue-400 mt-1" />
                <div>
                    <h4 className="font-bold text-blue-400 mb-1">Optimizador de Agenda</h4>
                    <p className="text-sm text-blue-400/70 leading-relaxed">
                        He detectado que las reuniones de los jueves por la mañana tienen un 15% más de tasa de cierre. ¿Quieres mover la sesión de solaris?
                    </p>
                </div>
            </div>
        </div>
    );

    const renderSettingsView = () => (
        <div className="max-w-2xl space-y-8">
            <section className="space-y-4">
                <h3 className="font-bold text-xl mb-6">Configuración de Cuenta</h3>
                <div className="bg-[#151a24] border border-white/5 rounded-2xl p-6 space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-2xl font-bold">
                            JG
                        </div>
                        <div>
                            <h4 className="font-bold text-lg">Juan Garzón</h4>
                            <p className="text-white/40 text-sm">Administrador · Bitte CRM</p>
                        </div>
                        <Button className="ml-auto bg-white/5 border border-white/10 text-xs px-4 h-9 rounded-xl font-bold hover:bg-white/10">Editar</Button>
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <h3 className="font-bold text-lg">Sistema y Notificaciones IA</h3>
                <div className="bg-[#151a24] border border-white/5 rounded-2xl divide-y divide-white/5">
                    {[
                        { id: "insights", title: "Insights de IA Automáticos", desc: "Recibir sugerencias de cierre en tiempo real.", icon: Sparkles },
                        { id: "push", title: "Notificaciones Push", desc: "Alertas inmediatas sobre nuevos leads.", icon: Bell },
                        { id: "privacy", title: "Privacidad de Datos", desc: "Encriptar nombres de clientes en modo público.", icon: Shield },
                    ].map((pref, i) => (
                        <div key={pref.title} className="p-6 flex items-center justify-between group">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/30 group-hover:text-blue-400 group-hover:bg-blue-500/10 transition-all">
                                    <pref.icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <h5 className="font-bold text-sm tracking-tight">{pref.title}</h5>
                                    <p className="text-white/30 text-[11px] font-medium">{pref.desc}</p>
                                </div>
                            </div>
                            <div
                                onClick={() => toggleSetting(pref.id as keyof typeof settings)}
                                className={cn(
                                    "w-10 h-5 rounded-full relative transition-all duration-300 cursor-pointer",
                                    settings[pref.id as keyof typeof settings] ? "bg-blue-600" : "bg-white/10"
                                )}
                            >
                                <div className={cn(
                                    "absolute top-1 w-3 h-3 rounded-full bg-white transition-all duration-300",
                                    settings[pref.id as keyof typeof settings] ? "right-1" : "left-1"
                                )} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-[#0b0e14] text-white font-sans selection:bg-blue-500/30 pt-20">
            {/* Sidebar */}
            <aside className="w-20 lg:w-64 border-r border-white/5 bg-[#0e121a] flex flex-col transition-all duration-300 fixed lg:sticky top-20 left-0 h-[calc(100vh-5rem)] z-20">
                <div className="p-6 hidden lg:block">
                    <div className="flex items-center gap-2 text-xl font-bold tracking-tight">
                        <span className="bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">Bitte</span>
                        <span className="text-[#ff4d4d]">CRM</span>
                    </div>
                </div>

                <nav className="flex-1 px-3 space-y-2 mt-4">
                    {SIDEBAR_ITEMS.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={cn(
                                "flex items-center justify-center lg:justify-start gap-3 w-full px-4 py-3 rounded-xl transition-all duration-200 group relative",
                                activeTab === item.id
                                    ? "bg-blue-600/10 text-blue-400 shadow-[inset_0_0_20px_rgba(59,130,246,0.05)]"
                                    : "text-white/40 hover:text-white hover:bg-white/5"
                            )}
                        >
                            {activeTab === item.id && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute left-0 w-1 h-6 bg-blue-500 rounded-r-full"
                                />
                            )}
                            <item.icon className={cn("w-5 h-5", activeTab === item.id && "text-blue-400")} />
                            <span className="font-medium hidden lg:block">{item.name}</span>
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto relative ml-0 lg:ml-0">
                {/* Header */}
                <header className="sticky top-0 z-10 flex items-center justify-between p-6 bg-[#0b0e14]/80 backdrop-blur-md border-b border-white/5">
                    <div className="flex items-center gap-4">
                        <div className="lg:hidden text-lg font-bold">
                            <span className="text-white">B</span><span className="text-[#ff4d4d]">C</span>
                        </div>
                        <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-white/90">
                            {SIDEBAR_ITEMS.find(i => i.id === activeTab)?.name}
                        </h1>
                    </div>
                    {activeTab === "clientes" && (
                        <Button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-blue-600 hover:bg-blue-500 text-white border-0 shadow-lg shadow-blue-600/20 px-4 lg:px-6 h-10 lg:h-11 rounded-xl gap-2 font-semibold transition-all hover:scale-[1.02]"
                        >
                            <Plus className="w-5 h-5" />
                            <span className="hidden sm:inline">Nuevo Cliente</span>
                        </Button>
                    )}
                    {activeTab === "agenda" && (
                        <Button
                            onClick={() => setIsEventModalOpen(true)}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white border-0 shadow-lg shadow-emerald-600/20 px-4 lg:px-6 h-10 lg:h-11 rounded-xl gap-2 font-semibold transition-all hover:scale-[1.02]"
                        >
                            <Plus className="w-5 h-5" />
                            <span className="hidden sm:inline">Nuevo Evento</span>
                        </Button>
                    )}
                </header>

                <div className="p-6 lg:p-10 space-y-6 max-w-7xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {activeTab === "clientes" && renderClientsView()}
                            {activeTab === "ventas" && renderSalesView()}
                            {activeTab === "agenda" && renderCalendarView()}
                            {activeTab === "config" && renderSettingsView()}
                        </motion.div>
                    </AnimatePresence>
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
            {/* New Event Modal */}
            <AnimatePresence>
                {isEventModalOpen && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsEventModalOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-md bg-[#151a24] border border-white/10 rounded-2xl shadow-3xl overflow-hidden"
                        >
                            <div className="p-6 border-b border-white/5 flex items-center justify-between">
                                <h3 className="text-xl font-bold">Nuevo Evento</h3>
                                <button onClick={() => setIsEventModalOpen(false)} className="text-white/40 hover:text-white transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Título del Evento</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                        <input
                                            type="text"
                                            value={newEvTitle}
                                            onChange={(e) => setNewEvTitle(e.target.value)}
                                            placeholder="Ej: Reunión con TechCorp"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.07] transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Hora</label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                        <input
                                            type="text"
                                            value={newEvTime}
                                            onChange={(e) => setNewEvTime(e.target.value)}
                                            placeholder="Ej: 10:00 AM"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.07] transition-all"
                                        />
                                    </div>
                                    <p className="text-[9px] text-white/20 italic">Formato recomendado: HH:MM AM/PM</p>
                                </div>
                            </div>
                            <div className="p-6 bg-[#1c222d] flex justify-end gap-3">
                                <button
                                    onClick={() => setIsEventModalOpen(false)}
                                    className="px-4 py-2 text-sm font-semibold text-white/60 hover:text-white transition-colors"
                                >
                                    Cancelar
                                </button>
                                <Button
                                    onClick={handleSaveEvent}
                                    className="bg-emerald-600 hover:bg-emerald-500 text-white border-0 px-6 rounded-xl font-bold transition-all disabled:opacity-50"
                                    disabled={!newEvTitle || !newEvTime}
                                >
                                    Agendar Evento
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
