"use client";

import { useState, useEffect } from "react";
import { Wifi, Battery, Search, Command, Apple } from "lucide-react";

export function TopBar() {
    const [time, setTime] = useState<string>("");
    const [date, setDate] = useState<string>("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            setDate(now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }));
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 h-8 bg-black/40 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-4 z-[10000] text-xs font-medium select-none text-white">
            {/* Left Side */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 hover:bg-white/10 px-2 py-1 rounded cursor-default transition-colors">
                    <Apple className="w-4 h-4 fill-current" />
                </div>
                <div className="font-bold cursor-default hidden sm:block">Rishit OS</div>

                {/* Menu Items */}
                <div className="hidden md:flex items-center gap-1">
                    {["File", "Edit", "View", "Go", "Window", "Help"].map((item) => (
                        <div key={item} className="px-3 py-1 hover:bg-white/10 rounded cursor-default transition-colors">
                            {item}
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-3 px-2">
                    <Battery className="w-4 h-4" />
                    <Wifi className="w-4 h-4" />
                    <Search className="w-4 h-4" />
                </div>

                <div className="flex items-center gap-2 px-2 py-1 hover:bg-white/10 rounded cursor-default transition-colors">
                    <span className="hidden sm:inline">{date}</span>
                    <span>{time}</span>
                </div>
            </div>
        </div>
    );
}
