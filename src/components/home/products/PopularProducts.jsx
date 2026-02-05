'use client';

import React from 'react';
import SectionWrapper from '../../layout/SectionWrapper';
import ProductCard from './ProductCard';
import { PRODUCTS, PRODUCT_HEADER } from '@/constants/productData';

const styles = {
    wrapper: "py-16 bg-cream/20 dark:bg-forest/5",
    header: {
        container: "text-center mb-12",
        title: "text-3xl md:text-4xl lg:text-5xl font-bold font-display text-forest dark:text-cream mb-4",
        description: "text-forest/60 dark:text-cream/60 max-w-2xl mx-auto"
    },
    grid: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8"
};

export default function PopularProducts() {
    return (
        <SectionWrapper className={styles.wrapper}>
            <div className={styles.header.container}>
                <h2 className={styles.header.title}>
                    {PRODUCT_HEADER.title}
                </h2>
                <p className={styles.header.description}>
                    {PRODUCT_HEADER.description}
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
