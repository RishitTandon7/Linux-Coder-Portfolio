"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

interface SystemBackgroundProps {
    className?: string;
}

export function SystemBackground({ className }: SystemBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let mouseX = 0;
        let mouseY = 0;

        // Configuration
        const blockSize = 30;
        const gap = 2;
        const baseColor = { r: 0, g: 255, b: 0 }; // Terminal Green
        const activeColor = { r: 255, g: 255, b: 255 }; // White hot

        // Grid state
        let cols = 0;
        let rows = 0;
        let blocks: Array<{
            x: number;
            y: number;
            intensity: number;
            targetIntensity: number;
            lastUpdate: number;
        }> = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            cols = Math.ceil(canvas.width / (blockSize + gap));
            rows = Math.ceil(canvas.height / (blockSize + gap));
            initBlocks();
        };

        const initBlocks = () => {
            blocks = [];
            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    blocks.push({
                        x: i * (blockSize + gap),
                        y: j * (blockSize + gap),
                        intensity: Math.random() * 0.1, // Low base intensity
                        targetIntensity: Math.random() * 0.1,
                        lastUpdate: Math.random() * 1000,
                    });
                }
            }
        };

        const draw = (timestamp: number) => {
            // Clear background
            ctx.fillStyle = "#050505";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            blocks.forEach((block) => {
                // Random updates simulating system activity
                if (timestamp - block.lastUpdate > 100 + Math.random() * 2000) {
                    block.targetIntensity = Math.random() > 0.95 ? 0.8 : Math.random() * 0.15;
                    block.lastUpdate = timestamp;
                }

                // Mouse interaction (hover effect)
                const dx = mouseX - (block.x + blockSize / 2);
                const dy = mouseY - (block.y + blockSize / 2);
                const distance = Math.sqrt(dx * dx + dy * dy);
                const hoverRadius = 150;

                if (distance < hoverRadius) {
                    const boost = (1 - distance / hoverRadius) * 0.8;
                    block.intensity += (block.targetIntensity + boost - block.intensity) * 0.1;
                } else {
                    block.intensity += (block.targetIntensity - block.intensity) * 0.05;
                }

                // Draw block
                const alpha = Math.max(0.02, Math.min(1, block.intensity));

                // Color mixing: mostly green, but gets whiter as it gets more intense
                const r = Math.floor(baseColor.r + (activeColor.r - baseColor.r) * block.intensity);
                const g = Math.floor(baseColor.g + (activeColor.g - baseColor.g) * block.intensity);
                const b = Math.floor(baseColor.b + (activeColor.b - baseColor.b) * block.intensity);

                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
                ctx.fillRect(block.x, block.y, blockSize, blockSize);
            });

            // Scanline effect
            const scanlineY = (timestamp * 0.1) % canvas.height;
            const gradient = ctx.createLinearGradient(0, scanlineY, 0, scanlineY + 100);
            gradient.addColorStop(0, "rgba(0, 255, 0, 0)");
            gradient.addColorStop(0.5, "rgba(0, 255, 0, 0.05)");
            gradient.addColorStop(1, "rgba(0, 255, 0, 0)");
            ctx.fillStyle = gradient;
            ctx.fillRect(0, scanlineY, canvas.width, 100);

            animationFrameId = requestAnimationFrame(draw);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", handleMouseMove);

        resize();
        animationFrameId = requestAnimationFrame(draw);

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className={cn("fixed inset-0 z-0 bg-[#050505] overflow-hidden", className)}>
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full opacity-40"
            />
            <div className="absolute bottom-4 right-4 text-[#00ff00]/20 font-mono text-xs select-none pointer-events-none">
                root@rishit-os: /dev/mem
            </div>
        </div>
    );
}
