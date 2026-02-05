'use client';

import React from 'react';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';

const styles = {
    container: (type, position) => {
        let animation = 'slide-in-from-right-8';
        if (position && position.includes('left')) animation = 'slide-in-from-left-8';
        if (position && position.includes('center')) {
            animation = position.includes('bottom') ? 'slide-in-from-bottom-8' : 'slide-in-from-top-8';
        }

        return `
        flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl pointer-events-auto
        animate-in fade-in ${animation} duration-300
        ${type === 'success' ? 'bg-primary text-white border border-primary/20' : ''}
        ${type === 'error' ? 'bg-red-600 text-white' : ''}
        ${type === 'info' ? 'bg-blue-600 text-white' : ''}
    `},
    icon: "w-5 h-5",
    content: "text-sm font-medium",
    closeButton: "ml-4 p-1 rounded-full hover:bg-white/20 transition-colors"
};

const icons = {
    success: <CheckCircle2 className={styles.icon} />,
    error: <XCircle className={styles.icon} />,
    info: <Info className={styles.icon} />
};

export default function Toast({ message, type = 'success', position, onClose }) {
    return (
        <div className={styles.container(type, position)} role="alert">
            {icons[type]}
            <p className={styles.content}>{message}</p>
            <button
                onClick={onClose}
                className={styles.closeButton}
                aria-label="Close"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}
