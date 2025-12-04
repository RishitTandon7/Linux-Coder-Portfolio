"use client";

import { FileText, Folder, Image as ImageIcon } from "lucide-react";

import { certificatesData } from "@/data/certificates";

interface FileExplorerProps {
    folderId: string;
}

export function FileExplorer({ folderId }: FileExplorerProps) {
    const getFiles = () => {
        const type = folderId === "certificates" ? "certificate" : "certification";
        return certificatesData
            .filter(item => item.type === type)
            .map(item => ({
                name: item.fileName || `${item.title.replace(/\s+/g, '_')}.pdf`,
                type: item.image.endsWith(".png") || item.image.endsWith(".jpg") ? "image" : "pdf",
                icon: item.image.endsWith(".png") || item.image.endsWith(".jpg") ? ImageIcon : FileText
            }));
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
