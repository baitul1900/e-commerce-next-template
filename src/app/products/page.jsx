'use client';

import React, { useState, useEffect, useMemo } from 'react';
import SectionWrapper from '@/components/layout/SectionWrapper';
import ProductCard from '@/components/home/products/ProductCard';
import ProductFilters from '@/components/products/ProductFilters';
import ProductSort from '@/components/products/ProductSort';
import Pagination from '@/components/ui/Pagination';
import { PRODUCTS } from '@/constants/productData';
import { Filter, X } from 'lucide-react';

const ITEMS_PER_PAGE = 9;

const styles = {
    wrapper: "py-8 lg:py-16 min-h-screen",
    header: {
        container: "text-center mb-12",
        title: "text-3xl md:text-4xl lg:text-5xl font-bold font-display text-forest dark:text-cream mb-4",
        description: "text-forest/60 dark:text-cream/60 max-w-2xl mx-auto"
    },
    layout: "flex flex-col lg:flex-row gap-8 lg:gap-12 relative",
    sidebar: {
        desktop: "hidden lg:block w-64 flex-shrink-0 sticky top-24 h-fit",
        mobile: "lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity"
    },
    mobileDrawer: "fixed inset-y-0 right-0 w-full max-w-xs bg-white dark:bg-background-dark shadow-2xl p-6 overflow-y-auto transition-transform duration-300 ease-in-out transform",
    grid: "grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 flex-1"
};

export default function ShopPage() {
    // State
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [sortBy, setSortBy] = useState('featured');
    const [currentPage, setCurrentPage] = useState(1);

    // Extract unique categories from products
    const categories = useMemo(() => {
        const cats = new Set(PRODUCTS.map(p => p.category));
        return Array.from(cats);
    }, []);

    // Get min and max prices
    const { minPrice, maxPrice } = useMemo(() => {
        const prices = PRODUCTS.map(p => p.price);
        return {
            minPrice: Math.min(...prices),
            maxPrice: Math.max(...prices)
        };
    }, []);

    // Initialize price range on load
    useEffect(() => {
        setPriceRange([0, maxPrice + 50]); // Add buffer
    }, [maxPrice]);

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [selectedCategory, priceRange, sortBy]);


    // Filter and Sort Logic
    const filteredProducts = useMemo(() => {
        let result = [...PRODUCTS];

        // 1. Filter by Category
        if (selectedCategory !== 'All') {
            result = result.filter(p => p.category === selectedCategory);
        }

        // 2. Filter by Price
        result = result.filter(p =>
            p.price >= priceRange[0] && p.price <= priceRange[1]
        );

        // 3. Sort
        switch (sortBy) {
            case 'price-low':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                result.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                // Assuming higher ID is newer for this demo
                result.sort((a, b) => b.id - a.id);
                break;
            default: // featured
                // specific logic or default order
                break;
        }

        return result;
    }, [selectedCategory, priceRange, sortBy]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleClearFilters = () => {
        setSelectedCategory('All');
        setPriceRange([minPrice, maxPrice]); // Should ideally track initial max
    };


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

            <div className={styles.layout}>
                {/* Desktop Sidebar */}
                <aside className={styles.sidebar.desktop}>
                    <ProductFilters
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                        priceRange={priceRange}
                        onPriceChange={setPriceRange}
                        minPrice={0}
                        maxPrice={100} // Hardcoded for simplified demo, typically dynamic
                        onClearFilters={handleClearFilters}
                    />
                </aside>

                {/* Mobile Filters Drawer */}
                {isMobileFiltersOpen && (
                    <div className={styles.sidebar.mobile} onClick={() => setIsMobileFiltersOpen(false)}>
                        <div
                            className={styles.mobileDrawer}
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-forest dark:text-cream">Filters</h2>
                                <button
                                    onClick={() => setIsMobileFiltersOpen(false)}
                                    className="p-2 hover:bg-forest/5 dark:hover:bg-cream/5 rounded-full"
                                >
                                    <X className="w-5 h-5 text-forest dark:text-cream" />
                                </button>
                            </div>
                            <ProductFilters
                                categories={categories}
                                selectedCategory={selectedCategory}
                                onCategoryChange={setSelectedCategory}
                                priceRange={priceRange}
                                onPriceChange={setPriceRange}
                                minPrice={0}
                                maxPrice={100}
                                onClearFilters={handleClearFilters}
                            />
                        </div>
                    </div>
                )}

                {/* Main Content */}
                <div className="flex-1">
                    <ProductSort
                        sortBy={sortBy}
                        onSortChange={setSortBy}
                        totalProducts={filteredProducts.length}
                        onMobileFilterClick={() => setIsMobileFiltersOpen(true)}
                    />

                    {paginatedProducts.length > 0 ? (
                        <>
                            <div className={styles.grid}>
                                {paginatedProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>

                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </>
                    ) : (
                        <div className="text-center py-24 bg-forest/5 dark:bg-cream/5 rounded-2xl">
                            <h3 className="text-xl font-bold text-forest dark:text-cream mb-2">No products found</h3>
                            <p className="text-forest/60 dark:text-cream/60 mb-6">Try adjusting your filters used.</p>
                            <button
                                onClick={handleClearFilters}
                                className="text-primary font-bold hover:underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </SectionWrapper>
    );
}
