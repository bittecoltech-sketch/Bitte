"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, TrendingUp, Zap, Shield, ChevronDown, CheckCircle2, ArrowRight, ArrowLeft, Network, Cpu, Database, Send, Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/primitives";

const benefits = [
    {
        icon: Zap,
        title: "Automatización Extrema",
        desc: "Reduce hasta en un 80% las tareas manuales repetitivas. Tu equipo se enfoca en estrategia, la IA hace el trabajo pesado.",
        color: "text-bitte-blue"
    },
    {
        icon: TrendingUp,
        title: "Crecimiento Exponencial",
        desc: "Decisiones basadas en datos en tiempo real. Algoritmos predictivos que descubren oportunidades de mercado antes que tu competencia.",
        color: "text-bitte-green"
    },
    {
        icon: Shield,
        title: "Precisión y Seguridad",
        desc: "Sistemas cognitivos con margen de error cercano a cero. Trazabilidad absoluta y protocolos de seguridad de grado industrial.",
        color: "text-bitte-gold"
    },
    {
        icon: Target,
        title: "ROI Medible en Semanas",
        desc: "Nuestra arquitectura plug-and-play permite integraciones rápidas con tus sistemas actuales. Retorno de inversión en tiempo récord.",
        color: "text-white"
    }
];

const features = [
    "Machine Learning Predictivo",
    "Agentes de IA Autónomos (RAG)",
    "Integración IoT Industrial",
    "Analítica de Datos Avanzada",
    "Procesamiento de Lenguaje Natural",
    "Dashboards Ejecutivos"
];

