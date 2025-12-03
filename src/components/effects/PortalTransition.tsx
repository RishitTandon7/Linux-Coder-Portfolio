"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface PortalTransitionProps {
    onComplete: () => void;
    isActive: boolean;
}

export function PortalTransition({ onComplete, isActive }: PortalTransitionProps) {
    const [particles, setParticles] = useState<{ x: number; y: number }[]>([]);

    useEffect(() => {
        setParticles(
            Array.from({ length: 20 }).map(() => ({
                x: Math.random() * 100,
                y: Math.random() * 100,
            }))
        );
    }, []);

    return (
        <AnimatePresence>
            {isActive && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
                >
                    {/* Warp Speed Effect */}
                    <div className="absolute inset-0 overflow-hidden">
                        {particles.map((pos, i) => (
                            <motion.div
                                key={i}
                                initial={{
                                    scale: 0,
                                    opacity: 0,
                                    x: "50%",
                                    y: "50%",
                                }}
                                animate={{
                                    scale: [0, 5],
                                    opacity: [0, 1, 0],
                                }}
                                transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    delay: i * 0.05,
                                    ease: "easeIn",
                                }}
                                className="absolute left-0 top-0 h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_20px_#3b82f6]"
                                style={{
                                    left: `${pos.x}%`,
                                    top: `${pos.y}%`,
                                }}
                            />
                        ))}
                    </div>

                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1.5, opacity: 1 }}
                        transition={{ duration: 1.5 }}
                        className="relative z-10 text-4xl font-bold text-blue-400"
                    >
                        INITIATING JUMP...
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
