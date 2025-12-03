"use client";

import { useState, useRef } from "react";
import { motion, useDragControls } from "framer-motion";
import { X, Minus, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface WindowProps {
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    defaultPosition?: { x: number; y: number };
    className?: string;
}

export function Window({
    title,
    children,
    isOpen,
    onClose,
    defaultPosition = { x: 100, y: 100 },
    className,
}: WindowProps) {
    const dragControls = useDragControls();
    const [isMaximized, setIsMaximized] = useState(false);
    const constraintsRef = useRef(null);

    if (!isOpen) return null;

    return (
        <motion.div
            ref={constraintsRef}
            initial={{ opacity: 0, scale: 0.9, x: defaultPosition.x, y: defaultPosition.y }}
            animate={{
                opacity: 1,
                scale: 1,
                x: isMaximized ? 0 : undefined,
                y: isMaximized ? 0 : undefined,
                width: isMaximized ? "100vw" : undefined,
                height: isMaximized ? "100vh" : undefined,
            }}
            exit={{ opacity: 0, scale: 0.9 }}
            drag={!isMaximized}
            dragControls={dragControls}
            dragMomentum={false}
            dragListener={false}
            className={cn(
                "fixed flex flex-col overflow-hidden rounded-lg border border-white/20 bg-black/60 backdrop-blur-xl shadow-2xl transition-colors",
                isMaximized ? "inset-0 z-50 rounded-none" : "w-[800px] h-[600px] z-40",
                className
            )}
        >
            {/* Window Header */}
            <div
                onPointerDown={(e) => dragControls.start(e)}
                className="flex h-10 items-center justify-between bg-white/5 px-4 cursor-grab active:cursor-grabbing border-b border-white/10"
            >
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5 group">
                        <button
                            onClick={onClose}
                            className="h-3 w-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors"
                        >
                            <X className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100" />
                        </button>
                        <button
                            onClick={() => setIsMaximized(!isMaximized)} // Simple minimize behavior for now
                            className="h-3 w-3 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center transition-colors"
                        >
                            <Minus className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100" />
                        </button>
                        <button
                            onClick={() => setIsMaximized(!isMaximized)}
                            className="h-3 w-3 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center transition-colors"
                        >
                            <Maximize2 className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100" />
                        </button>
                    </div>
                    <span className="ml-4 text-xs font-medium text-white/70 select-none">{title}</span>
                </div>
            </div>

            {/* Window Content */}
            <div className="flex-1 overflow-auto p-6 text-white/90 custom-scrollbar">
                {children}
            </div>
        </motion.div>
    );
}