export default function TransformacionPage() {
    return (
        <div className="min-h-screen bg-bitte-base text-white scroll-smooth selection:bg-bitte-blue/30 selection:text-white">

            {/* 1. immersive Hero Section */}
            <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-20">
                {/* Back Button */}
                <div className="container mx-auto px-6 absolute top-28 left-0 right-0 z-30">
                    <Link href="/">
                        <button className="group flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors duration-300 text-sm font-medium tracking-wide">
                            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
                            Regresar
                        </button>
                    </Link>
                </div>

                {/* Abstract Background Elements */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-bitte-blue/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
                    <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-bitte-green/20 rounded-full blur-[100px] mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }} />
                    <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] bg-bitte-gold/10 rounded-full blur-[150px] mix-blend-screen" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bitte-base/80 to-bitte-base z-10" />
                    {/* Dark grid texture */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] z-10 opacity-30" />
                </div>

                <div className="container mx-auto px-6 relative z-20 flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="max-w-5xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                            <span className="w-2 h-2 rounded-full bg-bitte-green animate-pulse" />
                            <span className="text-sm font-mono tracking-widest text-white/80 uppercase">El momento es ahora</span>
                        </div>

                        <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tighter uppercase drop-shadow-2xl">
                            Inteligencia para <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-bitte-blue via-bitte-green to-bitte-gold">
                                Líderes que Exigen Resultados
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
                            No vendemos software. Construimos arquitecturas cognitivas que transforman empresas análogas en potencias digitales imbatibles.
                        </p>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/40"
                >
                    <span className="text-xs uppercase tracking-widest font-bold">Descubre el impacto</span>
                    <ChevronDown className="w-5 h-5 animate-bounce" />
                </motion.div>
            </section>

            {/* 2. Value Proposition Grid */}
            <section className="py-32 relative z-20 bg-bitte-base">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">Por qué las empresas líderes eligen <span className="text-transparent bg-clip-text bg-gradient-to-r from-bitte-blue to-bitte-green">BITTE</span></h2>
                        <p className="text-xl text-white/60 max-w-2xl mx-auto">Nuestra plataforma no es solo una mejora incremental; es un cambio de paradigma total en la forma de operar.</p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {benefits.map((benefit, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-[#161B22] border border-white/5 rounded-3xl p-10 hover:border-white/10 transition-all duration-300 group"
                                style={{ boxShadow: 'inset 1px 1px 0 rgba(255,255,255,0.05), 0 4px 24px rgba(0,0,0,0.4)' }}
                            >
                                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                                    <benefit.icon className={`w-7 h-7 ${benefit.color}`} />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                                <p className="text-white/60 leading-relaxed text-lg">{benefit.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. The Protocol / Tech Capabilities (Darker Section) */}
            <section className="py-32 relative z-20 bg-[#0A0D14] border-y border-white/5 overflow-hidden">
                {/* Decorative radial */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-bitte-blue/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="container mx-auto px-6 relative">
                    <div className="flex flex-col lg:flex-row items-center gap-16 max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex-1 space-y-8"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                                Arquitectura Tecnológica de Nivel <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-bitte-green to-bitte-gold">Enterprise</span>
                            </h2>
                            <p className="text-lg text-white/70 leading-relaxed">
                                Hemos construido un ecosistema cerrado y altamente escalable. Combinamos la inmediatez de la recolección de datos IoT con el procesamiento cognitivo de los LLMs más avanzados del mundo.
                            </p>

                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                                {features.map((feat, i) => (
                                    <li key={i} className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                                        <CheckCircle2 className="w-5 h-5 text-bitte-green shrink-0" />
                                        <span className="font-semibold text-sm">{feat}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="flex-1 w-full"
                        >
                            <div className="relative aspect-square md:aspect-auto md:h-[600px] w-full bg-[#161B22] rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center p-8 group">
                                {/* Visual representation of the tech stack */}
                                <div className="absolute inset-0 bg-gradient-to-br from-bitte-blue/10 via-transparent to-bitte-green/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />

                                <div className="relative w-full h-full flex flex-col items-center justify-center gap-12">
                                    <div className="w-24 h-24 rounded-3xl bg-black/50 border border-white/10 backdrop-blur-xl flex items-center justify-center shadow-[0_0_50px_rgba(61,170,128,0.3)] z-20">
                                        <Cpu className="w-12 h-12 text-bitte-green" />
                                    </div>

                                    {/* Connection lines would go here, simulated with CSS for now */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-[60%] bg-gradient-to-b from-transparent via-bitte-blue to-transparent opacity-50" />
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[2px] w-[60%] bg-gradient-to-r from-transparent via-bitte-blue to-transparent opacity-50" />

                                    <div className="flex gap-24 z-20">
                                        <div className="w-20 h-20 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-xl flex items-center justify-center">
                                            <Database className="w-10 h-10 text-bitte-blue" />
                                        </div>
                                        <div className="w-20 h-20 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-xl flex items-center justify-center">
                                            <Network className="w-10 h-10 text-bitte-gold" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 4. The Final Call to Action / Contact Form */}
            <section id="contacto" className="py-32 relative z-20 bg-bitte-base">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto text-center mb-16"
                    >
                        <h2 className="text-5xl md:text-6xl font-black mb-6 uppercase tracking-tighter">
                            Da el salto al <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E3A8A] via-[#06B6D4] to-[#22C55E]">
                                Siguiente Nivel
                            </span>
                        </h2>
                        <p className="text-xl text-white/60">
                            Completa el formulario y un arquitecto de soluciones de BITTE se pondrá en contacto contigo en las próximas 24 horas para analizar tu caso específico.
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <div className="bg-[#161B22] border border-white/10 p-8 rounded-3xl h-full shadow-2xl">
                                <h3 className="text-2xl font-bold mb-8">Nuestros Canales</h3>
                                <div className="space-y-8">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-bitte-blue/10 rounded-xl flex items-center justify-center text-bitte-blue shrink-0">
                                            <Mail className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-1">Email</h4>
                                            <p className="text-white/60">contacto@bitte.ai</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-bitte-gold/10 rounded-xl flex items-center justify-center text-bitte-gold shrink-0">
                                            <Phone className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-1">Teléfono Directo</h4>
                                            <p className="text-white/60">+57 300 000 0000</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-bitte-green/10 rounded-xl flex items-center justify-center text-bitte-green shrink-0">
                                            <MapPin className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-1">Headquarters</h4>
                                            <p className="text-white/60">Bogotá, Colombia<br />Operamos a nivel global.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Highly Converting Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="lg:col-span-2 relative group"
                        >
                            {/* Animated glowing border behind the form */}
                            <div className="absolute -inset-[1px] bg-gradient-to-r from-bitte-blue via-bitte-green to-bitte-gold rounded-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 blur-sm" />

                            <div className="relative bg-[#161B22]/95 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl h-full shadow-2xl">
                                <form className="grid md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-white/40 uppercase tracking-widest ml-1">Nombre Completo</label>
                                        <input
                                            type="text"
                                            placeholder="Ej. Carlos Mendoza"
                                            className="w-full bg-[#0A0D14] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-bitte-green focus:ring-1 focus:ring-bitte-green transition-all"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-white/40 uppercase tracking-widest ml-1">Email Corporativo</label>
                                        <input
                                            type="email"
                                            placeholder="carlos@empresa.com"
                                            className="w-full bg-[#0A0D14] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-bitte-green focus:ring-1 focus:ring-bitte-green transition-all"
                                        />
                                    </div>
                                    <div className="space-y-3 md:col-span-2">
                                        <label className="text-sm font-bold text-white/40 uppercase tracking-widest ml-1">Empresa / Organización</label>
                                        <input
                                            type="text"
                                            placeholder="Nombre de tu empresa"
                                            className="w-full bg-[#0A0D14] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-bitte-green focus:ring-1 focus:ring-bitte-green transition-all"
                                        />
                                    </div>
                                    <div className="md:col-span-2 space-y-3">
                                        <label className="text-sm font-bold text-white/40 uppercase tracking-widest ml-1">¿Cuales son tus objetivos principales?</label>
                                        <textarea
                                            rows={4}
                                            placeholder="Cuéntanos brevemente qué procesos buscas optimizar o qué desafíos enfrenta tu operación actualmente."
                                            className="w-full bg-[#0A0D14] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-bitte-green focus:ring-1 focus:ring-bitte-green transition-all resize-none"
                                        ></textarea>
                                    </div>
                                    <div className="md:col-span-2 mt-4">
                                        <Button
                                            variant="glow"
                                            size="lg"
                                            className="w-full h-16 text-lg rounded-xl shadow-[0_0_30px_rgba(61,170,128,0.3)] bg-gradient-to-r from-bitte-green to-[#2ebd8c] hover:opacity-90"
                                        >
                                            Solicitar Diagnóstico Gratuito <Send className="ml-2 w-5 h-5" />
                                        </Button>
                                        <p className="text-center text-white/40 text-sm mt-4 font-light">
                                            Tu información está protegida. No enviamos spam.
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

        </div>
    );
}
