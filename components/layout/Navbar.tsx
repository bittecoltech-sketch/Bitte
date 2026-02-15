"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/primitives";
import Link from "next/link";

const navItems = [
    { name: "Servicios", href: "#services" },
    { name: "Playground", href: "#playground" },
    { name: "Data Lab", href: "#datalab" },
    { name: "Bitte Tech", href: "#education" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-bitte-base/80 backdrop-blur-lg border-b border-white/5" : "bg-transparent"
                }`}
        >
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-11 h-11 bg-black/20 rounded-xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:shadow-bitte-blue/30">
                        {/* Faceted 'B' recreation with segmented divs */}
                        <div className="absolute inset-0">
                            {/* Blue segment - Top Left */}
                            <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-600 to-blue-800" />
                            {/* Gray segment - Top Right */}
                            <div
                                className="absolute top-0 right-0 w-1/2 h-2/5 bg-gradient-to-bl from-slate-400 to-slate-600"
                                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 80%)' }}
                            />
                            {/* Green segment - Middle Left */}
                            <div className="absolute top-1/2 left-0 w-2/5 h-1/4 -translate-y-1/2 bg-emerald-600" />
                            {/* Red segment - Bottom Left */}
                            <div
                                className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-red-600 to-red-800"
                                style={{ clipPath: 'polygon(0 0, 100% 50%, 100% 100%, 0 100%)' }}
                            />
                            {/* Yellow/Orange segment - Bottom Right */}
                            <div className="absolute bottom-0 right-0 w-3/5 h-3/5 bg-gradient-to-tl from-amber-400 to-amber-600 rounded-bl-3xl" />
                        </div>
                        {/* Center 'B' hole simulation */}
                        <div className="absolute top-1/2 right-[15%] w-1/4 h-1/3 -translate-y-1/2 bg-[#0a0c10] rounded-sm shadow-inner" />

                        {/* Glassy finish */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/30 pointer-events-none" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-[900] tracking-tighter text-white leading-none">
                            BITTE
                        </span>
                        <span className="text-[9px] font-black tracking-[0.4em] text-bitte-blue leading-none mt-1.5 opacity-80 uppercase">
                            Coltech
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-medium text-white/70 hover:text-white transition-colors relative group"
                        >
                            {item.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-bitte-blue transition-all group-hover:w-full" />
                        </Link>
                    ))}
                    <Button variant="glow" size="sm" className="ml-4">
                        Contactar <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white/80 hover:text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="md:hidden bg-bitte-base/95 backdrop-blur-xl border-t border-white/10"
                >
                    <div className="px-6 py-8 flex flex-col gap-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="text-lg font-medium text-white/80 hover:text-white"
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Button variant="glow" className="w-full">
                            Iniciar Proyecto
                        </Button>
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
}
