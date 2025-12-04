"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { useState } from "react";

interface ProjectsProps {
    isWindow?: boolean;
}

export function Projects({ isWindow = false }: ProjectsProps) {
    const [loadingGithub, setLoadingGithub] = useState<number | null>(null);

    const handleGithubClick = async (e: React.MouseEvent, url: string, id: number) => {
        e.preventDefault();
        setLoadingGithub(id);

        // Simulate terminal cloning effect
        await new Promise(resolve => setTimeout(resolve, 2000));

        setLoadingGithub(null);
        if (url) window.open(url, '_blank');
    };

    const projects = [
        {
            id: 1,
            title: "Agentic-AI",
            description: "Advanced AI agents framework for autonomous task execution and problem-solving.",
            tags: ["Python", "LangChain", "OpenAI"],
            github: "https://github.com/RishitTandon7/Agentic-AI",
            demo: "",
        },
        {
            id: 2,
            title: "LinkedIn-Uploader",
            description: "Automated tool for scheduling and uploading content to LinkedIn to streamline social media management.",
            tags: ["Python", "Selenium", "Automation"],
            github: "https://github.com/RishitTandon7/LinkedIn-Uploader",
            demo: "",
        },
        {
            id: 3,
            title: "VaxTrack",
            description: "Comprehensive vaccination tracking system for managing immunization records and schedules.",
            tags: ["React", "Node.js", "MongoDB"],
            github: "https://github.com/RishitTandon7/VaxTrack",
            demo: "",
        },
        {
            id: 4,
            title: "Prasad",
            description: "Community-driven food distribution platform connecting donors with those in need.",
            tags: ["Next.js", "Firebase", "Tailwind"],
            github: "https://github.com/RishitTandon7/Prasad",
            demo: "",
        },
        {
            id: 5,
            title: "EduStream",
            description: "Interactive educational streaming platform enabling real-time remote learning experiences.",
            tags: ["React", "WebRTC", "Socket.io"],
            github: "https://github.com/RishitTandon7/EduStream",
            demo: "",
        },
        {
            id: 6,
            title: "ULTRON",
            description: "Advanced AI system designed for automation and intelligent task management.",
            tags: ["Python", "AI", "Automation"],
            github: "https://github.com/RishitTandon7/ULTRON",
            demo: "",
        },
        {
            id: 7,
            title: "KisanVikas",
            description: "Agricultural platform empowering farmers with modern tools and market insights.",
            tags: ["Android", "Java", "Firebase"],
            github: "https://github.com/RishitTandon7/KisanVikas",
            demo: "",
        },
        {
            id: 8,
            title: "NeuroVibe",
            description: "Brain-Controlled Smart Wheelchair using ESP32, BioAmp, and ML. Controls movement via EEG signals.",
            tags: ["ESP32", "Machine Learning", "BCI"],
            github: "",
            demo: "",
        },
        {
            id: 9,
            title: "AI Smart Glasses",
            description: "Wearable AI with LLaMA 3.2 Vision for object detection, voice interaction, and assistive features.",
            tags: ["Python", "OpenCV", "LLaMA"],
            github: "",
            demo: "",
        },
    ];

    return (
        <section id="projects" className={`${isWindow ? "min-h-0 py-8" : "min-h-screen py-20"} px-6 flex flex-col items-center justify-center`}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="w-full max-w-6xl"
            >
                {/* Header */}
                <div className="mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#00ff00] mb-4">
                        <span className="text-gray-500"># </span>Projects
                    </h2>
                    <p className="text-gray-400">Featured open source work</p>
                </div>

                <div className={`grid gap-6 ${isWindow ? "grid-cols-1" : "md:grid-cols-2 lg:grid-cols-3"}`}>
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="terminal-window overflow-hidden group hover:border-[#00ff00] transition-all duration-300 flex flex-col"
                        >
                            {/* Project Number Header */}
                            <div className="bg-[#1a1a1a] px-4 py-2 border-b border-[#333] flex items-center justify-between shrink-0">
                                <span className="text-[#00ff00] font-mono text-sm">
                                    project_{String(project.id).padStart(2, '0')}.sh
                                </span>
                                <div className="flex gap-1.5">
                                    <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                                    <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
                                    <div className="h-3 w-3 rounded-full bg-[#28c840]" />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col h-full">
                                <h3 className="mb-3 text-xl font-bold text-white group-hover:text-[#00ff00] transition-colors">
                                    {project.title}
                                </h3>

                                <p className="mb-4 text-gray-400 text-sm leading-relaxed flex-grow">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 text-xs font-mono bg-[#1a1a1a] text-[#00ff00] border border-[#333] rounded"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-3 mt-auto">
                                    <motion.button
                                        onClick={(e) => handleGithubClick(e, project.github, project.id)}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        disabled={loadingGithub === project.id}
                                        className="flex-1 relative overflow-hidden bg-[#00ff00] text-black px-4 py-2.5 rounded font-mono text-sm font-semibold hover:bg-[#00cc00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <AnimatePresence mode="wait">
                                            {loadingGithub === project.id ? (
                                                <motion.div
                                                    key="loading"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="flex flex-col items-start gap-1"
                                                >
                                                    <div className="flex items-center gap-2 w-full">
                                                        <span className="text-xs">$</span>
                                                        <span className="text-xs">git clone...</span>
                                                    </div>
                                                    <div className="w-full bg-black/20 h-1 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: "0%" }}
                                                            animate={{ width: "100%" }}
                                                            transition={{ duration: 1.8, ease: "linear" }}
                                                            className="h-full bg-black"
                                                        />
                                                    </div>
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="button"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="flex items-center justify-center gap-2"
                                                >
                                                    <Github className="h-4 w-4" />
                                                    <span>Code</span>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.button>

                                    {project.demo && (
                                        <motion.a
                                            href={project.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="flex items-center justify-center gap-2 px-4 py-2.5 border border-[#00ff00] text-[#00ff00] rounded font-mono text-sm font-semibold hover:bg-[#00ff00] hover:text-black transition-all"
                                        >
                                            <ExternalLink className="h-4 w-4" />
                                            <span>Demo</span>
                                        </motion.a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* View All Projects Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center"
                >
                    <a
                        href="https://github.com/RishitTandon7?tab=repositories"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-[#1a1a1a] border border-[#333] text-[#00ff00] rounded-lg font-mono font-bold hover:bg-[#00ff00] hover:text-black transition-all group"
                    >
                        <Github className="w-5 h-5" />
                        <span>View All Projects on GitHub</span>
                        <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </a>
                </motion.div>
            </motion.div>
        </section>
    );
}
