"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Square } from "lucide-react";
import { ReactNode, useRef, useState, useEffect } from "react";

interface WindowProps {
    id: string;
    title: string;
    isOpen: boolean;
    isMinimized: boolean;
    onClose: () => void;
    onMinimize: () => void;
    children: ReactNode;
    zIndex: number;
    onFocus: () => void;
}

export function Window({
    id,
    title,
    isOpen,
    isMinimized,
    onClose,
    onMinimize,
    children,
    zIndex,
    onFocus,
}: WindowProps) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <AnimatePresence>
            {isOpen && !isMinimized && (
                <motion.div
                    initial={{ scale: 0.8, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.8, opacity: 0, y: 20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    drag={!isMobile}
                    dragMomentum={false}
                    className={`
                        absolute bg-[#0a0a0a]/95 backdrop-blur-xl border border-[#333] shadow-2xl overflow-hidden flex flex-col
                        ${isMobile
                            ? "inset-0 w-full h-[calc(100vh-48px)] rounded-none top-0 left-0"
                            : "top-20 left-1/4 w-[800px] h-[70vh] rounded-lg"
                        }
                    `}
                    style={{ zIndex }}
                    onMouseDown={onFocus}
                >
                    {/* Window Header */}
                    <div
                        className="h-10 bg-[#1a1a1a] border-b border-[#333] flex items-center justify-between px-4 cursor-move shrink-0"
                        onPointerDown={(e) => e.preventDefault()}
                    >
                        <div className="flex items-center gap-2">
                            <button
                                onClick={(e) => { e.stopPropagation(); onClose(); }}
                                className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff5f57]/80 transition-colors flex items-center justify-center group"
                            >
                                <X className="w-2 h-2 text-black opacity-0 group-hover:opacity-100" />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); onMinimize(); }}
                                className="w-3 h-3 rounded-full bg-[#febc2e] hover:bg-[#febc2e]/80 transition-colors flex items-center justify-center group"
                            >
                                <Minus className="w-2 h-2 text-black opacity-0 group-hover:opacity-100" />
                            </button>
                            <div className="w-3 h-3 rounded-full bg-[#28c840] hover:bg-[#28c840]/80 transition-colors flex items-center justify-center group">
                                <Square className="w-2 h-2 text-black opacity-0 group-hover:opacity-100" />
                            </div>
                        </div>
                        <div className="text-xs font-mono text-gray-400 select-none">{title}</div>
                        <div className="w-14" /> {/* Spacer for centering */}
                    </div>

                    {/* Window Content */}
                    <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-black/50">
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
