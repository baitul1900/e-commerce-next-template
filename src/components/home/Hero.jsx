'use client';

import React from 'react';
import SectionWrapper from '../layout/SectionWrapper';
import HeroSlider from './hero/HeroSlider';
import OfferHighlight from './hero/OfferHighlight';
import { SLIDE_DATA, OFFER_DATA } from '@/constants/heroData';

const styles = {
    wrapper: "py-6 lg:py-8",
    grid: "grid grid-cols-1 lg:grid-cols-3 gap-6 h-[60vh] min-h-[400px] max-h-[550px]"
};

export default function Hero() {
    return (
        <SectionWrapper className={styles.wrapper}>
            <div className={styles.grid}>

                {/* Main Slider Area */}
                <HeroSlider slides={SLIDE_DATA} />

                {/* Offer Highlighter - Sidebar (Desktop) */}
                <OfferHighlight data={OFFER_DATA} />

                {/* Offer Highlighter - Stacked (Mobile) */}
                <OfferHighlight data={OFFER_DATA} isMobile />

            </div>
        </SectionWrapper>
    );
}
