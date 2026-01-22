"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function InnovationStats() {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-bitte-base">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-bitte-blue/10 blur-[150px] rounded-full" />
            </div>

            <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                {/* Left Column: Text */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="max-w-xl"
                >
                    <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
                        Innovación <span className="text-white">Digital</span>
                        <br />
                        para un <span className="text-bitte-blue">Mundo Conectado</span>
                    </h2>

                    <p className="text-bitte-steel text-lg leading-relaxed mb-6">
                        En un entorno donde la tecnología evoluciona a un ritmo vertiginoso,
                        la inteligencia artificial se ha convertido en el pilar fundamental
                        para proteger y potenciar los intereses de empresas líderes.
                    </p>

                    <p className="text-bitte-steel text-lg leading-relaxed">
                        Estamos a la vanguardia de esta transformación, ofreciendo
                        arquitecturas neuronales y soluciones autónomas para enfrentar
                        los desafíos del mañana, hoy.
                    </p>
                </motion.div>

                {/* Right Column: Hologram Visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    {/* Hologram Image */}
                    <div className="relative aspect-square max-w-lg mx-auto">
                        <Image
                            src="/hero-ai.png"
                            alt="Digital Brain Hologram"
                            fill
                            className="object-contain drop-shadow-[0_0_50px_rgba(59,130,246,0.5)] animate-pulse-slow"
                        />
                        {/* Scanning Line Effect */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bitte-blue/20 to-transparent h-1/4 animate-[scan_3s_ease-in-out_infinite]" />

                        {/* Floating Network Nodes */}
                        <div className="absolute top-1/4 left-0 w-3 h-3 bg-bitte-blue rounded-full shadow-[0_0_10px_#3B82F6]" />
                        <div className="absolute bottom-1/4 right-10 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]" />
                    </div>

                    {/* Stats Bar (Glassmorphic Overlay) */}
                    <div className="absolute -bottom-10 left-0 right-0 p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-wrap justify-around gap-6 text-center shadow-xl">
                        {[
                            { val: "1.000+", label: "Clientes Satisfechos" },
                            { val: "20+", label: "Años de Experiencia" },
                            { val: "100%", label: "Cumplimiento Legal" },
                            { val: "500+", label: "Proyectos Completados" }
                        ].map((stat, i) => (
                            <div key={i}>
                                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.val}</div>
                                <div className="text-xs text-bitte-steel uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
