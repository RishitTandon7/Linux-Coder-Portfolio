"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { useState } from "react";

export function Projects() {
    const [loadingGithub, setLoadingGithub] = useState<number | null>(null);

    const handleGithubClick = (e: React.MouseEvent, url: string, id: number) => {
        e.preventDefault();
        setLoadingGithub(id);
        setTimeout(() => {
            window.open(url, "_blank");
            setLoadingGithub(null);
        }, 2000);
    };

    const projects = [
        {
            id: 1,
            title: "AI Code Assistant",
            description: "Revolutionary AI platform with natural language processing and intelligent code generation.",
            tags: ["Next.js", "OpenAI", "TypeScript"],
            github: "https://github.com",
            demo: "https://demo.com",
        },
        {
            id: 2,
            title: "3D Portfolio",
            description: "Immersive portfolio with stunning 3D product previews and physics-based animations.",
            tags: ["React", "Three.js", "Framer"],
            github: "https://github.com",
            demo: "https://demo.com",
        },
        {
            id: 3,
            title: "Task Master Pro",
            description: "Gamified productivity app with real-time collaboration and beautiful interactions.",
            tags: ["TypeScript", "Firebase"],
            github: "https://github.com",
            demo: "https://demo.com",
        },
    ];

    return (
        <section id="projects" className="min-h-screen py-32 px-6">
            <div className="mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-[#00ff00] mb-4">
                        <span className="text-gray-500"># </span>Projects
                    </h2>
                    <p className="text-gray-400">Recent work showcasing creativity and technical excellence</p>
                </motion.div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="terminal-window overflow-hidden group hover:border-[#00ff00] transition-all duration-300"
                        >
                            {/* Project Number Header */}
                            <div className="bg-[#1a1a1a] px-4 py-2 border-b border-[#333] flex items-center justify-between">
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
                            <div className="p-6">
                                <h3 className="mb-3 text-xl font-bold text-white group-hover:text-[#00ff00] transition-colors">
                                    {project.title}
                                </h3>

                                <p className="mb-4 text-gray-400 text-sm leading-relaxed">
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
                                <div className="flex gap-3">
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
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
