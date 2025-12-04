"use client";

import { motion } from "framer-motion";
import { Award, Calendar, ExternalLink } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

import { certificatesData } from "@/data/certificates";

export function Certifications() {
    const [activeTab, setActiveTab] = useState<"certificates" | "certifications">("certificates");

    const currentData = certificatesData.filter(item =>
        activeTab === "certificates" ? item.type === "certificate" : item.type === "certification"
    );

    return (
        <section id="certifications" className="min-h-screen flex items-center justify-center px-6 py-20">
            <div className="max-w-6xl w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-[#00ff00] mb-4">
                        <span className="text-gray-500"># </span>Achievements
                    </h2>
                    <p className="text-gray-400 mb-8">Professional certifications and certificates</p>

                    {/* Toggle Tabs */}
                    <div className="flex gap-4 mb-12">
                        <button
                            onClick={() => setActiveTab("certificates")}
                            className={`px-6 py-3 rounded-lg font-mono text-sm font-semibold transition-all ${activeTab === "certificates"
                                ? "bg-[#00ff00] text-black"
                                : "bg-transparent text-gray-500 border border-gray-700 hover:border-[#00ff00] hover:text-[#00ff00]"
                                }`}
                        >
                            <span className="text-gray-500">{activeTab === "certificates" ? "$ " : ""}</span>
                            Certificates
                        </button>
                        <button
                            onClick={() => setActiveTab("certifications")}
                            className={`px-6 py-3 rounded-lg font-mono text-sm font-semibold transition-all ${activeTab === "certifications"
                                ? "bg-[#00ff00] text-black"
                                : "bg-transparent text-gray-500 border border-gray-700 hover:border-[#00ff00] hover:text-[#00ff00]"
                                }`}
                        >
                            <span className="text-gray-500">{activeTab === "certifications" ? "$ " : ""}</span>
                            Certifications
                        </button>
                    </div>

                    {/* Content Grid */}
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                    >
                        {currentData.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                                className="terminal-window overflow-hidden cursor-pointer group"
                            >
                                {/* Certificate Image */}
                                <div className="relative h-48 w-full bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] flex items-center justify-center">
                                    {/* Placeholder - replace with actual image */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Award className="h-20 w-20 text-[#00ff00] opacity-20" />
                                    </div>
                                    {/* Uncomment when you have images */}
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                    />

                                    {/* Link overlay */}
                                    <a
                                        href={item.link}
                                        className="absolute top-3 right-3 p-2 rounded-full bg-black/50 text-gray-400 hover:text-[#00ff00] hover:bg-black/70 transition-all"
                                    >
                                        <ExternalLink className="h-4 w-4" />
                                    </a>
                                </div>

                                {/* Details */}
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#00ff00] transition-colors">
                                        {item.title}
                                    </h3>

                                    <p className="text-[#0099ff] text-sm mb-3">{item.issuer}</p>

                                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                                        {item.description}
                                    </p>

                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <Calendar className="h-3 w-3" />
                                        <span>{item.date}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
