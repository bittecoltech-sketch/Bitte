import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-bitte-base border-t border-white/5 py-12 mt-20">
            <div className="container mx-auto px-6 grid md:grid-cols-4 gap-8">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="relative w-10 h-10">
                            <Image
                                src="/logo-bitte.png"
                                alt="BITTE Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <h3 className="text-3xl font-[900] tracking-tighter text-white">BITTE</h3>
                    </div>
                    <p className="text-bitte-steel text-sm">
                        Bridge to Technology.
                        <br />
                        Bogotá, Colombia.
                    </p>
                </div>

                <div>
                    <h4 className="font-bold text-white mb-4">Soluciones</h4>
                    <ul className="space-y-2 text-sm text-bitte-steel">
                        <li>Agentes IA</li>
                        <li>IoT Industrial</li>
                        <li>Business Intelligence</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-white mb-4">Empresa</h4>
                    <ul className="space-y-2 text-sm text-bitte-steel">
                        <li>Sobre Nosotros</li>
                        <li>Casos de Éxito</li>
                        <li>Contacto</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-white mb-4">Legal</h4>
                    <ul className="space-y-2 text-sm text-bitte-steel">
                        <li>Privacidad</li>
                        <li>Términos</li>
                    </ul>
                </div>
            </div>
            <div className="container mx-auto px-6 mt-12 pt-8 border-t border-white/5 text-center text-xs text-bitte-steel">
                © 2026 BITTE Bridge to Technology. Todos los derechos reservados.
            </div>
        </footer>
    );
}
