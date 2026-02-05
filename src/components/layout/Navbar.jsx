'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, User, Menu, X, Leaf } from 'lucide-react';
import SectionWrapper from './SectionWrapper';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Handle scroll effect for sticky navbar
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Shop', href: '/shop' },
        { name: 'About Us', href: '/about' },
        { name: 'Offer', href: '/offer' },
    ];

    return (
        <>
            <header
                className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled
                    ? 'bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-forest/10 dark:border-cream/10 shadow-sm'
                    : 'bg-background-light dark:bg-background-dark border-b border-transparent'
                    }`}
            >
                <SectionWrapper className="py-4">
                    <div className="flex items-center justify-between gap-8">
                        {/* Logo and Desktop Nav */}
                        <div className="flex items-center gap-12">
                            <Link href="/" className="flex items-center gap-2 text-forest dark:text-cream group">
                                <Leaf className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                                <h2 className="text-xl font-extrabold tracking-tight uppercase">Verdant</h2>
                            </Link>

                            <nav className="hidden lg:flex items-center gap-8">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="text-sm font-semibold hover:text-primary transition-colors relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        {/* Actions and Search */}
                        <div className="flex flex-1 justify-end items-center gap-6">
                            <div className="hidden md:flex flex-1 max-w-xs relative group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/60 w-5 h-5 group-focus-within:text-primary transition-colors" />
                                <input
                                    className="w-full bg-forest/5 dark:bg-cream/5 border border-transparent rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary/50 transition-all placeholder:text-gray-400"
                                    placeholder="Find organic essentials..."
                                    type="text"
                                />
                            </div>

                            <div className="hidden lg:flex items-center">
                                <Link href="/track-order" className="text-sm font-semibold hover:text-primary transition-colors whitespace-nowrap mr-6">
                                    Track Order
                                </Link>
                            </div>

                            <div className="flex items-center gap-3">
                                <button className="hidden sm:flex p-2 rounded-lg bg-forest/5 dark:bg-cream/5 hover:bg-primary/20 hover:text-primary transition-all relative group">
                                    <ShoppingCart className="w-5 h-5 text-forest dark:text-cream group-hover:text-primary transition-colors" />
                                    <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
                                </button>

                                {isLoggedIn ? (
                                    <button className="hidden sm:flex p-2 rounded-lg bg-forest/5 dark:bg-cream/5 hover:bg-primary/20 hover:text-primary transition-all group">
                                        <User className="w-5 h-5 text-forest dark:text-cream group-hover:text-primary transition-colors" />
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => setIsLoggedIn(true)}
                                        className="hidden sm:flex px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-all"
                                    >
                                        Join Now
                                    </button>
                                )}

                                {/* Mobile Menu Button */}
                                <button
                                    className="lg:hidden p-2 rounded-lg hover:bg-forest/5 dark:hover:bg-cream/5 transition-colors"
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                >
                                    {isMobileMenuOpen ? (
                                        <X className="w-6 h-6 text-forest dark:text-cream" />
                                    ) : (
                                        <Menu className="w-6 h-6 text-forest dark:text-cream" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </SectionWrapper>

                {/* Mobile Menu */}
                <div
                    className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-screen opacity-100 border-b border-forest/10 dark:border-cream/10' : 'max-h-0 opacity-0'
                        }`}
                >
                    <div className="bg-background-light dark:bg-background-dark px-6 py-4 space-y-4">
                        <div className="relative mb-6">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/60 w-5 h-5" />
                            <input
                                className="w-full bg-forest/5 dark:bg-cream/5 border-none rounded-lg pl-10 pr-4 py-3 text-sm focus:ring-1 focus:ring-primary"
                                placeholder="Search products..."
                                type="text"
                            />
                        </div>
                        <nav className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-lg font-medium py-2 border-b border-forest/5 dark:border-cream/5 last:border-0 hover:text-primary transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                href="/track-order"
                                className="text-lg font-medium py-2 border-b border-forest/5 dark:border-cream/5 last:border-0 hover:text-primary transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Track Order
                            </Link>
                        </nav>
                        <div className="flex gap-4 pt-4 mt-4 border-t border-forest/10 dark:border-cream/10">
                            <button className="flex-1 flex items-center justify-center gap-2 p-3 rounded-lg bg-forest/5 dark:bg-cream/5 hover:bg-primary/20 hover:text-primary transition-all">
                                <ShoppingCart className="w-5 h-5" />
                                <span className="font-semibold">Cart (0)</span>
                            </button>
                            {isLoggedIn ? (
                                <button className="flex-1 flex items-center justify-center gap-2 p-3 rounded-lg bg-forest/5 dark:bg-cream/5 hover:bg-primary/20 hover:text-primary transition-all">
                                    <User className="w-5 h-5" />
                                    <span className="font-semibold">Profile</span>
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        setIsLoggedIn(true);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="flex-1 flex items-center justify-center gap-2 p-3 rounded-lg bg-primary text-white font-bold hover:bg-primary/90 transition-all"
                                >
                                    Join Now
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}
