"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { Card3D } from "@/components/ui/Card3D";

export function Experience() {
    const experience = [
        {
            id: 1,
            year: "Oct 2025 – Present",
            title: "Research Intern – ML & Image Processing",
            company: "SRM IST in collaboration with NIDM",
            description: [
                "Spearheading R&D for Glacial Lake Outburst Flood (GLOF) detection using Deep Learning on satellite imagery.",
                "Developing automated pipelines to monitor glacial expansion, enhancing hazard detection accuracy by 15%.",
                "Optimizing CNNs for geospatial data, reducing alert generation latency by 40% for disaster response."
            ],
            gradient: "from-blue-500 to-cyan-500"
        },
        {
            id: 2,
            year: "May 2025 – July 2025",
            title: "Software Development Intern",
            company: "DGTL Innovations",
            description: [
                "Engineered high-performance REST APIs using Python and MySQL, reducing query response time by 20%.",
                "Designed responsive frontend components using HTML, CSS, and JavaScript, increasing user retention by 15%.",
                "Streamlined development workflows using Git and participated in rigorous code reviews (99% code stability)."
            ],
            gradient: "from-purple-500 to-pink-500"
        },
    ];

    return (
        <section id="experience" className="min-h-screen px-6 flex flex-col items-center justify-center py-20">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="w-full max-w-6xl"
            >
                {/* Header */}
                <div className="mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#00ff00] mb-4">
                        <span className="text-gray-500"># </span>Experience
                    </h2>
                    <p className="text-gray-400">My professional journey</p>
                </div>

                {/* Experience Timeline */}
                <motion.div className="space-y-6">
                    {experience.map((item, index) => (
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
                                        <Briefcase className="h-8 w-8" />
                                    </div>

                                    <div className="flex-1">
                                        <span className="inline-block text-sm text-[#0099ff] font-mono mb-2">{item.year}</span>
                                        <h4 className="text-2xl font-bold text-white mb-2 hover:text-[#00ff00] transition-colors">
                                            {item.title}
                                        </h4>
                                        <p className="text-lg text-gray-300 mb-4">{item.company}</p>
                                        <ul className="space-y-2">
                                            {item.description.map((point, i) => (
                                                <li key={i} className="flex items-start gap-2 text-gray-400 text-sm leading-relaxed">
                                                    <span className="text-[#00ff00] mt-1.5">›</span>
                                                    <span>{point}</span>
                                                </li>
                                            ))}
                                        </ul>
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
