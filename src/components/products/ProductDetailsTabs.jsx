'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TABS = [
    { id: 'description', label: 'Description' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'shipping', label: 'Shipping & Returns' }
];

const ProductDetailsTabs = ({ product }) => {
    const [activeTab, setActiveTab] = useState('description');

    if (!product) return null;

    return (
        <div className="mt-16 border-t border-forest/10 dark:border-cream/10 pt-10">
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-8 mb-8 border-b border-forest/5 dark:border-cream/5">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`pb-4 text-lg font-bold transition-all relative ${activeTab === tab.id
                            ? 'text-primary'
                            : 'text-forest/60 dark:text-cream/60 hover:text-forest dark:hover:text-cream'
                            }`}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[200px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {activeTab === 'description' && (
                            <div className="prose prose-forest dark:prose-invert max-w-none">
                                <p className="text-lg leading-relaxed text-forest/80 dark:text-cream/80">
                                    {product.description}
                                </p>
                                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="text-xl font-bold mb-3">Key Features</h3>
                                        <ul className="list-disc pl-5 space-y-2 text-forest/70 dark:text-cream/70">
                                            <li>Premium build quality with durable materials</li>
                                            <li>Ergonomic design for maximum comfort</li>
                                            <li>High-performance specifications</li>
                                            <li>Eco-friendly packaging</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-3">Specifications</h3>
                                        <div className="space-y-2">
                                            <div className="flex justify-between py-2 border-b border-forest/5 dark:border-cream/5">
                                                <span className="font-medium">Material</span>
                                                <span className="text-forest/60 dark:text-cream/60">Premium Synthetic</span>
                                            </div>
                                            <div className="flex justify-between py-2 border-b border-forest/5 dark:border-cream/5">
                                                <span className="font-medium">Weight</span>
                                                <span className="text-forest/60 dark:text-cream/60">1.2 kg</span>
                                            </div>
                                            <div className="flex justify-between py-2 border-b border-forest/5 dark:border-cream/5">
                                                <span className="font-medium">Origin</span>
                                                <span className="text-forest/60 dark:text-cream/60">Imported</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'reviews' && (
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold">Customer Reviews ({product.reviews})</h3>
                                    <button className="text-primary font-bold hover:underline">Write a Review</button>
                                </div>
                                <div className="space-y-6">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="p-6 bg-white dark:bg-forest/20 rounded-xl border border-forest/5 dark:border-cream/5">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-10 h-10 rounded-full bg-forest/10 dark:bg-cream/10 flex items-center justify-center font-bold">
                                                        U{i}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">User {i}</div>
                                                        <div className="text-xs text-forest/50 dark:text-cream/50">2 days ago</div>
                                                    </div>
                                                </div>
                                                <div className="flex text-yellow-400 text-sm">★★★★★</div>
                                            </div>
                                            <p className="text-forest/70 dark:text-cream/70">
                                                This product exceeded my expectations! The quality is amazing and it arrived faster than expected. Highly recommended.
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'shipping' && (
                            <div className="space-y-4 text-forest/80 dark:text-cream/80">
                                <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                                    <h4 className="font-bold text-primary mb-2">Free Shipping</h4>
                                    <p>We offer free standard shipping on all orders over $50. Orders are processed within 1-2 business days.</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-4 bg-white dark:bg-forest/20 rounded-xl border border-forest/5 dark:border-cream/5">
                                        <h4 className="font-bold mb-2">Delivery Time</h4>
                                        <ul className="list-disc pl-5 space-y-1 text-sm">
                                            <li>Standard: 5-7 business days</li>
                                            <li>Express: 2-3 business days</li>
                                            <li>International: 10-15 business days</li>
                                        </ul>
                                    </div>
                                    <div className="p-4 bg-white dark:bg-forest/20 rounded-xl border border-forest/5 dark:border-cream/5">
                                        <h4 className="font-bold mb-2">Returns</h4>
                                        <p className="text-sm">
                                            We accept returns within 30 days of purchase. Items must be in original condition with tags attached.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ProductDetailsTabs;
