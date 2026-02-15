"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/primitives";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const slides = [
    {
        id: 1,
        image: "/hero-ai.png",
        label: "Neural Architecture",
        tagline: "INTELIGENCIA QUE PIENSA",
        desc: "Sistemas cognitivos que automatizan el 80% de tu flujo operativo.",
        color: "text-bitte-blue",
    },
    {
        id: 2,
        image: "/hero-iot.png",
        label: "IoT Connectivity",
        tagline: "CONTROL TOTAL",
        desc: "Conexión físico-digital en tiempo real. Tu fábrica en tu bolsillo.",
        color: "text-bitte-gold",
    },
    {
        id: 3,
        image: "/hero-data.png",
        label: "Data Intelligence",
        tagline: "VISIÓN DEL FUTURO",
        desc: "Transformamos ruido en señales de mercado claras y accionables.",
        color: "text-bitte-green",
    }
];

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
            {/* Background Slideshow */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={slides[currentSlide].image}
                            alt="Hero Background"
                            fill
                            className="object-cover brightness-50"
                            priority
                        />
                        {/* Centered Vignette */}
                        <div className="absolute inset-0 bg-radial-gradient from-transparent via-bitte-base/40 to-bitte-base opacity-80" />
                        <div className="absolute inset-0 bg-gradient-to-t from-bitte-base via-transparent to-transparent" />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 relative z-10 pt-12 flex flex-col items-center justify-center text-center">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-5xl flex flex-col items-center"
                >
                    {/* Dynamic Tagline */}
                    <div className="inline-flex items-center gap-3 mb-8 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                        <div className={`h-2 w-2 rounded-full ${slides[currentSlide].color.replace("text-", "bg-")} animate-pulse`} />
                        <span className={`text-sm font-mono tracking-[0.3em] font-bold ${slides[currentSlide].color}`}>
                            {slides[currentSlide].tagline}
                        </span>
                    </div>

                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9] mb-8 tracking-tighter text-white uppercase drop-shadow-2xl">
                        BRIDGE TO <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-bitte-blue via-white to-bitte-gold">
                            THE FUTURE
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl leading-relaxed font-light drop-shadow-lg">
                        {slides[currentSlide].desc}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
                        <Button variant="glow" size="lg" className="h-16 px-12 text-lg rounded-full w-full sm:w-auto shadow-2xl shadow-bitte-blue/20">
                            Iniciar Transformación
                        </Button>
                        <Button variant="outline" size="lg" className="h-16 px-12 text-lg rounded-full w-full sm:w-auto bg-black/40 backdrop-blur-md border-white/20 hover:bg-white hover:text-black hover:border-white">
                            Ver Demo Interactiva
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </div>
                </motion.div>

                {/* Slide Indicators */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentSlide(i)}
                            className={`h-1 transition-all duration-500 rounded-full box-content ${i === currentSlide
                                ? 'w-12 bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]'
                                : 'w-3 bg-white/20 hover:bg-white/40'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
