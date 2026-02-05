'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import SectionWrapper from '../layout/SectionWrapper';
import Button from '../ui/Button';

const SLIDE_DATA = [
    // ... (rest of SLIDE_DATA)
    {
        id: 1,
        title: "Eco-Friendly Living",
        subtitle: "Sustainable Essentials",
        description: "Discover our curated collection of ethically sourced products designed for a greener tomorrow.",
        ctaText: "Shop Collection",
        ctaLink: "/shop",
        image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2813&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Organic Skincare",
        subtitle: "Pure & Natural",
        description: "Nourish your skin with ingredients straight from nature. Zero chemicals, 100% radiance.",
        ctaText: "Explore Beauty",
        ctaLink: "/collections/skincare",
        image: "https://images.unsplash.com/photo-1556228578-8d89482d8d87?q=80&w=2940&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Bespoke Ceramics",
        subtitle: "Handcrafted Decor",
        description: "Unique, artisan-made pieces that bring warmth and character to your home space.",
        ctaText: "View Decor",
        ctaLink: "/collections/home",
        image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=2940&auto=format&fit=crop"
    }
];

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const slideRef = useRef(null);
    const touchStartX = useRef(0);
    const isDragging = useRef(false);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev === SLIDE_DATA.length - 1 ? 0 : prev + 1));
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev === 0 ? SLIDE_DATA.length - 1 : prev - 1));
    }, []);

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

        // Threshold for swipe: 50px
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
        <SectionWrapper className="py-6 lg:py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[60vh] min-h-[400px] max-h-[550px]">

                {/* Main Slider Area - Spans 2 columns */}
                <div
                    ref={slideRef}
                    className="lg:col-span-2 relative h-full rounded-2xl overflow-hidden group shadow-sm border border-forest/5 dark:border-cream/5 cursor-grab active:cursor-grabbing"
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
                    {SLIDE_DATA.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out select-none ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                                }`}
                        >
                            {/* Background */}
                            <div className="absolute inset-0 pointer-events-none">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    className="w-full h-full object-cover object-center transform transition-transform duration-[2000ms] scale-100 group-hover:scale-105"
                                    draggable="false"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="relative z-20 h-full flex flex-col justify-end p-8 md:p-12 lg:p-16 pb-12 lg:pb-16 pointer-events-none">
                                <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 bg-white/20 backdrop-blur-md border border-white/30 rounded-full w-fit">
                                    <Sparkles className="w-3 h-3 text-primary" />
                                    <span className="text-white font-bold text-xs uppercase tracking-wider">
                                        {slide.subtitle}
                                    </span>
                                </div>

                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-display text-white mb-4">
                                    {slide.title}
                                </h1>

                                <p className="text-lg text-cream/90 max-w-lg leading-relaxed font-light mb-8">
                                    {slide.description}
                                </p>

                                <div className="flex gap-4 pointer-events-auto">
                                    <Link href={slide.ctaLink} onMouseDown={(e) => e.stopPropagation()}>
                                        <Button
                                            variant="white-solid"
                                            rightIcon={ArrowRight}
                                            className="transform hover:scale-105 shadow-lg"
                                        >
                                            {slide.ctaText}
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Pagination Dots */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                        {SLIDE_DATA.map((_, index) => (
                            <button
                                key={index}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentSlide(index);
                                }}
                                className={`h-1.5 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-8 bg-primary' : 'w-2 bg-white/20 hover:bg-white/40'
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Slider Controls */}
                    <div className="absolute bottom-8 right-8 z-30 flex gap-2 pointer-events-auto">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={(e) => {
                                e.stopPropagation();
                                prevSlide();
                            }}
                            className="text-white border-white/20 bg-black/20 backdrop-blur-sm"
                            leftIcon={ChevronLeft}
                        />
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={(e) => {
                                e.stopPropagation();
                                nextSlide();
                            }}
                            className="text-white border-white/20 bg-black/20 backdrop-blur-sm"
                            leftIcon={ChevronRight}
                        />
                    </div>
                </div>

                {/* Offer Highlighter - Sidebar */}
                <div className="relative h-full rounded-2xl overflow-hidden shadow-sm border border-forest/5 dark:border-cream/5 lg:block hidden">
                    <div className="absolute inset-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2940&auto=format&fit=crop"
                            alt="Highlight Offer"
                            className="w-full h-full object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-forest/80 opacity-90" />
                    </div>

                    <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-8 space-y-6">
                        <div className="inline-block px-4 py-1.5 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full">
                            <span className="text-primary font-bold text-xs uppercase tracking-wider">
                                Limited Time
                            </span>
                        </div>

                        <div>
                            <h2 className="text-3xl font-display font-bold text-white mb-2">Summer Sale</h2>
                            <p className="text-4xl font-extrabold text-primary">-40% OFF</p>
                        </div>

                        <p className="text-cream/80 text-sm leading-relaxed max-w-[200px]">
                            Get exclusive deals on our newest summer collection. Look good, feel good.
                        </p>

                        <div className="w-full h-px bg-white/10 my-4" />

                        <Link href="/offer">
                            <Button variant="white-outline" className="w-full">
                                View All Offers
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Mobile View - Highlight acts as second stacked item */}
                <div className="lg:hidden relative h-[300px] rounded-2xl overflow-hidden shadow-sm border border-forest/5 dark:border-cream/5">
                    <div className="absolute inset-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2940&auto=format&fit=crop"
                            alt="Highlight Offer"
                            className="w-full h-full object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-forest/80 opacity-90" />
                    </div>

                    <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-8 space-y-6">
                        <div>
                            <h2 className="text-3xl font-display font-bold text-white mb-2">Summer Sale</h2>
                            <p className="text-4xl font-extrabold text-primary">-40% OFF</p>
                        </div>
                        <Link href="/offer">
                            <Button variant="white-solid">
                                View Offers
                            </Button>
                        </Link>
                    </div>
                </div>

            </div>
        </SectionWrapper>
    );
}
