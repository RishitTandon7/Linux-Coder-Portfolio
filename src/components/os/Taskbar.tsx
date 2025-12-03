"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, User, Cpu, Code, Mail, Award } from "lucide-react";

interface TaskbarProps {
    openWindows: Array<{ id: string; title: string; isMinimized: boolean }>;
    activeWindowId: string | null;
    onWindowClick: (id: string) => void;
    onStartClick: () => void;
}

export function Taskbar({ openWindows, activeWindowId, onWindowClick, onStartClick }: TaskbarProps) {
    const [time, setTime] = useState<string>("");

    useEffect(() => {
        setTime(new Date().toLocaleTimeString());
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed bottom-0 left-0 right-0 h-12 bg-[#0a0a0a]/80 backdrop-blur-md border-t border-[#333] flex items-center px-4 z-[10000]">
            <button
                onClick={onStartClick}
                className="p-2 mr-2 md:mr-4 hover:bg-white/10 rounded-md transition-colors"
            >
                <Terminal className="w-5 h-5 text-[#00ff00]" />
            </button>

            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
                {openWindows.map((window) => (
                    <button
                        key={window.id}
                        onClick={() => onWindowClick(window.id)}
                        className={`
              flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-md text-xs md:text-sm font-mono transition-all whitespace-nowrap
              ${activeWindowId === window.id && !window.isMinimized
                                ? "bg-[#00ff00]/10 text-[#00ff00] border border-[#00ff00]/30"
                                : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                            }
            `}
                    >
                        <span className="w-2 h-2 rounded-full bg-current" />
                        <span className="max-w-[100px] truncate">{window.title}</span>
                    </button>
                ))}
            </div>

            <div className="ml-auto flex items-center gap-4 text-xs text-gray-500 font-mono hidden md:flex">
                <span>Rishit OS v1.0</span>
                {time && <span>{time}</span>}
            </div>
        </div>
    );
}
