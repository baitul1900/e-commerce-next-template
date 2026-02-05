'use client';

import React from 'react';
import Link from 'next/link';

const styles = {
    card: "flex flex-col shrink-0 group relative w-64 h-80 rounded-2xl overflow-hidden shadow-sm border border-forest/5 dark:border-cream/5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
    imageContainer: {
        wrapper: "absolute inset-0 transition-transform duration-700 group-hover:scale-110",
        image: "w-full h-full object-cover",
        overlay: "absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"
    },
    content: {
        wrapper: "absolute inset-0 p-6 flex flex-col justify-end",
        label: "text-primary text-xs font-bold uppercase tracking-widest mb-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0",
        title: "text-white text-xl font-bold font-display leading-tight mb-1",
        count: "text-cream/70 text-sm"
    }
};

export default function CategoryCard({ category }) {
    return (
        <Link
            href={category.href}
            className={styles.card}
        >
            {/* Background Image */}
            <div className={styles.imageContainer.wrapper}>
                <img
                    src={category.image}
                    alt={category.title}
                    className={styles.imageContainer.image}
                />
                <div className={styles.imageContainer.overlay} />
            </div>

            {/* Content */}
            <div className={styles.content.wrapper}>
                <p className={styles.content.label}>
                    Explore Now
                </p>
                <h3 className={styles.content.title}>
                    {category.title}
                </h3>
                <span className={styles.content.count}>
                    {category.count}
                </span>
            </div>
        </Link>
    );
}
