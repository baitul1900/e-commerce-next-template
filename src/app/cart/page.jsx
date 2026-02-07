'use client';

import React from 'react';
import SectionWrapper from '@/components/layout/SectionWrapper';
import Button from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const styles = {
    wrapper: "py-12 min-h-screen",
    container: "",
    header: {
        title: "text-3xl md:text-4xl font-bold font-display text-forest dark:text-cream mb-8",
        emptyState: "text-center py-20 flex flex-col items-center justify-center gap-6",
        emptyIcon: "w-24 h-24 text-forest/20 dark:text-cream/20 mb-4",
        emptyText: "text-xl text-forest/60 dark:text-cream/60 font-medium"
    },
    grid: "grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12",
    cartItems: {
        wrapper: "lg:col-span-2 space-y-6",
        item: "flex flex-col sm:flex-row items-center gap-6 p-6 bg-white dark:bg-forest/10 rounded-2xl border border-forest/10 dark:border-cream/10 shadow-sm transition-all hover:shadow-md",
        imageWrapper: "relative w-full sm:w-32 h-32 rounded-xl overflow-hidden bg-cream/30 flex-shrink-0",
        image: "object-cover w-full h-full",
        content: "flex-1 w-full text-center sm:text-left",
        name: "text-lg font-bold text-forest dark:text-cream mb-1",
        price: "text-primary font-bold text-lg mb-4 sm:mb-2",
        controls: "flex items-center justify-center sm:justify-start gap-4",
        quantityBtn: "w-8 h-8 rounded-full border border-forest/20 dark:border-cream/20 flex items-center justify-center hover:bg-forest/5 dark:hover:bg-cream/5 transition-colors text-forest dark:text-cream",
        quantity: "font-semibold w-8 text-center text-forest dark:text-cream",
        removeBtn: "p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-full transition-colors ml-auto sm:ml-4"
    },
    summary: {
        wrapper: "lg:col-span-1",
        card: "bg-white dark:bg-forest/10 p-8 rounded-3xl border border-forest/10 dark:border-cream/10 sticky top-24",
        title: "text-xl font-bold text-forest dark:text-cream mb-6",
        row: "flex justify-between items-center mb-4 text-forest/70 dark:text-cream/70",
        totalRow: "flex justify-between items-center mt-6 pt-6 border-t border-forest/10 dark:border-cream/10 mb-8",
        totalLabel: "text-lg font-bold text-forest dark:text-cream",
        totalValue: "text-2xl font-bold text-primary",
        checkoutBtn: "w-full py-4 text-lg shadow-lg hover:shadow-primary/30"
    }
};

export default function CartPage() {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
    const shipping = 5.00;
    const finalTotal = cartTotal + (cartItems.length > 0 ? shipping : 0);

    if (cartItems.length === 0) {
        return (
            <SectionWrapper className={styles.wrapper}>
                <div className={styles.header.emptyState}>
                    <ShoppingBag className={styles.header.emptyIcon} />
                    <h2 className={styles.header.emptyText}>Your cart is empty</h2>
                    <Link href="/products">
                        <Button variant="primary" icon={ArrowLeft}>
                            Start Shopping
                        </Button>
                    </Link>
                </div>
            </SectionWrapper>
        );
    }

    return (
        <SectionWrapper className={styles.wrapper}>
            <div className={styles.container}>
                <h1 className={styles.header.title}>Shopping Cart ({cartItems.length} items)</h1>

                <div className={styles.grid}>
                    {/* Cart Items List */}
                    <div className={styles.cartItems.wrapper}>
                        {cartItems.map((item) => (
                            <div key={item.id} className={styles.cartItems.item}>
                                <div className={styles.cartItems.imageWrapper}>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className={styles.cartItems.image}
                                    />
                                </div>
                                <div className={styles.cartItems.content}>
                                    <Link href={`/products/${item.id}`} className="hover:text-primary transition-colors">
                                        <h3 className={styles.cartItems.name}>{item.name}</h3>
                                    </Link>
                                    <p className="text-sm text-forest/60 dark:text-cream/60 mb-2">Category: {item.category}</p>
                                    <p className={styles.cartItems.price}>${item.price.toFixed(2)}</p>

                                    <div className={styles.cartItems.controls}>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className={styles.cartItems.quantityBtn}
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className={styles.cartItems.quantity}>{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className={styles.cartItems.quantityBtn}
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className={styles.cartItems.removeBtn}
                                    title="Remove item"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={clearCart}
                            className="text-red-500 text-sm font-semibold hover:underline flex items-center gap-2 mt-4"
                        >
                            <Trash2 className="w-4 h-4" /> Clear Cart
                        </button>
                    </div>

                    {/* Order Summary */}
                    <div className={styles.summary.wrapper}>
                        <div className={styles.summary.card}>
                            <h2 className={styles.summary.title}>Order Summary</h2>

                            <div className={styles.summary.row}>
                                <span>Subtotal</span>
                                <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className={styles.summary.row}>
                                <span>Shipping</span>
                                <span className="font-semibold">${shipping.toFixed(2)}</span>
                            </div>

                            <div className={styles.summary.totalRow}>
                                <span className={styles.summary.totalLabel}>Total</span>
                                <span className={styles.summary.totalValue}>${finalTotal.toFixed(2)}</span>
                            </div>

                            <Button
                                variant="primary"
                                className={styles.summary.checkoutBtn}
                            >
                                Proceed to Checkout
                            </Button>

                            <div className="mt-6 text-center">
                                <Link href="/products" className="text-sm text-forest/60 dark:text-cream/60 hover:text-primary transition-colors flex items-center justify-center gap-2">
                                    <ArrowLeft className="w-4 h-4" /> Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
