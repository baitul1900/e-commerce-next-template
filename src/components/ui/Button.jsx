'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

const styles = {
    base: "inline-flex items-center justify-center font-bold transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 outline-none focus:ring-2 focus:ring-primary/20",
    variants: {
        primary: "bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg",
        secondary: "bg-forest dark:bg-cream text-white dark:text-forest hover:opacity-90",
        outline: "bg-transparent border-2 border-forest/20 dark:border-cream/20 text-forest dark:text-cream hover:bg-forest/5 dark:hover:bg-cream/5",
        "outline-primary": "bg-transparent border-2 border-primary/30 text-primary hover:bg-primary hover:text-white",
        "white-outline": "bg-transparent border-2 border-white/20 text-white hover:bg-white hover:text-forest",
        "white-solid": "bg-white text-forest hover:bg-primary hover:text-white shadow-lg",
        ghost: "bg-transparent text-forest dark:text-cream hover:bg-forest/5 dark:hover:bg-cream/5",
    },
    sizes: {
        sm: "px-4 py-2 text-xs rounded-full gap-1.5",
        md: "px-8 py-3.5 text-sm rounded-full gap-2",
        lg: "px-10 py-4 text-base rounded-full gap-2.5",
        icon: "p-2 rounded-full",
    },
    icon: {
        sm: "w-4 h-4",
        default: "w-5 h-5",
        rightIcon: "transition-transform group-hover:translate-x-1"
    }
};

const Button = React.forwardRef(({
    className = '',
    variant = 'primary',
    size = 'md',
    isLoading = false,
    disabled = false,
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    children,
    ...props
}, ref) => {

    const variantStyles = styles.variants[variant] || styles.variants.primary;
    const sizeStyles = styles.sizes[size] || styles.sizes.md;
    const iconSize = size === 'sm' ? styles.icon.sm : styles.icon.default;

    return (
        <button
            ref={ref}
            className={`${styles.base} ${variantStyles} ${sizeStyles} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
                <>
                    {LeftIcon && <LeftIcon className={iconSize} />}
                    {children}
                    {RightIcon && <RightIcon className={`${iconSize} ${styles.icon.rightIcon}`} />}
                </>
            )}
        </button>
    );
});

Button.displayName = 'Button';

export default Button;
