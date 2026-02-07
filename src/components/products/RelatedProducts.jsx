'use client';

import React from 'react';
import SectionWrapper from '../layout/SectionWrapper';
import ProductCard from '../home/products/ProductCard';
import { PRODUCTS } from '@/constants/productData';

const RelatedProducts = ({ currentProductId }) => {
    // Filter out current product and get random 4 products
    // Note: In a real app, this would fetch based on category/similarity
    const relatedProducts = PRODUCTS
        .filter(p => p.id.toString() !== currentProductId)
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);

    return (
        <div className="mt-16 border-t border-forest/10 dark:border-cream/10 pt-16">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl md:text-3xl font-bold font-display text-forest dark:text-cream">
                    You May Also Like
                </h2>
                <a href="/products" className="text-primary font-bold hover:underline hidden md:block">
                    View All
                </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                {relatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            <div className="mt-8 text-center md:hidden">
                <a href="/products" className="text-primary font-bold hover:underline">
                    View All
                </a>
            </div>
        </div>
    );
};

export default RelatedProducts;
