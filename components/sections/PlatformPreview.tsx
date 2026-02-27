"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Cloud, Database, Cpu, Shield, Globe, Server, Activity, Zap, Lock, BarChart3, Settings } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const VIEW_DATA = {
    dashboard: {
        chart: [
            { name: 'Mon', val: 4000 }, { name: 'Tue', val: 3000 }, { name: 'Wed', val: 2000 },
            { name: 'Thu', val: 2780 }, { name: 'Fri', val: 1890 }, { name: 'Sat', val: 2390 }, { name: 'Sun', val: 3490 },
        ],
        metrics: [
            { label: "Eficiencia Operativa", val: "94.2%", desc: "Optimización de recursos" },
            { label: "Uptime Sistema", val: "99.99%", desc: "Disponibilidad garantizada" }
        ],
        insight: "Optimiza la carga en horas pico para reducir un 12% adicional en costos operativos."
    },
    agentes: {
        chart: [
            { name: 'Mon', val: 1200 }, { name: 'Tue', val: 4500 }, { name: 'Wed', val: 3200 },
            { name: 'Thu', val: 5600 }, { name: 'Fri', val: 4100 }, { name: 'Sat', val: 2800 }, { name: 'Sun', val: 6200 },
        ],
        metrics: [
            { label: "Agentes Activos", val: "24/24", desc: "Tasa de ejecución 100%" },
            { label: "Interacciones IA", val: "1.2k", desc: "Consultas procesadas hoy" }
        ],
        insight: "3 agentes reportan alta latencia. Considera escalar el clúster regional para mantener el SLO."
    },
    analitica: {
        chart: [
            { name: 'Mon', val: 2000 }, { name: 'Tue', val: 2200 }, { name: 'Wed', val: 5800 },
            { name: 'Thu', val: 4200 }, { name: 'Fri', val: 3100 }, { name: 'Sat', val: 1900 }, { name: 'Sun', val: 2100 },
        ],
        metrics: [
            { label: "Precisión Modelo", val: "97.8%", desc: "Confianza en predicciones" },
            { label: "Data Procesada", val: "4.2TB", desc: "Volumen diario global" }
        ],
        insight: "Se detectó un patrón de anomalía en el flujo de Miércoles. Revisar integridad de fuentes."
    },
    seguridad: {
        chart: [
            { name: 'Mon', val: 5000 }, { name: 'Tue', val: 4800 }, { name: 'Wed', val: 5100 },
            { name: 'Thu', val: 4900 }, { name: 'Fri', val: 5200 }, { name: 'Sat', val: 5050 }, { name: 'Sun', val: 4950 },
        ],
        metrics: [
            { label: "Amenazas Bloqueadas", val: "0", desc: "Perímetro totalmente seguro" },
            { label: "Cifrado Datos", val: "AES-256", desc: "Protección grado militar" }
        ],
        insight: "Certificados SSL expiran en 5 días. La renovación automática está programada para mañana."
    }
};

const logos = [
    { Icon: Cloud, label: "AWS" },
    { Icon: Database, label: "MongoDB" },
    { Icon: Cpu, label: "TensorFlow" },
    { Icon: Shield, label: "Auth0" },
    { Icon: Globe, label: "Vercel" },
    { Icon: Server, label: "Docker" },
    { Icon: Cloud, label: "Azure" },
    { Icon: Database, label: "Postgres" },
];

