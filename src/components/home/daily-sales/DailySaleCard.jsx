'use client';

import React from 'react';
import { Star, Heart, Clock, Flame } from 'lucide-react';
import Button from '../../ui/Button';
import Icon from '@/components/icon/Icon';
import { useToast } from '@/context/ToastContext';

const styles = {
    card: "group relative bg-white dark:bg-forest/20 rounded-2xl overflow-hidden border border-forest/5 dark:border-cream/5 hover:shadow-xl transition-all duration-300",
    imageWrapper: "relative aspect-[4/4] overflow-hidden bg-cream/30",
    image: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
    discountBadge: "absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md",
    content: {
        container: "p-4",
        category: "text-xs text-primary font-medium uppercase tracking-wider mb-1",
        title: "text-base font-bold text-forest dark:text-cream mb-2 line-clamp-1",
        priceRow: {
            wrapper: "flex items-baseline gap-2 mb-3",
            price: "text-lg font-bold text-red-500",
            oldPrice: "text-xs text-forest/40 line-through"
        },
        urgency: {
            wrapper: "mb-4",
            alert: "flex items-center gap-2 text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-2 rounded-lg",
            timer: "flex items-center gap-1.5 mt-2 text-xs text-forest/60 dark:text-cream/60 font-medium"
        },
        footer: "flex items-center justify-between gap-3"
    }
};

export default function DailySaleCard({ product }) {
    const { showToast } = useToast();

    const handleAddToCart = (e) => {
        e.preventDefault();
        showToast(`${product.name} added to deal cart!`, 'success', 'bottom-center');
    };

    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <span className={styles.discountBadge}>
                    {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
                </span>
                <img src={product.image} alt={product.name} className={styles.image} />
                <Button variant="ghost" size="icon" className="absolute top-3 right-3 bg-white/80 w-8 h-8 rounded-full">
                    <Heart className="w-4 h-4 text-forest" />
                </Button>
            </div>

            <div className={styles.content.container}>
                <span className={styles.content.category}>{product.category}</span>
                <h3 className={styles.content.title}>{product.name}</h3>

                <div className={styles.content.priceRow.wrapper}>
                    <span className={styles.content.priceRow.price}>${product.price}</span>
                    <span className={styles.content.priceRow.oldPrice}>${product.oldPrice}</span>
                </div>

                <div className={styles.content.urgency.wrapper}>
                    <div className={styles.content.urgency.alert}>
                        <Flame className="w-4 h-4 fill-red-500 animate-pulse" />
                        <span>Hurry! Only {product.stock} left in stock</span>
                    </div>
                    <div className={styles.content.urgency.timer}>
                        <Clock className="w-3.5 h-3.5" />
                        <span>Ends in {product.endsIn}</span>
                    </div>
                </div>

                <Button
                    variant="primary"
                    className="w-full text-xs py-2 h-auto"
                    onClick={handleAddToCart}
                >
                    Add to Cart
                </Button>
            </div>
        </div>
    );
}
