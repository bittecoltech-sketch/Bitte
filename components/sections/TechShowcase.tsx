
"use client";
import { motion } from "framer-motion";
import { VercelLight, Docker, Azure, GoogleCloud, Python, PostgreSQL, MongoDB, Anthropic, ChatGPT, DeepSeek } from "developer-icons";

const techs = [
  { name: "Vercel", Icon: VercelLight },
  { name: "Docker", Icon: Docker },
  { name: "Azure", Icon: Azure },
  { name: "Google Cloud", Icon: GoogleCloud },
  { name: "Python", Icon: Python },
  { name: "PostgreSQL", Icon: PostgreSQL },
  { name: "MongoDB", Icon: MongoDB },
  { name: "Anthropic", Icon: Anthropic },
  { name: "ChatGPT", Icon: ChatGPT },
  { name: "DeepSeek", Icon: DeepSeek },
];

export default function TechShowcase() {
  return (
    <section className="py-10 bg-bitte-base/80 border-b border-white/5">
      <div className="container mx-auto px-6 flex flex-col items-center">
        <h3 className="text-white/70 text-xs font-mono tracking-widest mb-6 uppercase">Tecnologías que potencian nuestra plataforma</h3>
        <div className="flex flex-wrap justify-center gap-8">
          {techs.map(({ name, Icon }) => (
            <motion.div
              key={name}
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 flex items-center justify-center mb-2 rounded-xl bg-white/5 border border-white/10 shadow-lg">
                <Icon size={40} color="#fff" />
              </div>
              <span className="text-xs text-white/60 font-semibold">{name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
