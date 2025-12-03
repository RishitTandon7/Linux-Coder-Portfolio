"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

interface DockItem {
    id: string;
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
}

interface DockProps {
    items: DockItem[];
    className?: string;
}

export function Dock({ items, className }: DockProps) {
    return (
        <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 ${className}`}>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="flex items-end gap-3 border border-green-500/30 bg-black/90 px-6 py-4 backdrop-blur-sm shadow-[0_0_20px_rgba(74,222,128,0.15)]"
            >
                {items.map((item, i) => (
                    <DockIcon key={item.id} item={item} index={i} />
                ))}
            </motion.div>
        </div>
    );
}

function DockIcon({ item, index }: { item: DockItem; index: number }) {
    const [isHovered, setIsHovered] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 300 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set((e.clientX - centerX) * 0.1);
        mouseY.set((e.clientY - centerY) * 0.1);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
        setIsHovered(false);
    };

    return (
        <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 400, damping: 17 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            onClick={item.onClick}
            style={{ x, y }}
            className="group relative flex flex-col items-center gap-2"
        >
            <motion.div
                whileHover={{ scale: 1.2, y: -12 }}
                whileTap={{ scale: 0.9 }}
                className="flex h-14 w-14 items-center justify-center border border-green-500/30 bg-black shadow-lg transition-all group-hover:border-green-500/60 group-hover:bg-green-500/10 group-hover:shadow-[0_0_25px_rgba(74,222,128,0.3)]"
            >
                <motion.div
                    animate={isHovered ? { rotate: [0, -10, 10, -10, 0] } : {}}
                    transition={{ duration: 0.5 }}
                >
                    {item.icon}
                </motion.div>
            </motion.div>

            <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? -40 : -30 }}
                className="absolute whitespace-nowrap border border-green-500/30 bg-black px-3 py-1.5 font-mono text-xs text-green-400 shadow-[0_0_15px_rgba(74,222,128,0.2)] pointer-events-none"
            >
                $ {item.label}
            </motion.span>
        </motion.button>
    );
}
