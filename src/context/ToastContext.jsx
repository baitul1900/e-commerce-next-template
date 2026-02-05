'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import Toast from '@/components/ui/Toast';

const ToastContext = createContext(null);

export const ToastProvider = ({ children, position: defaultPosition = 'top-right' }) => {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((message, type = 'success', position) => {
        const id = Math.random().toString(36).substring(2, 9);
        const newToast = {
            id,
            message,
            type,
            position: position || defaultPosition
        };

        setToasts((prev) => [...prev, newToast]);

        // Auto-dismiss after 3 seconds
        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, 3000);
    }, [defaultPosition]);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const positions = [
        'top-right', 'top-left', 'top-center',
        'bottom-right', 'bottom-left', 'bottom-center'
    ];

    const positionClasses = {
        'top-right': 'top-24 right-8',
        'top-left': 'top-24 left-8',
        'top-center': 'top-24 left-1/2 -translate-x-1/2',
        'bottom-right': 'bottom-8 right-8',
        'bottom-left': 'bottom-8 left-8',
        'bottom-center': 'bottom-8 left-1/2 -translate-x-1/2'
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {/* Render a container for each position */}
            {positions.map((pos) => {
                const toastsInPosition = toasts.filter((t) => t.position === pos);
                if (toastsInPosition.length === 0) return null;

                return (
                    <div
                        key={pos}
                        className={`fixed z-[100] flex flex-col gap-3 pointer-events-none ${positionClasses[pos]}`}
                    >
                        {toastsInPosition.map((toast) => (
                            <Toast
                                key={toast.id}
                                message={toast.message}
                                type={toast.type}
                                position={pos}
                                onClose={() => removeToast(toast.id)}
                            />
                        ))}
                    </div>
                );
            })}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
