'use client';

import React from 'react';
import Link from 'next/link';
import { Star, Heart } from 'lucide-react';
import Button from '../../ui/Button';
import Icon from '@/components/icon/Icon';
import { useToast } from '@/context/ToastContext';

const styles = {
    card: "group relative bg-white dark:bg-forest/20 rounded-2xl overflow-hidden border border-forest/5 dark:border-cream/5 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1",
    imageContainer: {
        wrapper: "relative aspect-[4/4] overflow-hidden bg-cream/30 dark:bg-forest/40",
        image: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110",
        overlay: "absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
        badge: "absolute top-4 left-4 z-10 px-3 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg",
        actions: "absolute top-4 right-4 z-10 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500"
    },
    content: {
        wrapper: "p-3",
        category: "text-xs font-medium text-primary uppercase tracking-wider mb-2 block",
        title: "text-base font-bold text-forest dark:text-cream leading-tight mb-3 line-clamp-1 group-hover:text-primary transition-colors",
        rating: {
            wrapper: "flex items-center gap-1 mb-4",
            star: "w-3.5 h-3.5 fill-yellow-400 text-yellow-400",
            count: "text-xs text-forest/40 dark:text-cream/40"
        },
        footer: {
            wrapper: "flex items-center justify-between mt-auto",
            priceWrapper: "flex flex-col",
            price: "text-lg font-bold text-forest dark:text-cream",
            oldPrice: "text-xs text-forest/30 dark:text-cream/30 line-through",
            cartButton: "w-10 h-10 p-0 rounded-xl hover:scale-110 active:scale-95 transition-all outline-none"
        }
    }
};

import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
// ... other imports

export default function ProductCard({ product }) {
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const { showToast } = useToast();

    const isWishlisted = isInWishlist(product.id);

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
    };

    const handleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product);
    }

    return (
        <Link
            href={`/products/${product.id}`}
            className={styles.card}
        >
            {/* Image Section */}
            <div className={styles.imageContainer.wrapper}>
                {product.badge && (
                    <div className={styles.imageContainer.badge}>
                        {product.badge}
                    </div>
                )}

                <div className={styles.imageContainer.actions}>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="bg-white/80 dark:bg-forest/80 backdrop-blur-md w-8 h-8"
                        onClick={handleWishlist}
                    >
                        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-forest dark:text-cream'}`} />
                    </Button>
                </div>

                <img
                    src={product.image}
                    alt={product.name}
                    className={styles.imageContainer.image}
                    loading="lazy"
                />
                <div className={styles.imageContainer.overlay} />
            </div>

            {/* Content Section */}
            <div className={styles.content.wrapper}>
                <span className={styles.content.category}>{product.category}</span>
                <h3 className={styles.content.title}>{product.name}</h3>

                <div className={styles.content.rating.wrapper}>
                    <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`${styles.content.rating.star} ${i >= Math.floor(product.rating) ? 'opacity-20' : ''}`}
                            />
                        ))}
                    </div>
                    <span className={styles.content.rating.count}>({product.reviews})</span>
                </div>

                <div className={styles.content.footer.wrapper}>
                    <div className={styles.content.footer.priceWrapper}>
                        {product.oldPrice && (
                            <span className={styles.content.footer.oldPrice}>${product.oldPrice.toFixed(2)}</span>
                        )}
                        <span className={styles.content.footer.price}>${product.price.toFixed(2)}</span>
                    </div>

                    <Button
                        variant="primary"
                        size="icon"
                        className={styles.content.footer.cartButton}
                        aria-label="Add to cart"
                        onClick={handleAddToCart}
                    >
                        <Icon name="ShoppingCart" size={20} color='#fff' />
                    </Button>
                </div>
            </div>
        </Link>
    );
}
