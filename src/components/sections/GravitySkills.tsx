"use client";

import { motion } from "framer-motion";

export function GravitySkills() {
    const skills = [
        { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/F7DF1E" },
        { name: "HTML5", icon: "https://cdn.simpleicons.org/html5/E34F26" },
        { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
        { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB" },
        { name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB" },
        { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
        { name: "C++", icon: "https://cdn.simpleicons.org/cplusplus/00599C" },
        { name: "PHP", icon: "https://cdn.simpleicons.org/php/777BB4" },
        { name: "C#", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
        { name: "C", icon: "https://cdn.simpleicons.org/c/A8B9CC" },
        { name: "Unity", icon: "https://cdn.simpleicons.org/unity/FFFFFF" },
    ];

    return (
        <div className="container mx-auto max-w-6xl px-6 py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
            >
                <h2 className="text-4xl md:text-5xl font-bold text-[#00ff00] mb-4">
                    <span className="text-gray-500"># </span>Skills
                </h2>
                <p className="text-gray-400">Technologies I work with</p>
            </motion.div>

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {skills.map((skill, index) => (
                    <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ y: -8, scale: 1.05 }}
                        className="terminal-window p-6 flex flex-col items-center gap-3 text-center group cursor-pointer hover:border-[#00ff00] transition-all"
                    >
                        <div className="h-16 w-16 rounded-xl bg-[#1a1a1a] flex items-center justify-center p-3 group-hover:bg-[#252525] transition-colors">
                            <img
                                src={skill.icon}
                                alt={skill.name}
                                className="h-full w-full object-contain"
                            />
                        </div>
                        <p className="text-sm font-mono font-medium text-gray-300 group-hover:text-[#00ff00] transition-colors">
                            {skill.name}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
