"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import React from "react";

interface DesktopIconProps {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
}

export const DesktopIcon = React.memo(function DesktopIcon({ label, icon: Icon, onClick }: DesktopIconProps) {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-2 p-4 rounded-lg w-24 group transition-colors"
        >
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-gray-800 to-black border border-gray-700 shadow-lg group-hover:border-[#00ff00] transition-colors">
                <Icon className="w-6 h-6 text-gray-300 group-hover:text-[#00ff00]" />
            </div>
            <span className="text-xs text-white font-medium drop-shadow-md text-center leading-tight group-hover:text-[#00ff00]">
                {label}
            </span>
        </motion.button>
    );
});
