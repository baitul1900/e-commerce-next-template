'use client';

import React from 'react';
import Link from 'next/link';
import Button from '../../ui/Button';

const styles = {
    mobile: {
        container: "lg:hidden relative h-[300px] rounded-2xl overflow-hidden shadow-sm border border-forest/5 dark:border-cream/5",
        background: {
            wrapper: "absolute inset-0",
            image: "w-full h-full object-cover object-center",
            overlay: "absolute inset-0 bg-forest/80 opacity-90"
        },
        content: {
            wrapper: "relative z-10 h-full flex flex-col items-center justify-center text-center p-8 space-y-6",
            title: "text-3xl font-display font-bold text-white mb-2",
            discount: "text-4xl font-extrabold text-primary"
        }
    },
    desktop: {
        container: "relative h-full rounded-2xl overflow-hidden shadow-sm border border-forest/5 dark:border-cream/5 lg:block hidden",
        background: {
            wrapper: "absolute inset-0",
            image: "w-full h-full object-cover object-center",
            overlay: "absolute inset-0 bg-forest/80 opacity-90"
        },
        content: {
            wrapper: "relative z-10 h-full flex flex-col items-center justify-center text-center p-8 space-y-6",
            badge: "inline-block px-4 py-1.5 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full",
            badgeText: "text-primary font-bold text-xs uppercase tracking-wider",
            title: "text-3xl font-display font-bold text-white mb-2",
            discount: "text-4xl font-extrabold text-primary",
            description: "text-cream/80 text-sm leading-relaxed max-w-[200px]",
            divider: "w-full h-px bg-white/10 my-4",
            ctaButton: "w-full"
        }
    }
};

export default function OfferHighlight({ data, isMobile = false }) {
    if (isMobile) {
        return (
            <div className={styles.mobile.container}>
                <div className={styles.mobile.background.wrapper}>
                    <img
                        src={data.image}
                        alt={data.title}
                        className={styles.mobile.background.image}
                    />
                    <div className={styles.mobile.background.overlay} />
                </div>

                <div className={styles.mobile.content.wrapper}>
                    <div>
                        <h2 className={styles.mobile.content.title}>{data.title}</h2>
                        <p className={styles.mobile.content.discount}>{data.discount}</p>
                    </div>
                    <Link href={data.ctaLink}>
                        <Button variant="white-solid">
                            {data.ctaText.replace(' All ', ' ')}
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.desktop.container}>
            <div className={styles.desktop.background.wrapper}>
                <img
                    src={data.image}
                    alt={data.title}
                    className={styles.desktop.background.image}
                />
                <div className={styles.desktop.background.overlay} />
            </div>

            <div className={styles.desktop.content.wrapper}>
                <div className={styles.desktop.content.badge}>
                    <span className={styles.desktop.content.badgeText}>
                        {data.subtitle}
                    </span>
                </div>

                <div>
                    <h2 className={styles.desktop.content.title}>{data.title}</h2>
                    <p className={styles.desktop.content.discount}>{data.discount}</p>
                </div>

                <p className={styles.desktop.content.description}>
                    {data.description}
                </p>

                <div className={styles.desktop.content.divider} />

                <Link href={data.ctaLink}>
                    <Button variant="white-outline" className={styles.desktop.content.ctaButton}>
                        {data.ctaText}
                    </Button>
                </Link>
            </div>
        </div>
    );
}
