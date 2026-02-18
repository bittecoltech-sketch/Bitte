import { Button } from "@/components/ui/primitives";
import { Users, BookOpen } from "lucide-react";

export function CRMPortal() {
    return (
        <section className="py-20 bg-bitte-void/50">
            <div className="container mx-auto px-6 text-center">
                <div className="max-w-4xl mx-auto p-1 rounded-2xl bg-gradient-to-r from-bitte-steel/20 to-bitte-steel/5">
                    <div className="bg-bitte-base rounded-xl p-12 border border-white/5 relative overflow-hidden">
                        <Users className="w-16 h-16 text-bitte-coral mx-auto mb-6 opacity-80" />
                        <h2 className="text-3xl font-bold mb-4">CRM Corporativo</h2>
                        <p className="text-bitte-steel mb-8">
                            Gestión integral de clientes potenciada por IA que predice el comportamiento de compra
                            y automatiza el seguimiento.
                        </p>
                        <Button variant="outline">Acceder al Portal Demo</Button>

                        {/* Decorative background blur */}
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-bitte-coral/10 rounded-full blur-3xl pointer-events-none" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export function BitteTech() {
    return (
        <section id="education" className="py-24">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl font-bold mb-2">Bitte Tech <span className="text-bitte-blue text-lg align-top">Academy</span></h2>
                        <p className="text-bitte-steel">Formación técnica de alto nivel.</p>
                    </div>
                    <Button variant="ghost">Ver todos los cursos</Button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {['Excel Industrial', 'IA para Ejecutivos', 'Data Science', 'IoT Basics'].map((course, i) => (
                        <div key={i} className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-bitte-void border border-white/5 hover:border-bitte-blue/50 transition-all cursor-pointer">
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                            <div className="absolute bottom-0 left-0 p-6 z-20">
                                <span className="text-xs font-bold text-bitte-blue mb-2 block">CURSO ONLINE</span>
                                <h3 className="text-xl font-bold text-white group-hover:text-bitte-blue transition-colors">{course}</h3>
                            </div>
                            <BookOpen className="absolute top-6 right-6 text-white/20 group-hover:text-white/60 transition-colors z-20" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