function InteractiveBox({
    label,
    description,
    className,
    isActive,
    icon: Icon,
    onClick,
    onMouseEnter
}: {
    label: string;
    description: string;
    className: string;
    isActive?: boolean;
    icon?: any;
    onClick?: () => void;
    onMouseEnter?: () => void;
}) {
    return (
        <div
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            className={`relative group/item cursor-pointer ${className} transition-all duration-300 flex items-center px-3 gap-3`}
        >
            {/* Base Box */}
            <div className={`absolute inset-0 transition-all rounded shadow-inner -z-10 ${isActive
                ? "bg-bitte-blue/20 border border-bitte-blue/50"
                : "bg-white/[0.03] group-hover/item:bg-white/[0.08] border border-white/5 group-hover/item:border-bitte-blue/30"
                }`} />

            {/* Icon & Label */}
            {Icon && <Icon className={`w-3.5 h-3.5 transition-colors ${isActive ? 'text-bitte-blue' : 'text-white/40 group-hover/item:text-white/70'}`} />}
            <span className={`text-[10px] font-medium transition-colors hidden md:block whitespace-nowrap ${isActive ? 'text-white' : 'text-white/30 group-hover/item:text-white/60'}`}>
                {label}
            </span>

            {/* Pulse Hotspot Dot */}
            <div className="absolute top-2 right-2 flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-bitte-blue ${isActive ? 'opacity-60' : 'opacity-40'}`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isActive ? 'bg-bitte-blue' : 'bg-bitte-blue/60 group-hover/item:bg-bitte-blue'}`}></span>
            </div>

            {/* Tooltip Content Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                whileHover={{ opacity: 1, scale: 1, y: 0 }}
                className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 p-4 bg-[#151a24] border border-bitte-blue/20 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] pointer-events-none z-50 opacity-0 backdrop-blur-xl transition-opacity"
            >
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-bitte-blue" />
                    <p className="font-bold text-xs text-white uppercase tracking-wider">{label}</p>
                </div>
                <p className="text-[10px] text-bitte-steel leading-relaxed">{description}</p>

                {/* Tooltip Arrow */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 bg-[#151a24] border-r border-b border-bitte-blue/20 rotate-45 -mt-1.5" />
            </motion.div>
        </div>
    );
}

export default function PlatformPreview() {
    const [activeView, setActiveView] = useState<keyof typeof VIEW_DATA>('dashboard');
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const currentData = VIEW_DATA[activeView];
    const activePoint = hoveredIndex !== null ? currentData.chart[hoveredIndex] : null;

    return (
        <section id="datalab" className="py-24 relative z-10 overflow-hidden">
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bitte-blue/10 border border-bitte-blue/20 text-bitte-blue text-xs font-mono mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bitte-blue opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-bitte-blue"></span>
                        </span>
                        Update 2.0 : AI Integration
                    </div>
                    <h2 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-white/50 pb-2">
                        Centraliza tu Inteligencia Industrial
                    </h2>
                    <p className="text-bitte-steel mt-4 text-lg">
                        Monitoreo en tiempo real, gestión de agentes y analítica avanzada en una sola interfaz.
                    </p>
                </div>

                {/* Dashboard Mockup - The Core Visual */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="relative max-w-5xl mx-auto"
                >
                    {/* Main Window */}
                    <div className="relative rounded-2xl bg-[#0F1115] border border-white/10 shadow-2xl overflow-hidden aspect-video md:aspect-[16/9] flex flex-col group">

                        {/* Window Controls */}
                        <div className="h-10 border-b border-white/5 bg-white/5 flex items-center px-4 gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/20" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                            <div className="w-3 h-3 rounded-full bg-green-500/20" />
                        </div>

                        {/* Content Mockup */}
                        <div className="flex-1 flex p-6 gap-6 relative">
                            {/* Sidebar */}
                            <div className="w-16 md:w-48 border-r border-white/5 pr-6 hidden md:block space-y-4">
                                <InteractiveBox
                                    label="Dashboard"
                                    description="Visualización holística de operaciones e infraestructura."
                                    className="h-10 w-full"
                                    icon={BarChart3}
                                    isActive={activeView === 'dashboard'}
                                    onMouseEnter={() => setActiveView('dashboard')}
                                />
                                <InteractiveBox
                                    label="Agentes IA"
                                    description="Gestión de orquestación para agentes autónomos."
                                    className="h-10 w-full"
                                    icon={Zap}
                                    isActive={activeView === 'agentes'}
                                    onMouseEnter={() => setActiveView('agentes')}
                                />
                                <InteractiveBox
                                    label="Analítica"
                                    description="Modelado estocástico basado en datos históricos."
                                    className="h-10 w-full"
                                    icon={Activity}
                                    isActive={activeView === 'analitica'}
                                    onMouseEnter={() => setActiveView('analitica')}
                                />
                                <InteractiveBox
                                    label="Seguridad"
                                    description="Monitoreo de tráfico malicioso y brechas."
                                    className="h-10 w-full"
                                    icon={Lock}
                                    isActive={activeView === 'seguridad'}
                                    onMouseEnter={() => setActiveView('seguridad')}
                                />
                            </div>

                            {/* Main Pane */}
                            <div className="flex-1 flex flex-col gap-6">
                                <div className="flex justify-between items-center text-[10px] font-bold tracking-widest uppercase text-white/40">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-bitte-blue animate-pulse" />
                                        <span>Proyecto: Data Pipeline v2.4</span>
                                    </div>
                                    <div className="bg-bitte-blue/10 border border-bitte-blue/20 px-3 py-1 rounded text-bitte-blue">
                                        LIVE
                                    </div>
                                </div>

                                {/* Chart */}
                                <div className="h-48 rounded-xl bg-white/5 border border-white/5 p-4 relative overflow-hidden">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeView}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="h-full w-full"
                                        >
                                            <ResponsiveContainer width="100%" height="100%">
                                                <AreaChart
                                                    data={currentData.chart}
                                                    onMouseMove={(e: any) => {
                                                        if (e && e.activeTooltipIndex !== undefined) {
                                                            setHoveredIndex(e.activeTooltipIndex);
                                                        }
                                                    }}
                                                    onMouseLeave={() => setHoveredIndex(null)}
                                                >
                                                    <defs>
                                                        <linearGradient id="colorChart" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                                        </linearGradient>
                                                    </defs>
                                                    <Tooltip
                                                        content={() => null}
                                                        active={true}
                                                    />
                                                    <Area
                                                        type="monotone"
                                                        dataKey="val"
                                                        stroke="#3B82F6"
                                                        strokeWidth={3}
                                                        fillOpacity={1}
                                                        fill="url(#colorChart)"
                                                        animationDuration={1000}
                                                        activeDot={{ r: 6, strokeWidth: 0, fill: '#3B82F6' }}
                                                    />
                                                </AreaChart>
                                            </ResponsiveContainer>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {currentData.metrics.map((metric, i) => (
                                        <motion.div
                                            key={`${activeView}-${i}`}
                                            className="h-24 bg-white/5 rounded-xl border border-white/5 p-4 flex flex-col justify-center relative overflow-hidden"
                                        >
                                            <p className="text-[8px] font-bold text-bitte-blue uppercase tracking-widest mb-1">{metric.label}</p>
                                            <motion.p
                                                key={activePoint ? `${activePoint.val}-${i}` : 'static'}
                                                initial={{ opacity: 0.5, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="text-2xl font-black text-white"
                                            >
                                                {activePoint
                                                    ? `${(activePoint.val / (i === 0 ? 50 : 100)).toFixed(1)}${i === 0 ? '%' : 'k'}`
                                                    : metric.val
                                                }
                                            </motion.p>
                                            <p className="text-[8px] text-bitte-steel mt-1 uppercase tracking-tighter">
                                                {activePoint ? `Dato Real: ${activePoint.name}` : metric.desc}
                                            </p>

                                            {activePoint && (
                                                <motion.div
                                                    layoutId="glow"
                                                    className="absolute inset-0 bg-bitte-blue/5 animate-pulse"
                                                />
                                            )}
                                        </motion.div>
                                    ))}
                                </div>

                                {/* AI Insight Banner */}
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeView}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="mt-auto p-4 rounded-xl bg-bitte-blue/5 border border-bitte-blue/20 flex items-center gap-4 group/insight"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-bitte-blue/10 flex items-center justify-center flex-shrink-0 border border-bitte-blue/20 group-hover/insight:scale-110 transition-transform">
                                            <Zap className="w-5 h-5 text-bitte-blue" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[10px] font-bold text-bitte-blue uppercase tracking-widest">Consejo de IA</span>
                                                <div className="h-1 w-1 rounded-full bg-bitte-blue/40" />
                                                <span className="text-[10px] text-white/40 font-mono tracking-tighter">Procesado en tiempo real</span>
                                            </div>
                                            <p className="text-xs text-white/80 leading-relaxed font-medium">
                                                {currentData.insight}
                                            </p>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm opacity-100 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none">
                            <div className="w-20 h-20 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                                <Play className="w-8 h-8 text-white fill-white ml-1" />
                            </div>
                        </div>
                    </div>

                    {/* Glow Effect behind dashboard */}
                    <div className="absolute -inset-10 bg-bitte-blue/20 blur-[100px] -z-10 rounded-full opacity-50" />
                </motion.div>

                {/* Logo Marquee */}
                <div className="mt-20 relative">
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-bitte-base to-transparent z-10" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-bitte-base to-transparent z-10" />

                    <div className="flex gap-16 items-center justify-center opacity-50 grayscale hover:grayscale-0 transition-all duration-500 overflow-hidden">
                        <div className="flex gap-16 animate-infinite-scroll min-w-max">
                            {[...logos, ...logos].map((logo, i) => (
                                <div key={i} className="flex items-center gap-2 text-white/60">
                                    <logo.Icon className="w-6 h-6" />
                                    <span className="font-bold text-lg">{logo.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
