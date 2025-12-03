"use client";

import { motion } from "framer-motion";
import { GraduationCap, BookOpen } from "lucide-react";
import { Card3D } from "@/components/ui/Card3D";

export function Education() {
    const education = [
        {
            id: 1,
            year: "2023 - 2027",
            title: "Bachelor of Technology",
            institution: "SRM Institute of Science and Technology",
            description: "Pursuing B.Tech in Computer Science",
            gradient: "from-blue-500 to-cyan-500"
        },
        {
            id: 2,
            year: "2021 - 2023",
            title: "12th Grade",
            institution: "Delhi Public School, Gomti Nagar, Lucknow",
            description: "Higher Secondary Education",
            gradient: "from-purple-500 to-pink-500"
        },
        {
            id: 3,
            year: "2011 - 2020",
            title: "10th Grade",
            institution: "Seth MR Jaipuria, Gomti Nagar, Lucknow",
            description: "Secondary Education",
            gradient: "from-green-500 to-emerald-500"
        },
    ];

    return (
        <section id="education" className="min-h-screen px-6 flex flex-col items-center justify-center py-20">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="w-full max-w-6xl"
            >
                {/* Header */}
                <div className="mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#00ff00] mb-4">
                        <span className="text-gray-500"># </span>Education
                    </h2>
                    <p className="text-gray-400">My educational journey</p>
                </div>

                {/* Education Timeline */}
                <motion.div className="space-y-6">
                    {education.map((item, index) => (
                        <Card3D key={item.id} className="w-full">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="terminal-window p-8"
                            >
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className={`flex-shrink-0 h-16 w-16 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white font-bold text-xl`}>
                                        <GraduationCap className="h-8 w-8" />
                                    </div>

                                    <div className="flex-1">
                                        <span className="inline-block text-sm text-[#0099ff] font-mono mb-2">{item.year}</span>
                                        <h4 className="text-2xl font-bold text-white mb-2 hover:text-[#00ff00] transition-colors">
                                            {item.title}
                                        </h4>
                                        <p className="text-lg text-gray-300 mb-3">{item.institution}</p>
                                        <p className="text-gray-500">{item.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </Card3D>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}
