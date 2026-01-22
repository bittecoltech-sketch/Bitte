"use client";

import { Button } from "@/components/ui/primitives";
import Link from "next/link";
import { ArrowLeft, Users, BarChart, Calendar, Settings } from "lucide-react";

export default function CRMPage() {
    return (
        <div className="pt-24 min-h-screen bg-bitte-base">
            <div className="container mx-auto px-6 mb-8">
                <Link href="/">
                    <Button variant="ghost" className="pl-0 gap-2">
                        <ArrowLeft className="w-4 h-4" /> Volver al Inicio
                    </Button>
                </Link>
            </div>

            <div className="container mx-auto px-6">
                <div className="bg-bitte-void border border-white/10 rounded-xl overflow-hidden min-h-[600px] flex">
                    {/* Sidebar */}
                    <div className="w-64 bg-black/20 border-r border-white/5 p-6 hidden md:block">
                        <div className="text-xl font-bold text-white mb-8">Bitte<span className="text-bitte-coral">CRM</span></div>
                        <nav className="space-y-4">
                            <div className="flex items-center gap-3 text-bitte-blue bg-bitte-blue/10 px-4 py-2 rounded-lg cursor-pointer">
                                <Users className="w-5 h-5" /> Clientes
                            </div>
                            <div className="flex items-center gap-3 text-white/60 px-4 py-2 rounded-lg cursor-pointer hover:text-white">
                                <BarChart className="w-5 h-5" /> Ventas
                            </div>
                            <div className="flex items-center gap-3 text-white/60 px-4 py-2 rounded-lg cursor-pointer hover:text-white">
                                <Calendar className="w-5 h-5" /> Agenda
                            </div>
                            <div className="flex items-center gap-3 text-white/60 px-4 py-2 rounded-lg cursor-pointer hover:text-white">
                                <Settings className="w-5 h-5" /> Config
                            </div>
                        </nav>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 p-8">
                        <header className="flex justify-between items-center mb-8">
                            <h1 className="text-2xl font-bold">Gestión de Clientes</h1>
                            <Button>Nuevo Cliente +</Button>
                        </header>

                        {/* Mock Table */}
                        <div className="w-full bg-white/5 rounded-lg border border-white/5 overflow-hidden">
                            <table className="w-full text-left text-sm text-bitte-steel">
                                <thead className="bg-white/5 text-white">
                                    <tr>
                                        <th className="p-4">Empresa</th>
                                        <th className="p-4">Estado</th>
                                        <th className="p-4">Valor</th>
                                        <th className="p-4">Probabilidad IA</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {[
                                        { name: "TechCorp Industries", status: "Negociación", val: "$45,000", prob: "85%" },
                                        { name: "Global Logistics", status: "Propuesta", val: "$12,500", prob: "60%" },
                                        { name: "Alpha Manufacturing", status: "Cierre", val: "$120,000", prob: "92%" },
                                        { name: "Solaris Energy", status: "Lead", val: "$8,000", prob: "45%" },
                                    ].map((row, i) => (
                                        <tr key={i} className="hover:bg-white/5">
                                            <td className="p-4 font-medium text-white">{row.name}</td>
                                            <td className="p-4"><span className="px-2 py-1 rounded bg-white/10 text-xs">{row.status}</span></td>
                                            <td className="p-4">{row.val}</td>
                                            <td className="p-4 text-bitte-green">{row.prob}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-8 p-4 rounded-lg bg-bitte-coral/10 border border-bitte-coral/20 flex gap-4 items-center">
                            <div className="p-2 bg-bitte-coral rounded-full text-white">
                                <Users className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white">Insight de IA</h4>
                                <p className="text-sm text-bitte-steel">Alpha Manufacturing tiene una alta probabilidad de cierre. Se recomienda programar reunión técnica.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
