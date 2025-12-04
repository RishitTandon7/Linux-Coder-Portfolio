"use client";

import { motion } from "framer-motion";
import { Mail, Send, MapPin, Github, Linkedin, Instagram, MessageCircle } from "lucide-react";
import Image from "next/image";

export function Contact() {
    const socialLinks = [
        {
            name: "Email",
            icon: Mail,
            link: "mailto:rishit.tandon.7@gmail.com",
            username: "rishit.tandon.7@gmail.com",
            color: "from-red-500 to-orange-500"
        },
        {
            name: "WhatsApp",
            icon: MessageCircle,
            link: "https://wa.me/917394865520",
            username: "+91 73948 65520",
            color: "from-green-500 to-emerald-500"
        },
        {
            name: "Instagram",
            icon: Instagram,
            link: "https://instagram.com/kingrishit2.0",
            username: "@kingrishit2.0",
            color: "from-pink-500 to-purple-500"
        },
        {
            name: "GitHub",
            icon: Github,
            link: "https://github.com/rishittandon7",
            username: "@rishittandon7",
            color: "from-gray-400 to-gray-600"
        },
        {
            name: "LinkedIn",
            icon: Linkedin,
            link: "https://www.linkedin.com/in/rishit-tandon-928661287/",
            username: "Rishit Tandon",
            color: "from-blue-500 to-blue-700"
        },
    ];

    return (
        <section id="contact" className="min-h-screen flex items-center justify-center px-6 py-20">
            <div className="w-full max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-[#00ff00] mb-4">
                            <span className="text-gray-500"># </span>Contact
                        </h2>
                        <p className="text-gray-400">Let's connect and create something amazing together</p>
                    </div>

                    {/* Social Links Grid */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {socialLinks.map((social, index) => (
                            <motion.a
                                key={social.name}
                                href={social.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="terminal-window p-6 group cursor-pointer hover:border-[#00ff00] transition-all"
                            >
                                <div className="flex items-center gap-4">
                                    {/* Icon */}
                                    <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${social.color} flex items-center justify-center flex-shrink-0`}>
                                        <social.icon className="h-7 w-7 text-white" />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-mono text-gray-500 mb-1">{social.name}</p>
                                        <p className="text-base font-medium text-white group-hover:text-[#00ff00] transition-colors truncate">
                                            {social.username}
                                        </p>
                                    </div>

                                    {/* Arrow */}
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                        <svg className="h-5 w-5 text-[#00ff00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </motion.a>
                        ))}
                    </div>

                    {/* Additional Info & Resume */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="mt-12 flex flex-col items-center gap-6"
                    >
                        <a
                            href="/Resume.pdf"
                            download="Rishit_Tandon_Resume.pdf"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-[#00ff00] text-black rounded-lg font-mono font-bold hover:bg-[#00cc00] transition-all group shadow-[0_0_20px_rgba(0,255,0,0.3)] hover:shadow-[0_0_30px_rgba(0,255,0,0.5)]"
                        >
                            <Send className="h-5 w-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                            <span>Download Resume</span>
                        </a>

                        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1a1a1a] border border-[#333]">
                            <MapPin className="h-4 w-4 text-[#00ff00]" />
                            <span className="text-sm text-gray-400">Based in India</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
