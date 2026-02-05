'use client';

import React, { useState } from 'react';
import SectionWrapper from '../../layout/SectionWrapper';
import Button from '../../ui/Button';
import { CTA_DATA } from '@/constants/ctaData';
import { useToast } from '@/context/ToastContext';
import { Mail } from 'lucide-react';

const styles = {
    wrapper: "py-10",
    // কন্টেইনারে গ্লাস ইফেক্ট এবং রিলেটিভ পজিশন যোগ করা হয়েছে
    container: "relative overflow-hidden rounded-[2rem] bg-gradient-to-b from-forest/5 to-transparent dark:from-white/5 border border-forest/10 dark:border-white/10 px-6 py-16 md:py-24 text-center",
    // ডেকোরেটিভ এলিমেন্ট (ব্যাকগ্রাউন্ড গ্লো)
    glow: "absolute -z-10 w-64 h-64 rounded-full blur-[100px] opacity-20",
    iconWrapper: "inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-forest dark:bg-cream text-white dark:text-forest mb-6 shadow-xl transform -rotate-6",
    title: "text-4xl md:text-5xl lg:text-6xl font-bold font-display tracking-tight text-forest dark:text-cream mb-6",
    description: "text-lg text-forest/70 dark:text-cream/70 max-w-xl mx-auto mb-12 leading-relaxed",
    form: {
        wrapper: "relative flex flex-col sm:flex-row gap-3 max-w-lg mx-auto p-2 rounded-2xl bg-white/50 dark:bg-forest/50 backdrop-blur-md border border-forest/5 dark:border-white/5 shadow-2xl",
        input: "flex-1 px-5 py-4 rounded-xl bg-transparent text-forest dark:text-cream focus:outline-none placeholder:text-forest/40 dark:placeholder:text-cream/40",
        button: "w-full sm:w-auto shadow-lg hover:shadow-primary/30 transition-all duration-300"
    }
};

export default function CTASection() {
    const [email, setEmail] = useState('');
    const { showToast } = useToast();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            showToast('Please enter your email', 'error', 'bottom-center');
            return;
        }
        showToast('Thanks for subscribing!', 'success', 'bottom-center');
        setEmail('');
    };

    return (
        <SectionWrapper className={styles.wrapper}>
            <div className={styles.container}>
                {/* Background Glows */}
                <div className={`${styles.glow} bg-primary -top-20 -left-20`}></div>
                <div className={`${styles.glow} bg-blue-400 -bottom-20 -right-20`}></div>

                <div className={styles.iconWrapper}>
                    <Mail className="w-7 h-7" />
                </div>

                <h2 className={styles.title}>
                    {CTA_DATA.title}
                </h2>

                <p className={styles.description}>
                    {CTA_DATA.description}
                </p>

                <form onSubmit={handleSubmit} className={styles.form.wrapper}>
                    <input
                        type="email"
                        placeholder={CTA_DATA.placeholder}
                        className={styles.form.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Button
                        variant="primary"
                        size="lg"
                        className={styles.form.button}
                    >
                        {CTA_DATA.buttonText}
                    </Button>
                </form>
            </div>
        </SectionWrapper>
    );
}