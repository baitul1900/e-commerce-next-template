'use client';

import React from 'react';
import { SlidersHorizontal } from 'lucide-react';

export default function ProductSort({ sortBy, onSortChange, totalProducts, onMobileFilterClick }) {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-white dark:bg-forest/10 p-4 rounded-xl border border-forest/5 dark:border-cream/5">
            <div className="flex items-center gap-2">
                <button
                    onClick={onMobileFilterClick}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 bg-forest/5 dark:bg-cream/5 rounded-lg text-sm font-bold text-forest dark:text-cream hover:bg-forest/10 dark:hover:bg-cream/10 transition-colors"
                >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                </button>
                <p className="text-sm text-forest/60 dark:text-cream/60 font-medium">
                    Showing <span className="text-forest dark:text-cream font-bold">{totalProducts}</span> results
                </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
                <label className="text-sm text-forest/60 dark:text-cream/60 whitespace-nowrap hidden sm:block">
                    Sort by:
                </label>
                <select
                    value={sortBy}
                    onChange={(e) => onSortChange(e.target.value)}
                    className="w-full sm:w-auto px-4 py-2 bg-forest/5 dark:bg-cream/5 border-none rounded-lg text-sm font-semibold text-forest dark:text-cream focus:ring-1 focus:ring-primary cursor-pointer outline-none"
                >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest Arrivals</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                </select>
            </div>
        </div>
    );
}
