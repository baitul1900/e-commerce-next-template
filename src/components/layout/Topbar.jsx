import React from 'react'
import SectionWrapper from './SectionWrapper'

export default function Topbar({ text = "Ethically Sourced & Sustainably Made — Free Carbon-Neutral Shipping on Orders Over $150" }) {
    return (

        <SectionWrapper className="py-2.5 w-full bg-cream-dark dark:bg-forest border-b border-forest/5 dark:border-cream/5 transition-all">
            <div className="flex items-center justify-center relative">
                <p className="text-xs md:text-sm font-bold tracking-wide text-primary text-center">
                    {text}
                </p>
            </div>
        </SectionWrapper>

    )
}