"use client";

import { motion } from "framer-motion";
import { Terminal, Activity, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

const demos = [
    {
        id: "ai-agent",
        title: "AI Agent Playground",
        desc: "Consola interactiva para configurar y probar agentes RAG en tiempo real.",
        icon: Terminal,
        href: "/demos/ai-agent",
        accentStart: "#2A6B58",
        accentMid: "#3DAA80",
        accentEnd: "#56d9a5",
        accentRgb: "61,170,128",
        iconBg: "linear-gradient(135deg, #1d4d3f 0%, #2A6B58 50%, #3DAA80 100%)",
        iconShadow: "0 4px 18px rgba(61,170,128,0.55)",
    },
    {
        id: "data-lab",
        title: "Data Insights Lab",
        desc: "Visualización de datos industriales y detección de anomalías.",
        icon: Activity,
        href: "/demos/data-lab",
        accentStart: "#1B3A6B",
        accentMid: "#2E5FA3",
        accentEnd: "#5B8FD9",
        accentRgb: "46,95,163",
        iconBg: "linear-gradient(135deg, #0f2040 0%, #1B3A6B 50%, #2E5FA3 100%)",
        iconShadow: "0 4px 18px rgba(46,95,163,0.6)",
    },
    {
        id: "crm",
        title: "CRM Corporativo",
        desc: "Plataforma de gestión de clientes potenciada por inteligencia predictiva.",
        icon: Users,
        href: "/demos/crm",
        accentStart: "#7D1E1E",
        accentMid: "#C0393B",
        accentEnd: "#E8762A",
        accentRgb: "192,57,59",
        iconBg: "linear-gradient(135deg, #4a0f0f 0%, #7D1E1E 45%, #C0393B 75%, #E8762A 100%)",
        iconShadow: "0 4px 18px rgba(192,57,59,0.6)",
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.14 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function DemoHub() {
    return (
        <section
            id="demos"
            className="relative py-28 overflow-hidden"
        >
            {/* Consistent with page background — no override */}

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2
                        className="text-4xl sm:text-5xl font-extrabold mb-4 text-white tracking-tight"
                        style={{ fontFamily: "'Inter', 'Plus Jakarta Sans', sans-serif" }}
                    >
                        Experiencias Interactivas
                    </h2>
                    <p className="max-w-xl mx-auto text-base leading-relaxed" style={{ color: "#8B949E" }}>
                        Explora las capacidades de nuestra plataforma a través de simulaciones funcionales.
                    </p>
                </motion.div>

                {/* Cards */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {demos.map((demo) => {
                        const Icon = demo.icon;
                        const topBar = `linear-gradient(90deg, ${demo.accentStart} 0%, ${demo.accentMid} 60%, ${demo.accentEnd} 100%)`;
                        const glowColor = `rgba(${demo.accentRgb},0.22)`;

                        return (
                            <motion.div
                                key={demo.id}
                                variants={cardVariants}
                                whileHover={{ y: -8, transition: { duration: 0.22, ease: "easeOut" } }}
                                className="group relative flex flex-col"
                            >
                                {/* Card outer border — lights up on hover */}
                                <div
                                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                                    style={{
                                        background: `linear-gradient(135deg, ${demo.accentMid}55 0%, transparent 60%)`,
                                        padding: "1px",
                                    }}
                                />

                                {/* Card shell */}
                                <div
                                    className="relative flex flex-col flex-1 rounded-xl overflow-hidden"
                                    style={{
                                        background: "#161B22",
                                        border: `1px solid rgba(255,255,255,0.08)`,
                                        boxShadow: `
                                            inset 1px 1px 0 rgba(255,255,255,0.09),
                                            inset -1px -1px 0 rgba(0,0,0,0.5),
                                            0 4px 24px rgba(0,0,0,0.4)
                                        `,
                                        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLDivElement).style.borderColor = `rgba(${demo.accentRgb},0.50)`;
                                        (e.currentTarget as HTMLDivElement).style.boxShadow = `
                                            inset 1px 1px 0 rgba(255,255,255,0.09),
                                            inset -1px -1px 0 rgba(0,0,0,0.5),
                                            0 4px 24px rgba(0,0,0,0.4),
                                            0 0 20px ${glowColor}
                                        `;
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)";
                                        (e.currentTarget as HTMLDivElement).style.boxShadow = `
                                            inset 1px 1px 0 rgba(255,255,255,0.09),
                                            inset -1px -1px 0 rgba(0,0,0,0.5),
                                            0 4px 24px rgba(0,0,0,0.4)
                                        `;
                                    }}
                                >
                                    {/* Accent top stripe — brand segmented bar */}
                                    <div style={{ height: "3px", background: topBar }} />

                                    {/* Bottom glow rises on hover */}
                                    <div
                                        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                        style={{
                                            background: `radial-gradient(ellipse 80% 40% at 50% 100%, ${glowColor} 0%, transparent 70%)`,
                                        }}
                                    />

                                    {/* Content */}
                                    <div className="relative flex flex-col flex-1 items-center text-center p-8 pt-9">
                                        {/* Icon — satin 3D */}
                                        <div
                                            className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                                            style={{
                                                background: demo.iconBg,
                                                boxShadow: demo.iconShadow,
                                                outline: "1px solid rgba(255,255,255,0.13)",
                                                outlineOffset: "-1px",
                                            }}
                                        >
                                            <Icon
                                                className="w-8 h-8"
                                                style={{
                                                    color: demo.accentEnd,
                                                    filter: `drop-shadow(0 2px 5px rgba(${demo.accentRgb},0.8))`,
                                                }}
                                            />
                                        </div>

                                        {/* Title */}
                                        <h3
                                            className="text-xl font-bold text-white mb-3"
                                            style={{ fontFamily: "'Inter', 'Plus Jakarta Sans', sans-serif" }}
                                        >
                                            {demo.title}
                                        </h3>

                                        {/* Description */}
                                        <p
                                            className="text-sm leading-relaxed mb-8 flex-1"
                                            style={{ color: "#8B949E" }}
                                        >
                                            {demo.desc}
                                        </p>

                                        {/* CTA Button */}
                                        <div className="mt-auto w-full">
                                            <Link href={demo.href} className="block w-full">
                                                <button
                                                    className="group/btn w-full flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300"
                                                    style={{
                                                        background: "rgba(255,255,255,0.04)",
                                                        border: "1px solid rgba(255,255,255,0.12)",
                                                        color: "#C9D1D9",
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        const el = e.currentTarget;
                                                        el.style.background = `rgba(${demo.accentRgb},0.16)`;
                                                        el.style.borderColor = demo.accentMid;
                                                        el.style.color = "#ffffff";
                                                        el.style.boxShadow = `0 0 12px ${glowColor}`;
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        const el = e.currentTarget;
                                                        el.style.background = "rgba(255,255,255,0.04)";
                                                        el.style.borderColor = "rgba(255,255,255,0.12)";
                                                        el.style.color = "#C9D1D9";
                                                        el.style.boxShadow = "none";
                                                    }}
                                                >
                                                    <span>Iniciar Demo</span>
                                                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
