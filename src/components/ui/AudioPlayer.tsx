"use client";

import { useState, useEffect } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import useSound from "use-sound";
import { motion } from "framer-motion";

export function AudioPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);

    // Placeholder URL - User should replace this
    const musicUrl = "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3";

    const [play, { stop, sound }] = useSound(musicUrl, {
        volume,
        loop: true,
        html5: true,
    });

    useEffect(() => {
        if (isPlaying) {
            play();
        } else {
            stop();
        }
        return () => stop();
    }, [isPlaying, play, stop]);

    useEffect(() => {
        if (sound) {
            sound.fade(0, volume, 1000);
        }
    }, [volume, sound]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-8 right-8 z-50 flex items-center gap-4 rounded-full border border-white/10 bg-black/40 px-4 py-2 backdrop-blur-md"
        >
            <div className="flex items-center gap-2">
                <Music className={`w-4 h-4 ${isPlaying ? "text-green-400 animate-pulse" : "text-gray-400"}`} />
                <span className="text-xs font-mono text-white/70 hidden md:block">
                    {isPlaying ? "NOW PLAYING" : "MUSIC PAUSED"}
                </span>
            </div>

            <div className="h-4 w-[1px] bg-white/20" />

            <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors"
            >
                {isPlaying ? <Volume2 className="w-4 h-4 text-white" /> : <VolumeX className="w-4 h-4 text-white" />}
            </button>

            {isPlaying && (
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-20 accent-green-500 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
                />
            )}
        </motion.div>
    );
}
