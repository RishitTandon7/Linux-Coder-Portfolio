"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { BootSequence } from "@/components/BootSequence";
import { Dock } from "@/components/ui/Dock";
import { User, Code, Cpu, Mail, Award } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { Education } from "@/components/sections/Education";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";
import { Certifications } from "@/components/sections/Certifications";
import { cn } from "@/lib/utils";

const HeroScene = dynamic(() => import("@/components/3d/HeroScene").then((mod) => mod.HeroScene), { ssr: false });
const GravitySkills = dynamic(() => import("@/components/sections/GravitySkills").then((mod) => mod.GravitySkills), { ssr: false });

export function Layout() {
    const [isBooting, setIsBooting] = useState(true);
    const [hideDock, setHideDock] = useState(true);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const dockItems = [
        { id: "hero", label: "Home", icon: <User className="w-6 h-6 text-green-400" />, onClick: () => scrollToSection("hero") },
        { id: "education", label: "Education", icon: <Mail className="w-6 h-6 text-green-400" />, onClick: () => scrollToSection("education") },
        { id: "skills", label: "Skills", icon: <Cpu className="w-6 h-6 text-green-400" />, onClick: () => scrollToSection("skills") },
        { id: "certifications", label: "Certificates", icon: <Award className="w-6 h-6 text-green-400" />, onClick: () => scrollToSection("certifications") },
        { id: "projects", label: "Projects", icon: <Code className="w-6 h-6 text-green-400" />, onClick: () => scrollToSection("projects") },
        { id: "contact", label: "Contact", icon: <Mail className="w-6 h-6 text-green-400" />, onClick: () => scrollToSection("contact") },
    ];

    return (
        <main className="relative min-h-screen w-full text-white">
            {isBooting && <BootSequence onComplete={() => setIsBooting(false)} />}

            <HeroScene />

            <div className={cn("relative z-10 transition-opacity duration-1000", isBooting ? "opacity-0" : "opacity-100")}>
                <Hero onToggleGui={setHideDock} isDockHidden={hideDock} />

                <Education />

                <section id="skills" className="min-h-screen w-full py-20">
                    <GravitySkills />
                </section>

                <Certifications />

                <Projects />

                <Contact />
            </div>

            <AnimatePresence>
                {!hideDock && <Dock items={dockItems} />}
            </AnimatePresence>
        </main>
    );
}
