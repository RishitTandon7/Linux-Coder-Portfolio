"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Desktop } from "../os/Desktop";
import { SystemBackground } from "../os/SystemBackground";

interface HeroProps {
    onToggleGui?: (hide: boolean) => void;
    isDockHidden?: boolean;
}

export function Hero({ onToggleGui, isDockHidden }: HeroProps) {
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<Array<{ command: string; output: React.ReactNode }>>([]);
    const [isGuiMode, setIsGuiMode] = useState(false);
    const terminalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setTimeout(() => {
            setHistory([{
                command: "",
                output: (
                    <div className="text-[#00ff00] mb-4">
                        <div className="text-xl font-bold mb-2">👋 Welcome! I&apos;m Rishit Tandon</div>
                        <div className="text-sm text-gray-400 mb-2">Type &apos;help&apos; to see available commands.</div>
                        <div className="text-xs text-gray-500">Or type &apos;gui&apos; to launch Desktop Mode 🖥️</div>
                    </div>
                )
            }]);
        }, 500);
    }, []);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [history]);

    const commands: Record<string, () => React.ReactNode | void> = {
        help: () => (
            <div className="text-sm">
                <div className="text-[#0099ff] mb-2">Available commands:</div>
                <div className="pl-4 space-y-1 text-gray-400">
                    <div><span className="text-[#00ff00]">about</span> - Learn about me</div>
                    <div><span className="text-[#00ff00]">skills</span> - View my tech stack</div>
                    <div><span className="text-[#00ff00]">education</span> - My educational background</div>
                    <div><span className="text-[#00ff00]">projects</span> - See my work</div>
                    <div><span className="text-[#00ff00]">contact</span> - Get in touch</div>
                    <div><span className="text-[#00ff00]">socials</span> - View social links</div>
                    <div><span className="text-[#00ff00]">gui</span> - Launch Desktop Mode 🚀</div>
                    <div><span className="text-[#00ff00]">resume</span> - Download Resume 📄</div>
                    <div><span className="text-[#00ff00]">taskbar</span> - Toggle navigation dock</div>
                    <div><span className="text-[#00ff00]">whoami</span> - Current user</div>
                    <div><span className="text-[#00ff00]">ls</span> - List directories</div>
                    <div><span className="text-[#00ff00]">date</span> - Show date</div>
                    <div><span className="text-[#00ff00]">repo</span> - View source code</div>
                    <div><span className="text-[#00ff00]">clear</span> - Clear terminal</div>
                </div>
            </div>
        ),
        gui: () => {
            setIsGuiMode(true);
            onToggleGui?.(true);
            return (
                <div className="text-[#00ff00]">
                    Launching Desktop Environment...
                </div>
            );
        },
        resume: () => {
            const link = document.createElement('a');
            link.href = '/Resume.pdf';
            link.download = 'Rishit_Tandon_Resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            return (
                <div className="text-[#00ff00]">
                    Downloading resume...
                </div>
            );
        },
        taskbar: () => {
            const newState = !isDockHidden;
            onToggleGui?.(newState);
            return (
                <div className="text-[#00ff00]">
                    {newState ? "Taskbar hidden." : "Taskbar enabled."}
                </div>
            );
        },
        whoami: () => (
            <div className="text-[#00ff00]">guest@portfolio</div>
        ),
        date: () => (
            <div className="text-gray-300">{new Date().toString()}</div>
        ),
        ls: () => (
            <div className="grid grid-cols-2 gap-2 text-[#0099ff]">
                <span>about/</span>
                <span>skills/</span>
                <span>projects/</span>
                <span>education/</span>
                <span>contact/</span>
                <span className="text-gray-500">README.md</span>
            </div>
        ),
        repo: () => (
            <div className="text-gray-300">
                Opening GitHub repository...
                {/* Replace with actual repo URL if known, otherwise placeholder */}
                <script dangerouslySetInnerHTML={{ __html: "window.open('https://github.com/yourusername/portfolio', '_blank')" }} />
            </div>
        ),
        echo: () => (
            <div className="text-gray-300">Usage: echo [text]</div>
        ),
        about: () => (
            <div className="text-sm">
                <div className="text-[#00ff00] text-lg mb-2">👋 About Me</div>
                <div className="text-gray-300 space-y-2">
                    <p><span className="text-[#0099ff]">Name:</span> Rishit Tandon</p>
                    <p><span className="text-[#0099ff]">Role:</span> Full Stack Developer</p>
                    <p><span className="text-[#0099ff]">Education:</span> B.Tech, SRM Institute (2023-2027)</p>
                    <p>Passionate about building innovative web applications.</p>
                    <p className="text-[#00ff00]">Status: Available for work</p>
                </div>
            </div>
        ),
        skills: () => (
            <div className="text-sm">
                <div className="text-[#00ff00] mb-2">⚡ Tech Stack</div>
                <div className="grid grid-cols-2 gap-2 text-gray-300">
                    {[
                        "JavaScript/TypeScript", "React/Next.js", "Node.js/Express",
                        "PostgreSQL/MongoDB", "Docker/Kubernetes", "AWS/GCP",
                        "Git/GitHub Actions", "Linux/Bash"
                    ].map((skill, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <span className="text-[#00ff00]">▸</span>
                            <span>{skill}</span>
                        </div>
                    ))}
                </div>
            </div>
        ),
        education: () => (
            <div className="text-sm">
                <div className="text-[#00ff00] mb-3">🎓 Education</div>
                <div className="space-y-3">
                    <div className="border-l-2 border-[#00ff00] pl-3">
                        <div className="text-[#0099ff] font-semibold">B.Tech</div>
                        <div className="text-gray-400">SRM Institute of Science and Technology</div>
                        <div className="text-xs text-gray-500">2023 - 2027</div>
                    </div>
                    <div className="border-l-2 border-[#ffaa00] pl-3">
                        <div className="text-[#0099ff] font-semibold">12th</div>
                        <div className="text-gray-400">Delhi Public School, Gomti Nagar, Lucknow</div>
                        <div className="text-xs text-gray-500">2021 - 2023</div>
                    </div>
                    <div className="border-l-2 border-[#ff5f57] pl-3">
                        <div className="text-[#0099ff] font-semibold">10th</div>
                        <div className="text-gray-400">Seth MR Jaipuria, Gomti Nagar, Lucknow</div>
                        <div className="text-xs text-gray-500">2011 - 2020</div>
                    </div>
                </div>
            </div>
        ),
        projects: () => (
            <div className="text-sm">
                <div className="text-[#00ff00] mb-3">🚀 Featured Projects</div>
                <div className="space-y-3">
                    {[
                        { name: "E-Commerce Platform", tech: "Next.js, Stripe, PostgreSQL", desc: "Full-stack online store" },
                        { name: "Real-time Chat App", tech: "React, WebSocket, Redis", desc: "Scalable messaging platform" },
                        { name: "DevOps Dashboard", tech: "React, Node.js, Docker", desc: "CI/CD monitoring tool" }
                    ].map((project, i) => (
                        <div key={i} className="border-l-2 border-[#00ff00] pl-3">
                            <div className="text-[#0099ff] font-semibold">{project.name}</div>
                            <div className="text-xs text-gray-500">{project.tech}</div>
                            <div className="text-gray-400 text-xs mt-1">{project.desc}</div>
                        </div>
                    ))}
                </div>
            </div>
        ),
        contact: () => (
            <div className="text-sm">
                <div className="text-[#00ff00] mb-2">📬 Contact Information</div>
                <div className="space-y-2 text-gray-300">
                    <div><span className="text-[#0099ff]">Email:</span> your.email@example.com</div>
                    <div><span className="text-[#0099ff]">Location:</span> India</div>
                </div>
            </div>
        ),
        socials: () => (
            <div className="text-sm">
                <div className="text-[#00ff00] mb-2">🔗 Social Links</div>
                <div className="space-y-1">
                    {[
                        { name: "GitHub", url: "github.com/yourusername" },
                        { name: "LinkedIn", url: "linkedin.com/in/yourname" },
                    ].map((social, i) => (
                        <div key={i} className="text-gray-300">
                            <span className="text-[#0099ff]">{social.name}:</span>{" "}
                            <a href={`https://${social.url}`} className="text-[#00ff00] hover:underline">
                                {social.url}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        ),
    };

    const handleCommand = (cmd: string) => {
        const trimmedCmd = cmd.trim();
        const lowerCmd = trimmedCmd.toLowerCase();

        if (lowerCmd === "clear") {
            setHistory([]);
            return;
        }

        if (trimmedCmd === "") return;

        // Handle echo with arguments
        if (lowerCmd.startsWith("echo ")) {
            const message = trimmedCmd.slice(5);
            setHistory([...history, {
                command: cmd,
                output: <div className="text-gray-300">{message}</div>
            }]);
            return;
        }

        const output = commands[lowerCmd] ? commands[lowerCmd]() : (
            <div className="text-red-400 text-sm">
                Command not found: {trimmedCmd}. Type &apos;help&apos; for available commands.
            </div>
        );

        setHistory([...history, { command: cmd, output: output as React.ReactNode }]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            handleCommand(input);
            setInput("");
        }
    };

    return (
        <>
            <AnimatePresence>
                {isGuiMode && (
                    <Desktop onExit={() => {
                        setIsGuiMode(false);
                        onToggleGui?.(true);
                    }} />
                )}
            </AnimatePresence>

            <section className="min-h-screen p-6 flex items-center justify-center relative overflow-hidden">
                <SystemBackground className="absolute" />
                <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />

                <div className="max-w-4xl w-full relative z-10">
                    <div className="terminal-window overflow-hidden shadow-2xl">
                        <div className="flex items-center justify-between bg-[#2a2a2a] px-4 py-2 border-b border-[#333]">
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                                <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
                                <div className="h-3 w-3 rounded-full bg-[#28c840]" />
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                <Terminal className="h-3 w-3" />
                                <span className="select-none">bash - interactive terminal</span>
                            </div>
                        </div>

                        <div
                            ref={terminalRef}
                            className="p-6 font-mono text-sm h-[500px] overflow-y-auto bg-black/90 backdrop-blur-md"
                            onClick={() => inputRef.current?.focus()}
                        >
                            {history.map((item, i) => (
                                <div key={i} className="mb-4">
                                    {item.command && (
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-[#00ff00] select-none">➜</span>
                                            <span className="text-[#0099ff] select-none">~/portfolio</span>
                                            <span className="text-gray-500 select-none">$</span>
                                            <span className="text-gray-300">{item.command}</span>
                                        </div>
                                    )}
                                    {item.output}
                                </div>
                            ))}

                            <form onSubmit={handleSubmit} className="flex items-center gap-2">
                                <span className="text-[#00ff00] select-none">➜</span>
                                <span className="text-[#0099ff] select-none">~/portfolio</span>
                                <span className="text-gray-500 select-none">$</span>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    className="flex-1 bg-transparent text-gray-300 outline-none caret-[#00ff00]"
                                    autoFocus
                                    spellCheck={false}
                                />
                            </form>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-4 text-center text-xs text-gray-400 font-mono"
                    >
                        💡 Pro tip: Type &apos;gui&apos; to launch the Desktop Experience!
                    </motion.div>
                </div>
            </section>
        </>
    );
}
