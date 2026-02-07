'use client';

import React from 'react';
import SectionWrapper from '@/components/layout/SectionWrapper';
import ProductCard from '@/components/home/products/ProductCard';
import { PRODUCTS } from '@/constants/productData';

const styles = {
    wrapper: "py-16 min-h-screen",
    header: {
        container: "text-center mb-12",
        title: "text-3xl md:text-4xl lg:text-5xl font-bold font-display text-forest dark:text-cream mb-4",
        description: "text-forest/60 dark:text-cream/60 max-w-2xl mx-auto"
    },
    grid: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8"
};

export default function ShopPage() {
    return (
        <SectionWrapper className={styles.wrapper}>
            <div className={styles.header.container}>
                <h1 className={styles.header.title}>
                    Shop All Products
                </h1>
                <p className={styles.header.description}>
                    Explore our complete collection of organic essentials, handpicked for your sustainable lifestyle.
                </p>
            </div>

            <div className={styles.grid}>
                {PRODUCTS.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </SectionWrapper>
    );
}
