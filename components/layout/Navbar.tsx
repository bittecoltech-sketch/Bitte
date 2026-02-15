"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/primitives";
import Link from "next/link";
import Image from "next/image";

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
                    <div className="relative w-11 h-11 transition-all duration-500 group-hover:scale-105">
                        <Image
                            src="/logo.png"
                            alt="BITTE Logo"
                            fill
                            className="object-contain"
                            priority
                        />
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
