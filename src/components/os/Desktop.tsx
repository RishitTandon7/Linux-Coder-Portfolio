"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Code, Cpu, Mail, Award, Terminal, Folder, FileText, Github, Linkedin, Instagram, MessageCircle } from "lucide-react";
import dynamic from "next/dynamic";
import { DesktopIcon } from "./DesktopIcon";
import { Window } from "./Window";
import { Taskbar } from "./Taskbar";
import { TerminalApp } from "./apps/TerminalApp";
import { FileExplorer } from "./apps/FileExplorer";
import { SystemBackground } from "./SystemBackground";

// Lazy load heavy components
const GravitySkills = dynamic(() => import("../sections/GravitySkills").then(mod => mod.GravitySkills), {
    loading: () => <div className="text-white p-4">Loading Skills...</div>
});
const Projects = dynamic(() => import("../sections/Projects").then(mod => mod.Projects), {
    loading: () => <div className="text-white p-4">Loading Projects...</div>
});
const Education = dynamic(() => import("../sections/Education").then(mod => mod.Education), {
    loading: () => <div className="text-white p-4">Loading Education...</div>
});
const Contact = dynamic(() => import("../sections/Contact").then(mod => mod.Contact), {
    loading: () => <div className="text-white p-4">Loading Contact...</div>
});
const Certifications = dynamic(() => import("../sections/Certifications").then(mod => mod.Certifications), {
    loading: () => <div className="text-white p-4">Loading Certifications...</div>
});

interface DesktopProps {
    onExit: () => void;
}

