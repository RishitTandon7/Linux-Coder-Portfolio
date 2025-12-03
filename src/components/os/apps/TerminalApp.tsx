"use client";

import { useState, useEffect, useRef } from "react";
import { Terminal } from "lucide-react";

interface TerminalAppProps {
    onExit: () => void;
}

export function TerminalApp({ onExit }: TerminalAppProps) {
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<Array<{ command: string; output: React.ReactNode }>>([]);
    const terminalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

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
        const trimmedCmd = cmd.trim().toLowerCase();

        if (trimmedCmd === "clear") {
            setHistory([]);
            return;
        }

        if (trimmedCmd === "exit" || trimmedCmd === "reboot") {
            onExit();
            return;
        }

        if (trimmedCmd === "") return;

        let output: React.ReactNode;

        switch (trimmedCmd) {
            case "help":
                output = (
                    <div className="text-gray-300">
                        <div>Available commands:</div>
                        <div className="pl-4">
                            <div><span className="text-[#00ff00]">ls</span> - List directory contents</div>
                            <div><span className="text-[#00ff00]">whoami</span> - Print current user</div>
                            <div><span className="text-[#00ff00]">date</span> - Print system date</div>
                            <div><span className="text-[#00ff00]">clear</span> - Clear terminal screen</div>
                            <div><span className="text-[#00ff00]">exit</span> - Exit to main CLI</div>
                        </div>
                    </div>
                );
                break;
            case "ls":
                output = (
                    <div className="grid grid-cols-3 gap-4 text-[#0099ff]">
                        <span>Desktop/</span>
                        <span>Documents/</span>
                        <span>Downloads/</span>
                        <span>projects/</span>
                        <span>skills/</span>
                        <span>README.md</span>
                    </div>
                );
                break;
            case "whoami":
                output = <div className="text-[#00ff00]">guest@rishit-portfolio</div>;
                break;
            case "date":
                output = <div className="text-gray-300">{new Date().toString()}</div>;
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
            className="h-full bg-black/90 font-mono text-sm p-4 overflow-y-auto custom-scrollbar"
            ref={terminalRef}
            onClick={() => inputRef.current?.focus()}
        >
            {history.map((item, i) => (
                <div key={i} className="mb-2">
                    {item.command && (
                        <div className="flex items-center gap-2">
                            <span className="text-[#00ff00]">guest@rishit-os:~$</span>
                            <span className="text-gray-300">{item.command}</span>
                        </div>
                    )}
                    {item.output}
                </div>
            ))}

            <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <span className="text-[#00ff00]">guest@rishit-os:~$</span>
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
    );
}
