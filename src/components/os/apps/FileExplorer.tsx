"use client";

import { FileText, Folder, Image as ImageIcon } from "lucide-react";

interface FileExplorerProps {
    folderId: string;
}

export function FileExplorer({ folderId }: FileExplorerProps) {
    const getFiles = () => {
        switch (folderId) {
            case "certificates":
                return [
                    { name: "JS_Algo.pdf", type: "pdf", icon: FileText },
                    { name: "Responsive_Web.pdf", type: "pdf", icon: FileText },
                    { name: "Frontend_Libs.pdf", type: "pdf", icon: FileText },
                ];
            case "certifications":
                return [
                    { name: "AWS_Architect.png", type: "image", icon: ImageIcon },
                    { name: "Full_Stack.png", type: "image", icon: ImageIcon },
                    { name: "React_Dev.png", type: "image", icon: ImageIcon },
                ];
            default:
                return [];
        }
    };

    const files = getFiles();

    return (
        <div className="h-full bg-[#1a1a1a] p-4">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-4 pb-2 border-b border-[#333]">
                <Folder className="w-4 h-4" />
                <span>/home/guest/{folderId}</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {files.map((file, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 p-4 hover:bg-white/5 rounded-lg cursor-pointer group transition-colors">
                        <file.icon className="w-12 h-12 text-gray-400 group-hover:text-[#00ff00] transition-colors" />
                        <span className="text-xs text-gray-300 text-center truncate w-full group-hover:text-white">
                            {file.name}
                        </span>
                    </div>
                ))}
                {files.length === 0 && (
                    <div className="col-span-2 md:col-span-4 text-center text-gray-500 py-10">
                        This folder is empty.
                    </div>
                )}
            </div>
        </div>
    );
}
