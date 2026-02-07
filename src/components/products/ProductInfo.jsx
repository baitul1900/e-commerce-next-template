'use client';

import React, { useState } from 'react';
import { Star, ShoppingCart, Heart, Share2, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import Button from '../ui/Button';

const ProductInfo = ({ product }) => {
    const [quantity, setQuantity] = useState(1);

    if (!product) return null;

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 text-xs font-bold text-primary bg-primary/10 rounded-full">
                        {product.category}
                    </span>
                    {product.inStock ? (
                        <span className="px-3 py-1 text-xs font-bold text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                            In Stock
                        </span>
                    ) : (
                        <span className="px-3 py-1 text-xs font-bold text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400 rounded-full">
                            Out of Stock
                        </span>
                    )}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold font-display text-forest dark:text-cream mb-2">
                    {product.title}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300 dark:text-gray-600'}`}
                            />
                        ))}
                    </div>
                    <span className="text-sm text-forest/60 dark:text-cream/60">
                        ({product.reviews} reviews)
                    </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-3xl font-bold text-primary">
                        ${product.price}
                    </span>
                    {product.originalPrice && (
                        <span className="text-xl text-forest/40 dark:text-cream/40 line-through">
                            ${product.originalPrice}
                        </span>
                    )}
                </div>
            </div>

            {/* Description */}
            <p className="text-forest/70 dark:text-cream/70 leading-relaxed">
                {product.description}
            </p>

            {/* Quantity & Actions */}
            <div className="flex flex-col sm:flex-row gap-4 py-6 border-t border-b border-forest/10 dark:border-cream/10">
                <div className="flex items-center border border-forest/20 dark:border-cream/20 rounded-full w-fit">
                    <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 flex items-center justify-center hover:text-primary transition-colors"
                    >
                        -
                    </button>
                    <span className="w-10 text-center font-bold">{quantity}</span>
                    <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center hover:text-primary transition-colors"
                    >
                        +
                    </button>
                </div>

                <Button className="flex-1" leftIcon={ShoppingCart}>
                    Add to Cart
                </Button>

                <Button variant="outline" size="icon" className="shrink-0">
                    <Heart className="w-5 h-5" />
                </Button>
            </div>

            {/* Features/Trust Badges */}
            <div className="grid grid-cols-2 gap-4 text-sm text-forest/80 dark:text-cream/80">
                <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-primary" />
                    <span>Free Shipping over $50</span>
                </div>
                <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    <span>2 Year Warranty</span>
                </div>
                <div className="flex items-center gap-3">
                    <RefreshCw className="w-5 h-5 text-primary" />
                    <span>30 Days Return</span>
                </div>
                <div className="flex items-center gap-3">
                    <Share2 className="w-5 h-5 text-primary" />
                    <span>Share Product</span>
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;
