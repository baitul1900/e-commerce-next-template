'use client';

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SectionWrapper from '../../layout/SectionWrapper';
import Button from '../../ui/Button';
import CategoryCard from './CategoryCard';
import { CATEGORIES, CATEGORY_HEADER } from '@/constants/categoryData';

const styles = {
    wrapper: "py-12",
    header: {
        container: "flex items-end justify-between mb-8",
        navContext: "flex gap-2",
        title: "text-3xl md:text-4xl font-bold font-display text-forest dark:text-cream mb-2",
        description: "text-forest/60 dark:text-cream/60"
    },
    slider: "flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory px-0.5"
};

export default function CategorySlider() {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left'
                ? scrollLeft - clientWidth / 2
                : scrollLeft + clientWidth / 2;

            scrollRef.current.scrollTo({
                left: scrollTo,
                behavior: 'smooth'
            });
        }
    };

    return (
        <SectionWrapper className={styles.wrapper}>
            <div className={styles.header.container}>
                <div>
                    <h2 className={styles.header.title}>
                        {CATEGORY_HEADER.title}
                    </h2>
                    <p className={styles.header.description}>
                        {CATEGORY_HEADER.description}
                    </p>
                </div>

                <div className={styles.header.navContext}>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => scroll('left')}
                        leftIcon={ChevronLeft}
                    />
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => scroll('right')}
                        leftIcon={ChevronRight}
                    />
                </div>
            </div>

            {/* Permanent Slider Container */}
            <div
                ref={scrollRef}
                className={styles.slider}
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {CATEGORIES.map((category) => (
                    <div key={category.id} className="snap-start h-full">
                        <CategoryCard category={category} />
                    </div>
                ))}
            </div>
        </SectionWrapper>
    );
}
