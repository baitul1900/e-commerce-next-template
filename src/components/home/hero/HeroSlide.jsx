'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import Button from '../../ui/Button';

const styles = {
    container: (isActive) => `absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out select-none ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`,
    background: {
        wrapper: "absolute inset-0 pointer-events-none",
        image: "w-full h-full object-cover object-center transform transition-transform duration-[2000ms] scale-100 group-hover:scale-105",
        overlay: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
    },
    content: {
        wrapper: "relative z-20 h-full flex flex-col justify-end p-8 md:p-12 lg:p-16 pb-12 lg:pb-16 pointer-events-none",
        badge: "inline-flex items-center gap-2 px-3 py-1 mb-6 bg-white/20 backdrop-blur-md border border-white/30 rounded-full w-fit",
        badgeIcon: "w-3 h-3 text-primary",
        badgeText: "text-white font-bold text-xs uppercase tracking-wider",
        title: "text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-display text-white mb-4",
        description: "text-lg text-cream/90 max-w-lg leading-relaxed font-light mb-8",
        ctaWrapper: "flex gap-4 pointer-events-auto",
        ctaButton: "transform hover:scale-105 shadow-lg"
    }
};

export default function HeroSlide({ slide, isActive }) {
    return (
        <div className={styles.container(isActive)}>
            {/* Background */}
            <div className={styles.background.wrapper}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={slide.image}
                    alt={slide.title}
                    className={styles.background.image}
                    draggable="false"
                />
                <div className={styles.background.overlay} />
            </div>

            {/* Content */}
            <div className={styles.content.wrapper}>
                <div className={styles.content.badge}>
                    <Sparkles className={styles.content.badgeIcon} />
                    <span className={styles.content.badgeText}>
                        {slide.subtitle}
                    </span>
                </div>

                <h1 className={styles.content.title}>
                    {slide.title}
                </h1>

                <p className={styles.content.description}>
                    {slide.description}
                </p>

                <div className={styles.content.ctaWrapper}>
                    <Link href={slide.ctaLink} onMouseDown={(e) => e.stopPropagation()}>
                        <Button
                            variant="white-solid"
                            rightIcon={ArrowRight}
                            className={styles.content.ctaButton}
                        >
                            {slide.ctaText}
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
