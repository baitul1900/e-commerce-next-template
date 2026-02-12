'use client';

import React from 'react';

const Input = ({
    label,
    id,
    type = 'text',
    placeholder,
    value,
    onChange,
    error,
    required = false,
    className = ""
}) => {
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            {label && (
                <label htmlFor={id} className="text-sm font-semibold text-forest dark:text-cream">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`
                    w-full px-4 py-3 rounded-xl border bg-white dark:bg-forest/5 
                    focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all
                    ${error
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-forest/10 dark:border-cream/10 focus:border-primary'
                    }
                    placeholder:text-gray-400 text-forest dark:text-cream
                `}
                required={required}
            />
            {error && (
                <span className="text-xs text-red-500 font-medium">{error}</span>
            )}
        </div>
    );
};

export default Input;
