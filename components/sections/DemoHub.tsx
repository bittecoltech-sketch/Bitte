"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/primitives";
import { Terminal, Activity, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

const demos = [
    {
        title: "AI Agent Playground",
        desc: "Consola interactiva para configurar y probar agentes RAG en tiempo real.",
        icon: Terminal,
        color: "text-bitte-green",
        bg: "bg-bitte-green/10",
        href: "/demos/ai-agent"
    },
    {
        title: "Data Insights Lab",
        desc: "Visualización de datos industriales y detección de anomalías.",
        icon: Activity,
        color: "text-bitte-blue",
        bg: "bg-bitte-blue/10",
        href: "/demos/data-lab"
    },
    {
        title: "CRM Corporativo",
        desc: "Plataforma de gestión de clientes potenciada por inteligencia predictiva.",
        icon: Users,
        color: "text-bitte-coral",
        bg: "bg-bitte-coral/10",
        href: "/demos/crm"
    }
];

export default function DemoHub() {
    return (
        <section className="py-24 bg-black/20 border-y border-white/5">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Experiencias Interactivas</h2>
                    <p className="text-bitte-steel max-w-2xl mx-auto">
                        Explora las capacidades de nuestra plataforma a través de simulaciones funcionales.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {demos.map((demo, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            className="group p-8 rounded-2xl bg-bitte-void border border-white/10 hover:border-white/20 transition-all flex flex-col items-center text-center"
                        >
                            <div className={`w-16 h-16 rounded-2xl ${demo.bg} ${demo.color} flex items-center justify-center mb-6`}>
                                <demo.icon className="w-8 h-8" />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-3">{demo.title}</h3>
                            <p className="text-bitte-steel mb-8 text-sm leading-relaxed">
                                {demo.desc}
                            </p>

                            <div className="mt-auto">
                                <Link href={demo.href}>
                                    <Button variant="outline" className="group-hover:bg-white group-hover:text-black transition-colors w-full">
                                        Iniciar Demo <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
