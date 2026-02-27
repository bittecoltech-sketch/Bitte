"use client";

import React from "react";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/primitives";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-bitte-base text-white selection:bg-bitte-blue/30 selection:text-white">


            <main className="pt-32 pb-20">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto text-center mb-16"
                    >
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase">
                            Hablemos de <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-bitte-blue to-bitte-gold">
                                Tu Futuro
                            </span>
                        </h1>
                        <p className="text-xl text-white/60 max-w-2xl mx-auto">
                            ¿Listo para transformar tu operación con Inteligencia Artificial? Nuestro equipo está listo para ayudarte.
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-8"
                        >
                            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-xl">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-bitte-blue/10 rounded-xl flex items-center justify-center text-bitte-blue">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">Email</h3>
                                        <p className="text-white/60">contacto@bitte.ai</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-bitte-gold/10 rounded-xl flex items-center justify-center text-bitte-gold">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">Teléfono</h3>
                                        <p className="text-white/60">+57 (300) 000-0000</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-bitte-green/10 rounded-xl flex items-center justify-center text-bitte-green">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">Ubicación</h3>
                                        <p className="text-white/60">Bogotá, Colombia</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="lg:col-span-2 bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl backdrop-blur-xl"
                        >
                            <form className="grid md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-white/40 uppercase tracking-widest">Nombre</label>
                                    <input
                                        type="text"
                                        placeholder="Tu nombre"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-bitte-blue focus:ring-1 focus:ring-bitte-blue transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-white/40 uppercase tracking-widest">Email</label>
                                    <input
                                        type="email"
                                        placeholder="tu@email.com"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-bitte-blue focus:ring-1 focus:ring-bitte-blue transition-all"
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-sm font-bold text-white/40 uppercase tracking-widest">Mensaje</label>
                                    <textarea
                                        rows={4}
                                        placeholder="¿En qué podemos ayudarte?"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-bitte-blue focus:ring-1 focus:ring-bitte-blue transition-all resize-none"
                                    ></textarea>
                                </div>
                                <div className="md:col-span-2">
                                    <Button variant="glow" size="lg" className="w-full h-16 text-lg rounded-xl">
                                        Enviar Mensaje <Send className="ml-2 w-5 h-5" />
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </main>

        </div>
    );
}
