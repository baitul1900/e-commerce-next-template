'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, User, Menu, X, Leaf, Heart } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import Button from '../ui/Button';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export default function Navbar() {
    const { cartCount, setIsCartOpen } = useCart();
    const { wishlistCount } = useWishlist();
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
        { name: 'Shop', href: '/products' },
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
                                <Link href="/wishlist">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="hidden sm:flex relative group"
                                    >
                                        <Heart className="w-5 h-5 text-forest dark:text-cream group-hover:text-red-500 transition-colors" />
                                        {wishlistCount > 0 && (
                                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                                {wishlistCount}
                                            </span>
                                        )}
                                    </Button>
                                </Link>

                                <Link href="/cart">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="hidden sm:flex relative group"
                                    >
                                        <ShoppingCart className="w-5 h-5 text-forest dark:text-cream group-hover:text-primary transition-colors" />
                                        {cartCount > 0 && (
                                            <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                                {cartCount}
                                            </span>
                                        )}
                                    </Button>
                                </Link>

                                {isLoggedIn ? (
                                    <Button variant="ghost" size="icon" className="hidden sm:flex group">
                                        <User className="w-5 h-5 text-forest dark:text-cream group-hover:text-primary transition-colors" />
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={() => setIsLoggedIn(true)}
                                        className="hidden sm:flex px-4 py-2"
                                        size="sm"
                                        variant="primary"
                                    >
                                        Join Now
                                    </Button>
                                )}

                                {/* Mobile Menu Button */}
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="lg:hidden"
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                >
                                    {isMobileMenuOpen ? (
                                        <X className="w-6 h-6 text-forest dark:text-cream" />
                                    ) : (
                                        <Menu className="w-6 h-6 text-forest dark:text-cream" />
                                    )}
                                </Button>
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
                            <Link href="/wishlist" className="flex-1">
                                <Button variant="ghost" className="w-full" leftIcon={Heart}>
                                    Wishlist ({wishlistCount})
                                </Button>
                            </Link>
                            <Link href="/cart" className="flex-1">
                                <Button variant="ghost" className="w-full" leftIcon={ShoppingCart}>
                                    Cart ({cartCount})
                                </Button>
                            </Link>
                            {isLoggedIn ? (
                                <Button variant="ghost" className="flex-1" leftIcon={User}>
                                    Profile
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => {
                                        setIsLoggedIn(true);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="flex-1"
                                >
                                    Join Now
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </header >
        </>
    );
}
