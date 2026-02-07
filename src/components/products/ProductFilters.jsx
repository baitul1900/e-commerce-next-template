'use client';

import React, { useState } from 'react';
import { Star, ChevronDown, ChevronUp, X } from 'lucide-react';
import Button from '../ui/Button';

const FilterSection = ({ title, children, isOpen: defaultOpen = true }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border-b border-forest/10 dark:border-cream/10 py-6 last:border-0">
            <button
                className="flex items-center justify-between w-full mb-4 group"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="font-bold text-forest dark:text-cream text-sm uppercase tracking-wider">
                    {title}
                </h3>
                {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-forest/60 dark:text-cream/60 group-hover:text-primary transition-colors" />
                ) : (
                    <ChevronDown className="w-4 h-4 text-forest/60 dark:text-cream/60 group-hover:text-primary transition-colors" />
                )}
            </button>
            {isOpen && <div className="space-y-3 animate-in slide-in-from-top-2 duration-200">{children}</div>}
        </div>
    );
};

export default function ProductFilters({
    categories,
    selectedCategory,
    onCategoryChange,
    priceRange,
    onPriceChange,
    minPrice,
    maxPrice,
    onClearFilters,
    className = ""
}) {
    return (
        <div className={`flex flex-col ${className}`}>
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold font-display text-forest dark:text-cream">Filters</h2>
                {(selectedCategory !== 'All' || priceRange[0] > minPrice || priceRange[1] < maxPrice) && (
                    <button
                        onClick={onClearFilters}
                        className="text-xs text-primary hover:underline font-semibold flex items-center gap-1"
                    >
                        <X className="w-3 h-3" /> Clear All
                    </button>
                )}
            </div>

            {/* Categories */}
            <FilterSection title="Categories">
                <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${selectedCategory === 'All'
                            ? 'bg-primary border-primary'
                            : 'border-forest/20 dark:border-cream/20 group-hover:border-primary'
                            }`}>
                            {selectedCategory === 'All' && <div className="w-2.5 h-2.5 bg-white rounded-sm" />}
                        </div>
                        <input
                            type="radio"
                            name="category"
                            value="All"
                            checked={selectedCategory === 'All'}
                            onChange={() => onCategoryChange('All')}
                            className="hidden"
                        />
                        <span className={`text-sm group-hover:text-primary transition-colors ${selectedCategory === 'All' ? 'font-bold text-forest dark:text-cream' : 'text-forest/70 dark:text-cream/70'
                            }`}>
                            All Categories
                        </span>
                    </label>

                    {categories.map((category) => (
                        <label key={category} className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${selectedCategory === category
                                ? 'bg-primary border-primary'
                                : 'border-forest/20 dark:border-cream/20 group-hover:border-primary'
                                }`}>
                                {selectedCategory === category && <div className="w-2.5 h-2.5 bg-white rounded-sm" />}
                            </div>
                            <input
                                type="radio"
                                name="category"
                                value={category}
                                checked={selectedCategory === category}
                                onChange={() => onCategoryChange(category)}
                                className="hidden"
                            />
                            <span className={`text-sm group-hover:text-primary transition-colors ${selectedCategory === category ? 'font-bold text-forest dark:text-cream' : 'text-forest/70 dark:text-cream/70'
                                }`}>
                                {category}
                            </span>
                        </label>
                    ))}
                </div>
            </FilterSection>

            {/* Price Range */}
            <FilterSection title="Price Range">
                <div className="px-2">
                    <div className="flex items-center justify-between mb-4 text-sm text-forest/70 dark:text-cream/70">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                    </div>
                    {/* Simple Range Input Implementation */}
                    {/* Note: A proper dual-thumb slider would require a dedicated library like standard HTML range inputs for simplicity here, or a custom implementation */}
                    <div className="space-y-4">
                        <input
                            type="range"
                            min={minPrice}
                            max={maxPrice}
                            value={priceRange[1]}
                            onChange={(e) => onPriceChange([priceRange[0], parseInt(e.target.value)])}
                            className="w-full h-1.5 bg-forest/10 dark:bg-cream/10 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                        <p className="text-xs text-center text-forest/50 dark:text-cream/50">
                            Max Price: ${priceRange[1]}
                        </p>
                    </div>
                </div>
            </FilterSection>

            {/* Rating (Static for now as mostly requested) */}
            <FilterSection title="Rating">
                <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                        <label key={rating} className="flex items-center gap-3 cursor-pointer group">
                            <input type="checkbox" className="w-4 h-4 rounded border-forest/20 dark:border-cream/20 text-primary focus:ring-primary bg-transparent" />
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-3.5 h-3.5 ${i < rating
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : 'text-forest/20 dark:text-cream/20'
                                            }`}
                                    />
                                ))}
                                <span className="text-sm text-forest/70 dark:text-cream/70 group-hover:text-primary ml-1">
                                    & Up
                                </span>
                            </div>
                        </label>
                    ))}
                </div>
            </FilterSection>
        </div>
    );
}
