"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface BootSequenceProps {
    onComplete: () => void;
}

export function BootSequence({ onComplete }: BootSequenceProps) {
    const [lines, setLines] = useState<string[]>([]);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const bootMessages = [
            "[ OK ] Starting portfolio.service",
            "[ OK ] Mounting /dev/portfolio",
            "[ OK ] Loading kernel modules",
            "[ OK ] Initializing 3D graphics engine",
            "[ OK ] Starting React framework",
            "[ OK ] Loading components",
            "[ OK ] Initializing Next.js",
            "[ OK ] Starting development server",
            "[ OK ] Compiling TypeScript",
            "[ OK ] Loading assets",
            "[ OK ] Mounting user interface",
            "[ OK ] Starting animation engine",
            "[ OK ] Initializing Three.js",
            "[ OK ] Ready to display portfolio",
        ];

        let lineIndex = 0;
        const lineInterval = setInterval(() => {
            if (lineIndex < bootMessages.length) {
                setLines((prev) => [...prev, bootMessages[lineIndex]]);
                lineIndex++;
            } else {
                clearInterval(lineInterval);
            }
        }, 150);

        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    setTimeout(onComplete, 300);
                    return 100;
                }
                return prev + 5;
            });
        }, 150);

        return () => {
            clearInterval(lineInterval);
            clearInterval(progressInterval);
        };
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-50 bg-black font-mono text-green-400">
            {/* Scanline effect */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="h-full w-full bg-[linear-gradient(transparent_50%,rgba(0,255,0,0.1)_50%)] bg-[length:100%_4px]" />
            </div>

            <div className="container mx-auto max-w-4xl p-8">
                {/* Header */}
                <div className="mb-8 border-b border-green-400/30 pb-4">
                    <pre className="text-xs text-green-500">
                        {`
 ██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗ 
 ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗
 ██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║
 ██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║
 ██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝
 ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝ 
`}
                    </pre>
                    <p className="mt-2 text-sm">
                        Portfolio OS v1.0.0 (TTY1) (Kernel 6.0.0-portfolio)
                    </p>
                </div>

                {/* Boot messages */}
                <div className="space-y-1 overflow-hidden">
                    {lines.map((line, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.1 }}
                            className="flex items-center gap-2"
                        >
                            <span className="text-green-500">[{String(index + 1).padStart(2, "0")}]</span>
                            <span className="text-green-400">{line}</span>
                        </motion.div>
                    ))}

                    {lines.length === 14 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-4"
                        >
                            <p className="text-green-500">System initialization complete.</p>
                        </motion.div>
                    )}
                </div>

                {/* Progress bar */}
                <div className="mt-8">
                    <div className="mb-2 flex items-center justify-between text-sm">
                        <span>Loading system</span>
                        <span className="font-bold">{Math.floor(progress)}%</span>
                    </div>
                    <div className="h-6 border border-green-400/30 bg-black p-1">
                        <div
                            className="h-full bg-green-500 transition-all duration-150"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className="mt-2 text-xs text-green-600">
                        <motion.span
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            {">"} Preparing to start portfolio.service
                        </motion.span>
                    </div>
                </div>

                {/* Footer info */}
                <div className="mt-8 border-t border-green-400/30 pt-4 text-xs text-green-600">
                    <p>User: developer</p>
                    <p>Session: portfolio-session-{Date.now().toString().slice(-6)}</p>
                    <p className="mt-2 opacity-50">Press any key to continue...</p>
                </div>
            </div>

            {/* Cursor blink */}
            <motion.div
                className="fixed bottom-4 right-4 h-4 w-2 bg-green-400"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
            />
        </div>
    );
}
