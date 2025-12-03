"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", updateMousePosition);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
        };
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999]"
            animate={{ x: mousePosition.x, y: mousePosition.y }}
            transition={{ type: "tween", ease: "backOut", duration: 0 }}
        >
            <img
                src="/cursor.png"
                alt="cursor"
                className="w-6 h-auto drop-shadow-[0_0_2px_rgba(0,0,0,0.5)]"
            />
        </motion.div>
    );
}
