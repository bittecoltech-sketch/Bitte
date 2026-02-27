"use client";

import React from "react";
import { motion } from "framer-motion";
import { Terminal, Activity, Users, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const soluciones = [
    {
        id: "ai-agent",
        title: "AI Agent Playground",
        subtitle: "Consola interactiva para configurar y probar agentes RAG en tiempo real.",
        description: "Descubre cómo nuestros agentes de IA pueden entender documentos complejos, analizar datos en tiempo real y responder preguntas con precisión milimétrica. Ideal para automatizar el servicio al cliente, análisis de documentos legales y soporte técnico especializado, reduciendo tiempos de respuesta hasta en un 80%.",
        features: [
            "Procesamiento de Lenguaje Natural avanzado",
            "Integración con bases de datos empresariales",
            "Respuestas contextuales y precisas",
            "Soporte multilenguaje automático"
        ],
        icon: Terminal,
        href: "/demos/ai-agent",
        accentStart: "#2A6B58",
        accentMid: "#3DAA80",
        accentEnd: "#56d9a5",
        accentRgb: "61,170,128",
        imagePath: "/AI_AGENT_PLAYGROUND.jpeg"
    },
    {
        id: "data-lab",
        title: "Data Insights Lab",
        subtitle: "Visualización de datos industriales y detección de anomalías.",
        description: "Transforma tu mar de datos en decisiones estratégicas. Nuestra plataforma de analítica predictiva se conecta a tus sensores IoT y bases de datos para identificar patrones ocultos, predecir fallas en maquinaria antes de que ocurran y optimizar la cadena de suministro en tiempo real.",
        features: [
            "Detección de anomalías impulsada por IA",
            "Dashboards interactivos en tiempo real",
            "Mantenimiento predictivo automatizado",
            "Métricas clave de rendimiento (KPIs) a medida"
        ],
        icon: Activity,
        href: "/demos/data-lab",
        accentStart: "#1B3A6B",
        accentMid: "#2E5FA3",
        accentEnd: "#5B8FD9",
        accentRgb: "46,95,163",
        imagePath: "/DATA_INSIGHTS_LAB.jpeg"
    },
    {
        id: "crm",
        title: "CRM Corporativo",
        subtitle: "Plataforma de gestión de clientes potenciada por inteligencia predictiva.",
        description: "Mucho más que una base de datos de contactos: un motor de ingresos impulsado por IA. Nuestro CRM analiza el comportamiento de tus clientes, puntúa leads automáticamente y sugiere las mejores acciones a tomar para cerrar más ventas. Automatiza tareas repetitivas para que tu equipo se enfoque en construir relaciones.",
        features: [
            "Lead scoring inteligente predictivo",
            "Automatización de embudos de ventas",
            "Análisis de sentimiento en comunicaciones",
            "Predicción de churn (pérdida de clientes)"
        ],
        icon: Users,
        href: "/demos/crm",
        accentStart: "#7D1E1E",
        accentMid: "#C0393B",
        accentEnd: "#E8762A",
        accentRgb: "192,57,59",
        imagePath: "/CRM_CORPORATIVO.jpeg"
    }
];

export default function SolucionesPage() {
    return (
        <div className="min-h-screen bg-bitte-base text-white relative">
            {/* Back Button */}
            <div className="absolute top-32 left-0 right-0 z-30 pointer-events-none">
                <div className="container mx-auto px-6">
                    <Link href="/">
                        <button className="group flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors duration-300 text-sm font-medium tracking-wide w-fit pointer-events-auto">
                            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
                            Regresar
                        </button>
                    </Link>
                </div>
            </div>

            <div className="pt-32 pb-24">
                {/* Header */}
                <header className="container mx-auto px-6 mb-24 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase">
                            Nuestras <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-bitte-blue via-bitte-green to-bitte-gold">
                                Soluciones
                            </span>
                        </h1>
                        <p className="text-xl text-white/60 max-w-2xl mx-auto">
                            Explora a fondo cómo nuestras plataformas pueden transformar cada aspecto de tu operación. Prueba nuestras demostraciones interactivas para vivir el futuro hoy.
                        </p>
                    </motion.div>
                </header>

                {/* Soluciones List */}
                <div className="container mx-auto px-6 space-y-32">
                    {soluciones.map((solucion, index) => {
                        const isEven = index % 2 === 0;
                        const Icon = solucion.icon;
                        return (
                            <motion.div
                                key={solucion.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8 }}
                                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${!isEven ? 'lg:flex-row-reverse' : ''}`}
                            >
                                {/* Text Content */}
                                <div className="flex-1 space-y-8">
                                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                                        <Icon className="w-5 h-5" style={{ color: solucion.accentEnd }} />
                                        <span className="text-sm font-bold tracking-widest uppercase" style={{ color: solucion.accentEnd }}>
                                            {solucion.title}
                                        </span>
                                    </div>

                                    <div>
                                        <h2 className="text-3xl md:text-4xl font-bold mb-4">{solucion.subtitle}</h2>
                                        <p className="text-lg text-white/70 leading-relaxed">
                                            {solucion.description}
                                        </p>
                                    </div>

                                    <ul className="space-y-4">
                                        {solucion.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3 text-white/80">
                                                <CheckCircle2 className="w-6 h-6 shrink-0" style={{ color: solucion.accentMid }} />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div>
                                        <Link href={solucion.href}>
                                            <button
                                                className="group flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 w-full sm:w-auto"
                                                style={{
                                                    background: `linear-gradient(135deg, ${solucion.accentStart} 0%, ${solucion.accentMid} 100%)`,
                                                    boxShadow: `0 8px 32px rgba(${solucion.accentRgb}, 0.3)`
                                                }}
                                            >
                                                Probar Demo Interactiva
                                                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                                            </button>
                                        </Link>
                                    </div>
                                </div>

                                {/* Image/Visual Graphic */}
                                <div className="flex-1 w-full">
                                    <div
                                        className="relative aspect-video rounded-3xl overflow-hidden border border-white/10"
                                        style={{
                                            boxShadow: `0 20px 60px rgba(${solucion.accentRgb}, 0.15)`
                                        }}
                                    >
                                        <Image
                                            src={solucion.imagePath}
                                            alt={solucion.title}
                                            fill
                                            className="object-cover"
                                        />
                                        {/* Overlay Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-bitte-base/80 to-transparent" />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
