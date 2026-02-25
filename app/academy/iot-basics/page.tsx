"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronRight,
    Clock,
    BarChart,
    Award,
    CheckCircle,
    ChevronDown,
    Play,
    FileText,
    ArrowRight,
    Cpu,
    Wifi,
    Settings,
    Activity
} from "lucide-react";
import Link from "next/link";

const curriculum = [
    {
        title: "Módulo 1: Introducción al Ecosistema IoT",
        lessons: [
            { title: "Arquitectura de un sistema IoT", duration: "15 min", type: "video" },
            { title: "Protocolos de comunicación (MQTT, HTTP, LoRaWAN)", duration: "30 min", type: "video" },
            { title: "Hardware: Microcontroladores y Sensores", duration: "25 min", type: "reading" },
        ]
    },
    {
        title: "Módulo 2: Configuración de Hardware y Sensores",
        lessons: [
            { title: "Instalación del entorno de desarrollo", duration: "20 min", type: "video" },
            { title: "Lectura de datos analógicos y digitales", duration: "35 min", type: "video" },
            { title: "Calibración y procesamiento en el Edge", duration: "20 min", type: "video" },
        ]
    },
    {
        title: "Módulo 3: Conectividad y Nube",
        lessons: [
            { title: "Conexión a plataformas Cloud (Azure/AWS IoT)", duration: "45 min", type: "video" },
            { title: "Almacenamiento de series temporales", duration: "20 min", type: "reading" },
            { title: "Seguridad y encriptación en la transmisión", duration: "30 min", type: "video" },
        ]
    },
    {
        title: "Módulo 4: Visualización y Alertas en Tiempo Real",
        lessons: [
            { title: "Creación de Dashboards de monitoreo", duration: "30 min", type: "video" },
            { title: "Configuración de triggers y alertas", duration: "25 min", type: "video" },
            { title: "Proyecto Final: Sistema de monitoreo industrial", duration: "40 min", type: "video" },
        ]
    }
];

const ACCENT_COLOR = "#F59E0B"; // Amber
const ACCENT_BG = "rgba(245, 158, 11, 0.1)";

