'use client';

import React from 'react';
import SectionWrapper from '../../layout/SectionWrapper';
import DailySaleCard from './DailySaleCard';
import { DAILY_DEALS, DAILY_DEALS_HEADER } from '@/constants/dailySalesData';

const styles = {
    wrapper: "py-16 bg-white dark:bg-forest/10",
    header: {
        container: "flex flex-col md:flex-row items-end justify-between mb-8 gap-4",
        textWrapper: "max-w-xl",
        title: "text-3xl md:text-4xl font-bold font-display text-forest dark:text-cream mb-2",
        description: "text-forest/60 dark:text-cream/60",
        timer: "hidden md:flex items-center gap-2 text-sm font-bold text-red-500 bg-red-50 px-3 py-1 rounded-full"
    },
    grid: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
};

export default function DailyBestDeals() {
    return (
        <SectionWrapper className={styles.wrapper}>
            <div className={styles.header.container}>
                <div className={styles.header.textWrapper}>
                    <h2 className={styles.header.title}>{DAILY_DEALS_HEADER.title}</h2>
                    <p className={styles.header.description}>{DAILY_DEALS_HEADER.description}</p>
                </div>
            </div>

            <div className={styles.grid}>
                {DAILY_DEALS.map((product) => (
                    <DailySaleCard key={product.id} product={product} />
                ))}
            </div>
        </SectionWrapper>
    );
}
