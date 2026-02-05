'use client';

import React from 'react';
import SectionWrapper from './SectionWrapper';
import { FOOTER_DATA } from '@/constants/footerData';
import Icon from '@/components/icon/Icon';

const styles = {
    wrapper: "bg-forest/5 dark:bg-forest/20 pt-16 pb-8 border-t border-forest/5 dark:border-cream/5",
    container: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16",
    column: {
        wrapper: "flex flex-col gap-6",
        title: "text-lg font-bold text-forest dark:text-cream font-display",
        link: "text-forest/70 dark:text-cream/70 hover:text-primary transition-colors text-sm",
        text: "text-forest/70 dark:text-cream/70 text-sm leading-relaxed"
    },
    brand: {
        logo: "text-2xl font-bold font-display text-forest dark:text-cream",
        description: "text-forest/70 dark:text-cream/70 text-sm leading-relaxed max-w-xs"
    },
    payments: {
        wrapper: "flex flex-col gap-4",
        banner: "w-full max-w-[300px] h-auto rounded-lg bg-white p-2"
    },
    bottomBar: {
        wrapper: "pt-8 border-t border-forest/5 dark:border-cream/5 flex flex-col md:flex-row items-center justify-between gap-4",
        copyright: "text-sm text-forest/50 dark:text-cream/50"
    }
};

export default function Footer() {
    return (
        <footer className={styles.wrapper}>
            <SectionWrapper className="!py-0">
                <div className={styles.container}>
                    {/* Brand Column */}
                    <div className={styles.column.wrapper}>
                        <h2 className={styles.brand.logo}>{FOOTER_DATA.company.logoText}</h2>
                        <p className={styles.brand.description}>
                            {FOOTER_DATA.company.description}
                        </p>
                    </div>

                    {/* Links Columns */}
                    {FOOTER_DATA.columns.map((col, index) => (
                        <div key={index} className={styles.column.wrapper}>
                            <h3 className={styles.column.title}>{col.title}</h3>
                            <div className="flex flex-col gap-3">
                                {col.links.map((link, i) => (
                                    <a key={i} href={link.href} className={styles.column.link}>
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Payments Column */}
                    <div className={styles.column.wrapper}>
                        <h3 className={styles.column.title}>{FOOTER_DATA.payments.title}</h3>
                        <div className={styles.payments.wrapper}>
                            <img
                                src={FOOTER_DATA.payments.bannerUrl}
                                alt="SSLCommerz Payment Methods"
                                className={styles.payments.banner}
                            />
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className={styles.bottomBar.wrapper}>
                    <p className={styles.bottomBar.copyright}>
                        {FOOTER_DATA.copyright}
                    </p>
                    <div className="flex gap-4">
                        {/* Social Placeholders if needed later */}
                    </div>
                </div>
            </SectionWrapper>
        </footer>
    );
}
