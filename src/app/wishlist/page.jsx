'use client';

import React from 'react';
import SectionWrapper from '@/components/layout/SectionWrapper';
import ProductCard from '@/components/home/products/ProductCard';
import { useWishlist } from '@/context/WishlistContext';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Heart } from 'lucide-react';

export default function WishlistPage() {
    const { wishlistItems, clearWishlist } = useWishlist();

    return (
        <SectionWrapper className="py-12 min-h-[60vh]">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-forest dark:text-cream">My Wishlist</h1>
                {wishlistItems.length > 0 && (
                    <Button
                        variant="ghost"
                        onClick={clearWishlist}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/10"
                    >
                        Clear Wishlist
                    </Button>
                )}
            </div>

            {wishlistItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-20 h-20 bg-forest/5 dark:bg-cream/5 rounded-full flex items-center justify-center mb-6">
                        <Heart className="w-10 h-10 text-forest/20 dark:text-cream/20" />
                    </div>
                    <h2 className="text-xl font-semibold text-forest dark:text-cream mb-2">
                        Your wishlist is empty
                    </h2>
                    <p className="text-forest/60 dark:text-cream/60 mb-8 max-w-sm">
                        Browse our collection and save your favorite items for later.
                    </p>
                    <Link href="/products">
                        <Button variant="primary">
                            Browse Products
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {wishlistItems.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </SectionWrapper>
    );
}
