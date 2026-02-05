'use client';

import React from 'react';
import SectionWrapper from '../../layout/SectionWrapper';
import Button from '../../ui/Button';
import { PROMO_BANNER } from '@/constants/promoData';
import { useToast } from '@/context/ToastContext';

const styles = {
    wrapper: "relative py-24 overflow-hidden group",
    background: "absolute inset-0 w-full h-full",
    backgroundImage: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105",
    overlay: "absolute inset-0 bg-forest/80 dark:bg-forest/90",
    content: {
        container: "relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto px-4",
        badge: "inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] text-white uppercase border border-white/30 rounded-full",
        title: "text-4xl md:text-5xl lg:text-7xl font-bold font-display text-white mb-6 leading-tight",
        description: "text-lg md:text-xl text-cream/80 max-w-2xl mb-10 leading-relaxed",
        timer: {
            wrapper: "flex gap-4 md:gap-8 mb-10",
            item: "flex flex-col items-center",
            value: "text-3xl md:text-4xl font-bold text-white font-display",
            label: "text-xs text-cream/60 uppercase tracking-widest mt-1"
        }
    }
};

export default function PromoBanner() {
    const { showToast } = useToast();

    const handleShopNow = () => {
        showToast('Redirecting to sales page...', 'info', 'top-center');
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.background}>
                <img
                    src={PROMO_BANNER.image}
                    alt="Promo Background"
                    className={styles.backgroundImage}
                />
                <div className={styles.overlay} />
            </div>

            <div className={styles.content.container}>
                <span className={styles.content.badge}>Limited Time Offer</span>

                <h2 className={styles.content.title}>
                    {PROMO_BANNER.title}
                </h2>

                <p className={styles.content.description}>
                    {PROMO_BANNER.subtitle}
                </p>

                {/* Mock Timer */}
                <div className={styles.content.timer.wrapper}>
                    <div className={styles.content.timer.item}>
                        <span className={styles.content.timer.value}>05</span>
                        <span className={styles.content.timer.label}>Hours</span>
                    </div>
                    <div className={styles.content.timer.item}>
                        <span className={styles.content.timer.value}>42</span>
                        <span className={styles.content.timer.label}>Mins</span>
                    </div>
                    <div className={styles.content.timer.item}>
                        <span className={styles.content.timer.value}>18</span>
                        <span className={styles.content.timer.label}>Secs</span>
                    </div>
                </div>

                <Button
                    variant="primary"
                    size="lg"
                    onClick={handleShopNow}
                
                >
                    {PROMO_BANNER.ctaText}
                </Button>
            </div>
        </div>
    );
}
