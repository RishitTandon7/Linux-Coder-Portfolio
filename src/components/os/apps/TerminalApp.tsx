"use client";

import { useState, useEffect, useRef } from "react";
import { Terminal } from "lucide-react";

interface TerminalAppProps {
    onExit: () => void;
}

export function TerminalApp({ onExit }: TerminalAppProps) {
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<Array<{ command: string; output: React.ReactNode }>>([]);
    const [currentDir, setCurrentDir] = useState("~");
    const terminalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Simple file system structure
    const fileSystem: Record<string, string[]> = {
        "~": ["Desktop/", "Documents/", "Downloads/", "projects/", "skills/", "README.md"],
        "~/Desktop": ["Certificates/", "Certifications/", "Trash/"],
        "~/Documents": ["Resume.pdf", "Notes.txt"],
        "~/Downloads": [],
        "~/projects": ["portfolio", "ecommerce-app", "chat-app"],
        "~/skills": ["javascript", "typescript", "react", "nextjs"],
    };

    useEffect(() => {
        setHistory([{
            command: "",
            output: (
                <div className="text-[#00ff00] mb-2">
                    <div>RishitOS Terminal v1.0</div>
                    <div className="text-gray-400">Type 'help' for commands. Type 'exit' to return to main CLI.</div>
                </div>
            )
        }]);
    }, []);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [history]);

    const handleCommand = (cmd: string) => {
        const trimmedCmd = cmd.trim();
        const lowerCmd = trimmedCmd.toLowerCase();

        if (lowerCmd === "clear") {
            setHistory([]);
            return;
        }

        if (lowerCmd === "exit" || lowerCmd === "reboot") {
            onExit();
            return;
        }

        if (trimmedCmd === "") return;

        let output: React.ReactNode;

        // Handle echo with arguments
        if (lowerCmd.startsWith("echo ")) {
            const message = cmd.slice(5);
            setHistory([...history, {
                command: cmd,
                output: <div className="text-gray-300">{message}</div>
            }]);
            return;
        }

        // Handle cd command
        if (lowerCmd.startsWith("cd")) {
            const args = trimmedCmd.split(" ");
            const target = args[1];

            if (!target || target === "~") {
                setCurrentDir("~");
            } else if (target === "..") {
                if (currentDir !== "~") {
                    const parts = currentDir.split("/");
                    parts.pop();
                    setCurrentDir(parts.join("/") || "~");
                }
            } else {
                const newPath = currentDir === "~" ? `~/${target}` : `${currentDir}/${target}`;
                // Check if directory exists (simple check against keys or known folders)
                // For simplicity, we'll check if the constructed path exists as a key in fileSystem
                // or if it's a valid subdirectory in the current listing.

                const validDirs = fileSystem[currentDir]?.filter(f => f.endsWith("/")) || [];
                const isDir = validDirs.some(d => d.replace("/", "") === target);

                if (isDir || fileSystem[newPath]) {
                    setCurrentDir(newPath);
                } else {
                    output = <div className="text-red-400">cd: no such file or directory: {target}</div>;
                    setHistory([...history, { command: cmd, output }]);
                    return;
                }
            }
            setHistory([...history, { command: cmd, output: null }]);
            return;
        }

        switch (lowerCmd) {
            case "help":
                output = (
                    <div className="text-gray-300">
                        <div>Available commands:</div>
                        <div className="pl-4">
                            <div><span className="text-[#00ff00]">ls</span> - List directory contents</div>
                            <div><span className="text-[#00ff00]">cd [dir]</span> - Change directory</div>
                            <div><span className="text-[#00ff00]">whoami</span> - Print current user</div>
                            <div><span className="text-[#00ff00]">date</span> - Print system date</div>
                            <div><span className="text-[#00ff00]">pwd</span> - Print working directory</div>
                            <div><span className="text-[#00ff00]">echo [text]</span> - Print text</div>
                            <div><span className="text-[#00ff00]">repo</span> - Open GitHub repository</div>
                            <div><span className="text-[#00ff00]">clear</span> - Clear terminal screen</div>
                            <div><span className="text-[#00ff00]">exit</span> - Exit to main CLI</div>
                        </div>
                    </div>
                );
                break;
            case "ls":
                const files = fileSystem[currentDir] || [];
                output = (
                    <div className="grid grid-cols-3 gap-4 text-[#0099ff]">
                        {files.length > 0 ? files.map((f, i) => (
                            <span key={i} className={f.endsWith("/") ? "text-[#0099ff]" : "text-gray-300"}>{f}</span>
                        )) : <span className="text-gray-500">Empty directory</span>}
                    </div>
                );
                break;
            case "whoami":
                output = <div className="text-[#00ff00]">guest@rishit-portfolio</div>;
                break;
            case "date":
                output = <div className="text-gray-300">{new Date().toString()}</div>;
                break;
            case "pwd":
                output = <div className="text-gray-300">{currentDir.replace("~", "/home/guest")}</div>;
                break;
            case "repo":
                output = (
                    <div className="text-gray-300">
                        Opening GitHub repository...
                        <script dangerouslySetInnerHTML={{ __html: "window.open('https://github.com/yourusername/portfolio', '_blank')" }} />
                    </div>
                );
                break;
            default:
                output = <div className="text-red-400">Command not found: {trimmedCmd}</div>;
        }

        setHistory([...history, { command: cmd, output }]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            handleCommand(input);
            setInput("");
        }
    };

    return (
        <div
            className="h-full bg-[#282a36]/95 font-mono text-sm p-4 overflow-y-auto custom-scrollbar selection:bg-[#44475a]"
            ref={terminalRef}
            onClick={() => inputRef.current?.focus()}
        >
            {history.map((item, i) => (
                <div key={i} className="mb-2">
                    {item.command && (
                        <div className="flex items-center gap-2">
                            <span className="text-[#bd93f9] font-bold">➜</span>
                            <span className="text-[#50fa7b]">guest</span>
                            <span className="text-[#f8f8f2]">@</span>
                            <span className="text-[#ff79c6]">rishit-os</span>
                            <span className="text-[#f8f8f2]">:</span>
                            <span className="text-[#8be9fd]">{currentDir}</span>
                            <span className="text-[#f8f8f2]">$</span>
                            <span className="text-[#f8f8f2] ml-1">{item.command}</span>
                        </div>
                    )}
                    {item.output}
                </div>
            ))}

            <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <span className="text-[#bd93f9] font-bold">➜</span>
                <span className="text-[#50fa7b]">guest</span>
                <span className="text-[#f8f8f2]">@</span>
                <span className="text-[#ff79c6]">rishit-os</span>
                <span className="text-[#f8f8f2]">:</span>
                <span className="text-[#8be9fd]">{currentDir}</span>
                <span className="text-[#f8f8f2]">$</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-transparent text-[#f8f8f2] outline-none caret-[#bd93f9] ml-1"
                    autoFocus
                    spellCheck={false}
                />
            </form>
        </div>
    );
}
