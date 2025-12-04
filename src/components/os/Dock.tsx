"use client";

import { motion } from "framer-motion";
import { Terminal, User, Cpu, Code, Mail, Briefcase, Folder } from "lucide-react";

interface DockProps {
    openWindows: Array<{ id: string; title: string; isMinimized: boolean }>;
    activeWindowId: string | null;
    onWindowClick: (id: string) => void;
    onAppClick: (id: string) => void;
}

export function Dock({ openWindows, activeWindowId, onWindowClick, onAppClick }: DockProps) {
    const dockItems = [
        { id: "about", icon: User, label: "About" },
        { id: "skills", icon: Cpu, label: "Skills" },
        { id: "projects", icon: Code, label: "Projects" },
        { id: "education", icon: Mail, label: "Education" },
        { id: "experience", icon: Briefcase, label: "Experience" },
        { id: "terminal", icon: Terminal, label: "Terminal" },
        { id: "certificates", icon: Folder, label: "Certificates" },
    ];

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[10000]">
            <div className="flex items-end gap-2 px-4 py-3 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl">
                {dockItems.map((item) => {
                    const isOpen = openWindows.some(w => w.id === item.id);
                    const isActive = activeWindowId === item.id;

                    return (
                        <motion.button
                            key={item.id}
                            onClick={() => onAppClick(item.id)}
                            whileHover={{ scale: 1.2, y: -10 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative group p-2 rounded-xl transition-all duration-300 ease-out"
                        >
                            <div className={`p-2.5 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 shadow-lg group-hover:shadow-[#00ff00]/20 group-hover:border-[#00ff00]/30 transition-all`}>
                                <item.icon className="w-6 h-6 text-white group-hover:text-[#00ff00] transition-colors" />
                            </div>

                            {/* Dot indicator for open apps */}
                            {isOpen && (
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#00ff00]" />
                            )}

                            {/* Tooltip */}
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 backdrop-blur-md border border-white/10 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                {item.label}
                            </div>
                        </motion.button>
                    );
                })}

                {/* Separator for open windows that aren't pinned apps (like image previews) */}
                {openWindows.filter(w => !dockItems.some(i => i.id === w.id)).length > 0 && (
                    <div className="w-[1px] h-8 bg-white/10 mx-1" />
                )}

                {/* Other open windows */}
                {openWindows.filter(w => !dockItems.some(i => i.id === w.id)).map((window) => (
                    <motion.button
                        key={window.id}
                        onClick={() => onWindowClick(window.id)}
                        whileHover={{ scale: 1.2, y: -10 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative group p-2 rounded-xl transition-all duration-300 ease-out"
                    >
                        <div className="p-2.5 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 shadow-lg">
                            <Folder className="w-6 h-6 text-gray-300" />
                        </div>

                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gray-400" />

                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 backdrop-blur-md border border-white/10 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none max-w-[100px] truncate">
                            {window.title}
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
}