export default function IoTBasicsDetail() {
    const [openModule, setOpenModule] = useState<number | null>(0);

    return (
        <main className="min-h-screen pt-20" style={{ background: "#0B0F19" }}>
            {/* 1. SECTION HERO */}
            <section className="relative py-20 border-b border-white/5 overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                    style={{
                        background: `radial-gradient(circle at 50% -20%, ${ACCENT_COLOR}26 0%, transparent 70%)`,
                    }}
                />

                <div className="container mx-auto px-6 relative z-10">
                    <nav className="flex items-center gap-2 text-sm text-bitte-steel mb-8">
                        <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link href="/academy" className="hover:text-white transition-colors">Academy</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white font-medium">IoT Basics</span>
                    </nav>

                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(245,158,11,0.1)] border"
                            style={{ background: ACCENT_BG, borderColor: `${ACCENT_COLOR}33`, color: ACCENT_COLOR }}>
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: ACCENT_COLOR }}></span>
                                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: ACCENT_COLOR }}></span>
                            </span>
                            Curso Online
                        </div>

                        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
                            IoT Basics
                        </h1>

                        <p className="text-xl text-bitte-steel mb-8 max-w-2xl leading-relaxed">
                            Aprende a conectar el mundo físico con el digital. Desde sensores básicos hasta integración en la nube para monitoreo industrial.
                        </p>

                        <div className="flex flex-wrap gap-6 text-sm">
                            <div className="flex items-center gap-2 text-white">
                                <Clock className="w-5 h-5" style={{ color: ACCENT_COLOR }} />
                                <span>Duración: 5 Semanas</span>
                            </div>
                            <div className="flex items-center gap-2 text-white">
                                <BarChart className="w-5 h-5" style={{ color: ACCENT_COLOR }} />
                                <span>Nivel: Principiante - Intermedio</span>
                            </div>
                            <div className="flex items-center gap-2 text-white">
                                <Award className="w-5 h-5" style={{ color: ACCENT_COLOR }} />
                                <span>Certificado Incluido</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. MAIN LAYOUT GRID */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                        <div className="lg:col-span-8 space-y-16">
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-8 border-l-4 pl-4" style={{ borderColor: ACCENT_COLOR }}>¿Qué aprenderás?</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        "Arquitecturas escalables para soluciones de IoT.",
                                        "Programación de microcontroladores y gestión de sensores.",
                                        "Protocolos de comunicación industrial (MQTT).",
                                        "Visualización de datos en tiempo real y alertas."
                                    ].map((item, i) => (
                                        <div key={i} className="p-6 rounded-xl bg-[#161B22] border border-white/5 flex gap-4 transition-all hover:bg-white/5 active:scale-[0.98]">
                                            <div className="flex-shrink-0">
                                                <div className="w-6 h-6 rounded-full flex items-center justify-center border"
                                                    style={{ background: `${ACCENT_COLOR}33`, borderColor: `${ACCENT_COLOR}4D`, boxShadow: `0 0 10px ${ACCENT_COLOR}33` }}>
                                                    <CheckCircle className="w-4 h-4" style={{ color: ACCENT_COLOR }} />
                                                </div>
                                            </div>
                                            <p className="text-bitte-steel text-sm leading-relaxed">{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div id="syllabus">
                                <h2 className="text-3xl font-bold text-white mb-8 border-l-4 pl-4" style={{ borderColor: ACCENT_COLOR }}>Temario del Curso</h2>
                                <div className="space-y-4">
                                    {curriculum.map((module, mIndex) => (
                                        <div key={mIndex} className="rounded-xl border border-white/5 bg-[#161B22] overflow-hidden transition-all duration-300">
                                            <button
                                                onClick={() => setOpenModule(openModule === mIndex ? null : mIndex)}
                                                className="w-full h-16 px-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                                            >
                                                <span className="text-lg font-bold text-white pr-4">{module.title}</span>
                                                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openModule === mIndex ? 'rotate-180' : ''}`} style={{ color: ACCENT_COLOR }} />
                                            </button>

                                            <AnimatePresence>
                                                {openModule === mIndex && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        <div className="p-6 pt-0 space-y-2">
                                                            {module.lessons.map((lesson, lIndex) => (
                                                                <div key={lIndex} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-white/5">
                                                                    <div className="flex items-center gap-3">
                                                                        {lesson.type === 'video' ? (
                                                                            <Play className="w-4 h-4 transition-transform group-hover:scale-110" style={{ color: ACCENT_COLOR }} />
                                                                        ) : (
                                                                            <FileText className="w-4 h-4 text-bitte-steel group-hover:text-white transition-colors" />
                                                                        )}
                                                                        <span className="text-sm text-bitte-steel group-hover:text-white transition-colors">{lesson.title}</span>
                                                                    </div>
                                                                    <span className="text-xs text-bitte-steel font-mono">{lesson.duration}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold text-white mb-8 border-l-4 pl-4" style={{ borderColor: ACCENT_COLOR }}>Requisitos</h2>
                                <ul className="space-y-4">
                                    {[
                                        "Curiosidad por el hardware y la electrónica.",
                                        "Conocimientos fundamentales de lógica de programación (deseable).",
                                        "PC con conexión a internet estable.",
                                        "No se requiere hardware previo (usaremos simuladores y guiaremos compras)."
                                    ].map((req, i) => (
                                        <li key={i} className="flex gap-4 items-center group">
                                            <div className="w-2 h-2 rounded-full group-hover:scale-150 transition-transform shadow-[0_0_10px_rgba(245,158,11,0.8)]" style={{ background: ACCENT_COLOR }} />
                                            <span className="text-bitte-steel">{req}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* RIGHT COLUMN */}
                        <div className="lg:col-span-4 lg:relative">
                            <div className="lg:sticky lg:top-28 space-y-6">
                                <div className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl transition-all hover:border-white/20 group/card"
                                    style={{
                                        background: "rgba(22, 27, 34, 0.6)",
                                        backdropFilter: "blur(12px)",
                                        WebkitBackdropFilter: "blur(12px)",
                                        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)"
                                    }}>

                                    <div className="h-1 w-full opacity-50 group-hover:opacity-100 transition-opacity" style={{ background: ACCENT_COLOR }} />

                                    <div className="p-1">
                                        <img
                                            src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80&fit=crop"
                                            alt="IoT Basics"
                                            className="w-full aspect-video object-cover rounded-xl"
                                        />
                                    </div>

                                    <div className="p-8">
                                        <div className="space-y-2 mb-8">
                                            <h4 className="text-white text-xl font-bold">Consultar Disponibilidad</h4>
                                            <p className="text-bitte-steel text-sm leading-relaxed">
                                                Conecta tus activos industriales y digitaliza tu operación con expertos en hardware.
                                            </p>
                                        </div>

                                        <Link href="https://wa.me/573000000000?text=Hola,%20quisiera%20más%20información%20sobre%20el%20curso%20IoT%20Basics" target="_blank" className="block w-full mb-6">
                                            <button className="w-full py-4 rounded-xl font-bold text-white relative flex items-center justify-center gap-2 overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] group/btn">
                                                <div className="absolute inset-0 z-0 transition-all group-hover:opacity-90" style={{ background: `linear-gradient(to right, ${ACCENT_COLOR}, #D97706)`, boxShadow: `0 4px 20px ${ACCENT_COLOR}40` }} />
                                                <span className="relative z-10 font-bold uppercase tracking-wider text-sm">Contactar Asesor</span>
                                                <ArrowRight className="relative z-10 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                            </button>
                                        </Link>

                                        <div className="space-y-4 pt-4 border-t border-white/5">
                                            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Este curso incluye:</h4>
                                            <div className="flex items-center gap-3 text-sm text-bitte-steel">
                                                <Cpu className="w-4 h-4" style={{ color: ACCENT_COLOR }} />
                                                <span>Guía de kits de hardware</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-bitte-steel">
                                                <Wifi className="w-4 h-4" style={{ color: ACCENT_COLOR }} />
                                                <span>Protocolos de red avanzada</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-bitte-steel">
                                                <Settings className="w-4 h-4" style={{ color: ACCENT_COLOR }} />
                                                <span>Proyectos de automatización</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-bitte-steel">
                                                <Activity className="w-4 h-4" style={{ color: ACCENT_COLOR }} />
                                                <span>Monitoreo en tiempo real</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
