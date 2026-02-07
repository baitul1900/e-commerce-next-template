'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange, className = "" }) => {
    if (totalPages <= 1) return null;

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className={`flex items-center justify-center gap-2 mt-12 ${className}`}>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-forest/10 dark:border-cream/10 text-forest dark:text-cream hover:bg-forest/5 dark:hover:bg-cream/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous Page"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-1">
                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`w-10 h-10 rounded-lg text-sm font-bold transition-colors ${currentPage === page
                                ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                : 'text-forest dark:text-cream hover:bg-forest/5 dark:hover:bg-cream/5'
                            }`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-forest/10 dark:border-cream/10 text-forest dark:text-cream hover:bg-forest/5 dark:hover:bg-cream/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Next Page"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
};

export default Pagination;