export function Desktop({ onExit }: DesktopProps) {
    const [windows, setWindows] = useState<Array<{ id: string; title: string; isOpen: boolean; isMinimized: boolean; zIndex: number; content: React.ReactNode }>>([
        { id: "about", title: "About Me", isOpen: false, isMinimized: false, zIndex: 1, content: <div className="text-white p-4">About Me Content Placeholder</div> },
        { id: "skills", title: "Skills", isOpen: false, isMinimized: false, zIndex: 1, content: <div className="pt-10 h-full overflow-y-auto custom-scrollbar"><GravitySkills /></div> },
        { id: "projects", title: "Projects", isOpen: false, isMinimized: false, zIndex: 1, content: <div className="pt-10 h-full overflow-y-auto custom-scrollbar"><Projects /></div> },
        { id: "education", title: "Education", isOpen: false, isMinimized: false, zIndex: 1, content: <div className="pt-10 h-full overflow-y-auto custom-scrollbar"><Education /></div> },
        { id: "terminal", title: "Terminal", isOpen: false, isMinimized: false, zIndex: 1, content: <TerminalApp onExit={onExit} /> },
        { id: "certificates", title: "Certificates", isOpen: false, isMinimized: false, zIndex: 1, content: <FileExplorer folderId="certificates" /> },
        { id: "certifications", title: "Certifications", isOpen: false, isMinimized: false, zIndex: 1, content: <FileExplorer folderId="certifications" /> },
    ]);

    const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
    const [maxZIndex, setMaxZIndex] = useState(10);

    // Lock body scroll when Desktop is active
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const openWindow = (id: string) => {
        setWindows((prev) =>
            prev.map((w) =>
                w.id === id
                    ? { ...w, isOpen: true, isMinimized: false, zIndex: maxZIndex + 1 }
                    : w
            )
        );
        setActiveWindowId(id);
        setMaxZIndex((prev) => prev + 1);
    };

    const closeWindow = (id: string) => {
        setWindows((prev) =>
            prev.map((w) => (w.id === id ? { ...w, isOpen: false } : w))
        );
        if (activeWindowId === id) setActiveWindowId(null);
    };

    const minimizeWindow = (id: string) => {
        setWindows((prev) =>
            prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
        );
        if (activeWindowId === id) setActiveWindowId(null);
    };

    const focusWindow = (id: string) => {
        setWindows((prev) =>
            prev.map((w) =>
                w.id === id ? { ...w, zIndex: maxZIndex + 1, isMinimized: false } : w
            )
        );
        setActiveWindowId(id);
        setMaxZIndex((prev) => prev + 1);
    };

    const openLink = (url: string) => {
        window.open(url, "_blank");
    };

    // About Me Content
    const AboutContent = () => (
        <div className="text-gray-300 space-y-4 p-8 h-full overflow-y-auto custom-scrollbar">
            <h2 className="text-4xl font-bold text-[#00ff00] mb-4">Rishit Tandon</h2>
            <p className="text-xl text-white">Full Stack Developer</p>
            <p className="leading-relaxed text-lg">
                I am a passionate developer with a knack for building beautiful and functional web applications.
                I love exploring new technologies and pushing the boundaries of what's possible on the web.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#333]">
                    <h3 className="text-[#0099ff] font-bold mb-2 text-lg">Location</h3>
                    <p className="text-gray-400">India</p>
                </div>
                <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#333]">
                    <h3 className="text-[#0099ff] font-bold mb-2 text-lg">Experience</h3>
                    <p className="text-gray-400">2+ Years</p>
                </div>
            </div>
        </div>
    );

    useEffect(() => {
        setWindows(prev => prev.map(w => w.id === "about" ? { ...w, content: <AboutContent /> } : w));
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 overflow-hidden select-none z-50"
            style={{ cursor: "url('/cursor.png'), auto" }}
        >
            <SystemBackground />
            <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />

            {/* Desktop Icons Grid */}
            <div className="relative z-10 p-4 md:p-8 flex flex-wrap content-start gap-4 md:gap-6 h-[calc(100dvh-48px)] overflow-y-auto md:overflow-visible md:flex-col md:h-[calc(100dvh-48px)]">
                {/* Main Apps */}
                <DesktopIcon label="About Me" icon={User} onClick={() => openWindow("about")} />
                <DesktopIcon label="Skills" icon={Cpu} onClick={() => openWindow("skills")} />
                <DesktopIcon label="Projects" icon={Code} onClick={() => openWindow("projects")} />
                <DesktopIcon label="Education" icon={Mail} onClick={() => openWindow("education")} />
                <DesktopIcon label="Terminal" icon={Terminal} onClick={() => openWindow("terminal")} />

                {/* Folders */}
                <div className="w-full md:w-auto md:h-8" /> {/* Spacer */}
                <DesktopIcon label="Certificates" icon={Folder} onClick={() => openWindow("certificates")} />
                <DesktopIcon label="Certifications" icon={Folder} onClick={() => openWindow("certifications")} />

                {/* Social Links */}
                <div className="w-full md:w-auto md:h-8" /> {/* Spacer */}
                <DesktopIcon label="GitHub" icon={Github} onClick={() => openLink("https://github.com/yourusername")} />
                <DesktopIcon label="LinkedIn" icon={Linkedin} onClick={() => openLink("https://linkedin.com/in/yourname")} />
                <DesktopIcon label="Instagram" icon={Instagram} onClick={() => openLink("https://instagram.com/yourusername")} />
                <DesktopIcon label="WhatsApp" icon={MessageCircle} onClick={() => openLink("https://wa.me/your-number")} />
                <DesktopIcon label="Email" icon={Mail} onClick={() => openLink("mailto:your.email@example.com")} />

                {/* Project Shortcuts */}
                <div className="w-full md:w-auto md:h-8" /> {/* Spacer */}
                <DesktopIcon label="AI Assistant" icon={FileText} onClick={() => openWindow("projects")} />
                <DesktopIcon label="3D Portfolio" icon={FileText} onClick={() => openWindow("projects")} />
                <DesktopIcon label="Task Master" icon={FileText} onClick={() => openWindow("projects")} />
            </div>

            {/* Windows */}
            {windows.map((window) => (
                <Window
                    key={window.id}
                    id={window.id}
                    title={window.title}
                    isOpen={window.isOpen}
                    isMinimized={window.isMinimized}
                    onClose={() => closeWindow(window.id)}
                    onMinimize={() => minimizeWindow(window.id)}
                    zIndex={window.zIndex}
                    onFocus={() => focusWindow(window.id)}
                >
                    {window.content}
                </Window>
            ))}

            {/* Taskbar */}
            <Taskbar
                openWindows={windows.filter((w) => w.isOpen)}
                activeWindowId={activeWindowId}
                onWindowClick={(id) => {
                    const win = windows.find((w) => w.id === id);
                    if (win?.isMinimized || activeWindowId !== id) {
                        focusWindow(id);
                    } else {
                        minimizeWindow(id);
                    }
                }}
                onStartClick={() => openWindow("terminal")}
            />
        </motion.div>
    );
}
