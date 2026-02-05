'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../../ui/Button';
import HeroSlide from './HeroSlide';

const styles = {
    container: "lg:col-span-2 relative h-full rounded-2xl overflow-hidden group shadow-sm border border-forest/5 dark:border-cream/5 cursor-grab active:cursor-grabbing",
    pagination: {
        wrapper: "absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2",
        dot: (isActive) => `h-1.5 rounded-full transition-all duration-300 ${isActive ? 'w-8 bg-primary' : 'w-2 bg-white/20 hover:bg-white/40'}`
    },
    controls: {
        wrapper: "absolute bottom-8 right-8 z-30 flex gap-2 pointer-events-auto",
        button: "text-white border-white/20 bg-black/20 backdrop-blur-sm"
    }
};

export default function HeroSlider({ slides }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const slideRef = useRef(null);
    const touchStartX = useRef(0);
    const isDragging = useRef(false);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, [slides.length]);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    }, [slides.length]);

    // Drag / Swipe Logic
    const handleDragStart = (e) => {
        isDragging.current = true;
        touchStartX.current = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
    };

    const handleDragEnd = (e) => {
        if (!isDragging.current) return;

        const touchEndX = (e.type === 'mouseup' || e.type === 'mouseleave')
            ? e.clientX
            : e.changedTouches[0].clientX;

        const diff = touchStartX.current - touchEndX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) nextSlide();
            else prevSlide();
        }

        isDragging.current = false;
    };

    // Auto-play
    useEffect(() => {
        let interval;
        if (isAutoPlaying) {
            interval = setInterval(() => {
                nextSlide();
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [isAutoPlaying, nextSlide]);

    return (
        <div
            ref={slideRef}
            className={styles.container}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={(e) => {
                setIsAutoPlaying(true);
                handleDragEnd(e);
            }}
            onMouseDown={handleDragStart}
            onMouseUp={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchEnd={handleDragEnd}
        >
            {slides.map((slide, index) => (
                <HeroSlide
                    key={slide.id}
                    slide={slide}
                    isActive={index === currentSlide}
                />
            ))}

            {/* Pagination Dots */}
            <div className={styles.pagination.wrapper}>
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={(e) => {
                            e.stopPropagation();
                            setCurrentSlide(index);
                        }}
                        className={styles.pagination.dot(index === currentSlide)}
                    />
                ))}
            </div>

            {/* Slider Controls */}
            <div className={styles.controls.wrapper}>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={(e) => {
                        e.stopPropagation();
                        prevSlide();
                    }}
                    className={styles.controls.button}
                    leftIcon={ChevronLeft}
                />
                <Button
                    variant="outline"
                    size="icon"
                    onClick={(e) => {
                        e.stopPropagation();
                        nextSlide();
                    }}
                    className={styles.controls.button}
                    leftIcon={ChevronRight}
                />
            </div>
        </div>
    );
}
