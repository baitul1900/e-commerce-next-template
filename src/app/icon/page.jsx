"use client";

import Icon from "@/components/icon/Icon";
import { useState } from "react";
import { ICON_COMPONENT_SOURCE } from "@/components/icon/iconSource";

export default function IconPage() {
    const [showCode, setShowCode] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(ICON_COMPONENT_SOURCE);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4">
            {/* Trigger */}
            <button
                onClick={() => setShowCode((p) => !p)}
                className="p-4 rounded-lg hover:bg-gray-100 transition"
            >
                <Icon name="Home" size={48} />
            </button>

            {/* Full Component Code */}
            {showCode && (
                <div className="w-full max-w-4xl bg-[#0f172a] text-white rounded-xl shadow-lg">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                        <span className="text-sm text-gray-300">
                            Global Icon Component (Icon.tsx)
                        </span>
                        <button
                            onClick={handleCopy}
                            className="text-xs px-3 py-1 rounded bg-white/10 hover:bg-white/20"
                        >
                            Copy
                        </button>
                    </div>

                    <pre className="p-4 text-sm overflow-x-auto leading-relaxed">
                        <code>{ICON_COMPONENT_SOURCE}</code>
                    </pre>
                </div>
            )}
        </div>
    );
}
