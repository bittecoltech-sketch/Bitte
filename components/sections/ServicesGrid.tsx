"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, Cpu, BarChart3, Layout, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/primitives";

const allServices = [
    {
        icon: BrainCircuit,
        title: "Expert Guidance",
        desc: "IA consultiva que entiende tu negocio, analiza tus procesos y te recomienda estrategias de automatización personalizadas para maximizar resultados y eficiencia operativa."
    },
    {
        icon: Cpu,
        title: "Fast Setup",
        desc: "Despliegue de IoT plug-and-play, integración rápida de sensores y dispositivos industriales, sin interrupciones en tu operación. Configuración ágil y soporte dedicado."
    },
    {
        icon: BarChart3,
        title: "Advanced Analytics",
        desc: "Predicción de fallos con 99% de precisión, monitoreo en tiempo real, alertas inteligentes y visualización de KPIs críticos para anticipar riesgos y tomar decisiones informadas."
    },
    {
        icon: CheckCircle,
        title: "Customizable Solutions",
        desc: "Adaptamos el núcleo del sistema a tus reglas, flujos y necesidades específicas. Soluciones flexibles, escalables y alineadas con tu visión de negocio."
    }
];

export default function ServicesGrid() {
    const [startIndex, setStartIndex] = useState(0);

    // Focus: Center item (index 1 in the visible array of 3) is highlighted

    const nextSlide = () => {
        setStartIndex((prev) => (prev + 1) % allServices.length);
    };

    const prevSlide = () => {
        setStartIndex((prev) => (prev - 1 + allServices.length) % allServices.length);
    };

    const getVisibleItems = (count: number) => {
        const items = [];
        for (let i = 0; i < count; i++) {
            items.push(allServices[(startIndex + i) % allServices.length]);
        }
        return items;
    };

    // Mobile View Logic
    const currentMobileItem = allServices[startIndex];
    const MobileIcon = currentMobileItem.icon;

    return (
        <section id="services" className="py-24 bg-bitte-base relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">
                        Potentes Soluciones <span className="text-bitte-blue">de Crecimiento</span>
                    </h2>
                    <p className="text-bitte-steel max-w-2xl mx-auto">
                        Herramientas de nivel empresarial diseñadas para escalar. Un ecosistema unificado.
                    </p>
                </div>

                <div className="relative flex items-center justify-center gap-4 md:gap-0">
                    {/* Left Arrow */}
                    <button
                        onClick={prevSlide}
                        className="hidden md:flex flex-shrink-0 w-12 h-12 rounded-full border border-bitte-blue/30 text-bitte-blue items-center justify-center hover:bg-bitte-blue hover:text-white transition-all hover:scale-110 z-30 relative"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    {/* Desktop Carousel (Center Focus Effect) */}
                    <div className="hidden md:flex items-center justify-center w-full max-w-7xl h-[500px]">
                        <AnimatePresence mode="popLayout" initial={false}>
                            {getVisibleItems(3).map((item, i) => {
                                const isCenter = i === 1;
                                return (
                                    <motion.div
                                        layout
                                        key={item.title} // Stable key for smooth position transition
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{
                                            opacity: isCenter ? 1 : 0.4,
                                            scale: isCenter ? 1.1 : 0.85,
                                            zIndex: isCenter ? 10 : 0,
                                            filter: isCenter ? "blur(0px)" : "blur(2px)",
                                            x: isCenter ? 0 : (i === 0 ? 50 : -50) // Slight overlap effect
                                        }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
                                        className={`
                                            group flex-shrink-0 w-1/3 p-0 flex flex-col items-center text-center min-h-[400px] transition-colors duration-500 relative
                                            ${isCenter ? 'z-10' : 'z-0'}
                                        `}
                                    >
                                        {/* Card outer border — lights up on hover */}
                                        <div
                                            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                                            style={{
                                                background: isCenter ? 'linear-gradient(135deg, #3DAA80 0%, transparent 60%)' : 'none',
                                                padding: '1px',
                                            }}
                                        />
                                        {/* Card shell */}
                                        <div
                                            className="relative flex flex-col flex-1 rounded-xl overflow-hidden w-full h-full shadow-lg px-8 py-8 md:px-10 md:py-10"
                                            style={{
                                                background: isCenter ? '#161B22' : '#10141A',
                                                border: isCenter ? '1.5px solid #3DAA80' : '1px solid #222',
                                            }}
                                        >
                                            <div className={`flex items-center justify-center w-full pt-4 pb-4`}>
                                                <div className={`rounded-2xl p-4 mb-2`} style={{ background: isCenter ? 'linear-gradient(135deg, #1d4d3f 0%, #2A6B58 50%, #3DAA80 100%)' : 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)', boxShadow: isCenter ? '0 4px 18px rgba(61,170,128,0.55)' : '0 2px 8px rgba(59,130,246,0.15)' }}>
                                                    <item.icon className="w-10 h-10 text-white" />
                                                </div>
                                            </div>
                                            <h3 className={`text-2xl font-bold text-white mb-4 transition-opacity ${isCenter ? 'opacity-100' : 'opacity-70'}`}>
                                                {item.title}
                                            </h3>
                                            <p className={`text-sm text-bitte-steel mb-2 leading-relaxed flex-1 transition-opacity ${isCenter ? 'opacity-100' : 'opacity-0'}`}>
                                                {item.desc}
                                            </p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>

                    {/* Mobile Carousel (1 Item - Standard) */}
                    <div className="md:hidden w-full relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={startIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="bg-gradient-to-b from-[#1e3a8a]/40 to-[#020617] border border-bitte-blue/20 p-8 rounded-[2rem] flex flex-col items-center text-center shadow-lg min-h-[350px]"
                            >
                                <div className="p-4 rounded-2xl bg-gradient-to-br from-bitte-blue to-purple-600 mb-6 shadow-lg shadow-purple-500/20">
                                    <MobileIcon className="w-8 h-8 text-white" />
                                </div>

                                <h3 className="text-xl font-bold text-white mb-3">{currentMobileItem.title}</h3>
                                <p className="text-sm text-bitte-steel mb-6 leading-relaxed flex-1">
                                    {currentMobileItem.desc}
                                </p>

                                <button className="text-xs font-bold text-white/90 border border-white/20 px-6 py-2 rounded-full hover:bg-white hover:text-black transition-colors uppercase tracking-widest mt-auto">
                                    Ver Más
                                </button>

                                {/* Mobile Navigation */}
                                <div className="absolute inset-y-0 -left-2 flex items-center">
                                    <button onClick={prevSlide} className="p-2 bg-black/50 rounded-full text-white border border-white/10"><ChevronLeft /></button>
                                </div>
                                <div className="absolute inset-y-0 -right-2 flex items-center">
                                    <button onClick={nextSlide} className="p-2 bg-black/50 rounded-full text-white border border-white/10"><ChevronRight /></button>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Right Arrow */}
                    <button
                        onClick={nextSlide}
                        className="hidden md:flex flex-shrink-0 w-12 h-12 rounded-full border border-bitte-blue/30 text-bitte-blue items-center justify-center hover:bg-bitte-blue hover:text-white transition-all hover:scale-110 z-30 relative"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </section>
    );
}
