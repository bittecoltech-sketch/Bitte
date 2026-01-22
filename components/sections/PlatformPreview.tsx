"use client";

import { motion } from "framer-motion";
import { Play, Cloud, Database, Cpu, Shield, Globe, Server } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
    { name: 'Mon', val: 4000 },
    { name: 'Tue', val: 3000 },
    { name: 'Wed', val: 2000 },
    { name: 'Thu', val: 2780 },
    { name: 'Fri', val: 1890 },
    { name: 'Sat', val: 2390 },
    { name: 'Sun', val: 3490 },
];

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

export default function PlatformPreview() {
    return (
        <section className="py-24 relative z-10 overflow-hidden">
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
                            <div className="w-16 md:w-48 border-r border-white/5 pr-6 hidden md:block space-y-4 opacity-50">
                                <div className="h-8 w-full bg-white/10 rounded" />
                                <div className="h-4 w-3/4 bg-white/5 rounded" />
                                <div className="h-4 w-1/2 bg-white/5 rounded" />
                                <div className="h-4 w-2/3 bg-white/5 rounded" />
                            </div>

                            {/* Main Pane */}
                            <div className="flex-1 flex flex-col gap-6">
                                <div className="flex justify-between items-center">
                                    <div className="h-10 w-1/3 bg-white/10 rounded" />
                                    <div className="h-10 w-20 bg-bitte-blue rounded" />
                                </div>

                                {/* Chart */}
                                <div className="h-48 rounded-xl bg-white/5 border border-white/5 p-4 relative overflow-hidden">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={data}>
                                            <defs>
                                                <linearGradient id="colorChart" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <Area type="monotone" dataKey="val" stroke="#3B82F6" fillOpacity={1} fill="url(#colorChart)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="h-24 bg-white/5 rounded-xl border border-white/5" />
                                    <div className="h-24 bg-white/5 rounded-xl border border-white/5" />
                                </div>
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
