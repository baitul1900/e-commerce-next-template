'use client';

import React, { useState } from 'react';
import SectionWrapper from '@/components/layout/SectionWrapper';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useCheckout } from '@/context/CheckoutContext';
import { useCart } from '@/context/CartContext';
import { Check, Truck, CreditCard, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
    const {
        step, nextStep, prevStep,
        user, setUser,
        shippingAddress, updateShippingAddress,
        paymentMethod, setPaymentMethod
    } = useCheckout();
    const { cartItems, cartTotal } = useCart();
    const shipping = 5.00; // Flat rate
    const finalTotal = cartTotal + shipping;

    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' });
    const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'

    const handleLogin = (e) => {
        e.preventDefault();
        // Simulate login
        setUser({ name: 'Demo User', email: loginData.email });
        nextStep();
    };

    const handleRegister = (e) => {
        e.preventDefault();
        // Simulate registration
        setUser({ name: registerData.name, email: registerData.email });
        nextStep();
    };

    const handleShippingSubmit = (e) => {
        e.preventDefault();
        nextStep();
    };

    const handlePaymentSubmit = () => {
        if (!paymentMethod) return;
        nextStep(); // Go to review
    };

    const handlePlaceOrder = () => {
        // Implement order placement logic (simulate)
        alert('Order Placed Successfully!');
        // Redirect or clear cart here
    };

    const steps = [
        { id: 1, label: 'Account', icon: User },
        { id: 2, label: 'Shipping', icon: Truck },
        { id: 3, label: 'Payment', icon: CreditCard },
        { id: 4, label: 'Review', icon: Check },
    ];

    if (cartItems.length === 0) {
        return (
            <SectionWrapper className="py-20 min-h-screen text-center">
                <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                <Link href="/products">
                    <Button variant="primary">Start Shopping</Button>
                </Link>
            </SectionWrapper>
        );
    }

    return (
        <SectionWrapper className="py-12 min-h-screen">
            {/* Steps Indicator */}
            <div className="flex justify-between max-w-2xl mx-auto mb-12 relative">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-forest/10 dark:bg-cream/10 -z-10" />
                {steps.map((s) => (
                    <div key={s.id} className="flex flex-col items-center gap-2 bg-background-light dark:bg-background-dark px-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${step >= s.id ? 'bg-primary text-white' : 'bg-forest/10 dark:bg-cream/10 text-forest/40 dark:text-cream/40'
                            }`}>
                            <s.icon className="w-5 h-5" />
                        </div>
                        <span className={`text-sm font-medium ${step >= s.id ? 'text-primary' : 'text-forest/40 dark:text-cream/40'}`}>
                            {s.label}
                        </span>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Form Area */}
                <div className="lg:col-span-2">
                    {step === 1 && (
                        <div className="bg-white dark:bg-forest/10 p-8 rounded-3xl border border-forest/10 dark:border-cream/10">
                            <h2 className="text-2xl font-bold mb-6">Account Details</h2>
                            {user ? (
                                <div className="text-center py-8">
                                    <p className="text-lg mb-4">Logged in as <span className="font-bold">{user.name}</span></p>
                                    <Button onClick={nextStep} variant="primary">Continue to Shipping</Button>
                                    <button onClick={() => setUser(null)} className="block mt-4 text-sm text-red-500 hover:underline mx-auto">
                                        Log out
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <div className="flex gap-4 mb-6">
                                        <button
                                            className={`flex-1 py-2 border-b-2 font-semibold ${authMode === 'login' ? 'border-primary text-primary' : 'border-transparent text-forest/40'}`}
                                            onClick={() => setAuthMode('login')}
                                        >
                                            Login
                                        </button>
                                        <button
                                            className={`flex-1 py-2 border-b-2 font-semibold ${authMode === 'register' ? 'border-primary text-primary' : 'border-transparent text-forest/40'}`}
                                            onClick={() => setAuthMode('register')}
                                        >
                                            Register
                                        </button>
                                    </div>

                                    {authMode === 'login' ? (
                                        <form onSubmit={handleLogin} className="space-y-4">
                                            <Input
                                                label="Email Address"
                                                required
                                                type="email"
                                                value={loginData.email}
                                                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                            />
                                            <Input
                                                label="Password"
                                                required
                                                type="password"
                                                value={loginData.password}
                                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                            />
                                            <Button type="submit" variant="primary" className="w-full mt-4">Login</Button>
                                        </form>
                                    ) : (
                                        <form onSubmit={handleRegister} className="space-y-4">
                                            <Input
                                                label="Full Name"
                                                required
                                                value={registerData.name}
                                                onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                                            />
                                            <Input
                                                label="Email Address"
                                                required
                                                type="email"
                                                value={registerData.email}
                                                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                                            />
                                            <Input
                                                label="Password"
                                                required
                                                type="password"
                                                value={registerData.password}
                                                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                                            />
                                            <Button type="submit" variant="primary" className="w-full mt-4">Register</Button>
                                        </form>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {step === 2 && (
                        <div className="bg-white dark:bg-forest/10 p-8 rounded-3xl border border-forest/10 dark:border-cream/10">
                            <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>
                            <form onSubmit={handleShippingSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="First Name"
                                    required
                                    value={shippingAddress.firstName}
                                    onChange={(e) => updateShippingAddress({ firstName: e.target.value })}
                                />
                                <Input
                                    label="Last Name"
                                    required
                                    value={shippingAddress.lastName}
                                    onChange={(e) => updateShippingAddress({ lastName: e.target.value })}
                                />
                                <Input
                                    label="Email"
                                    required
                                    type="email"
                                    className="md:col-span-2"
                                    value={shippingAddress.email}
                                    onChange={(e) => updateShippingAddress({ email: e.target.value })}
                                />
                                <Input
                                    label="Address"
                                    required
                                    className="md:col-span-2"
                                    value={shippingAddress.address}
                                    onChange={(e) => updateShippingAddress({ address: e.target.value })}
                                />
                                <Input
                                    label="City"
                                    required
                                    value={shippingAddress.city}
                                    onChange={(e) => updateShippingAddress({ city: e.target.value })}
                                />
                                <Input
                                    label="ZIP Code"
                                    required
                                    value={shippingAddress.zip}
                                    onChange={(e) => updateShippingAddress({ zip: e.target.value })}
                                />
                                <div className="md:col-span-2 mt-4 flex justify-between">
                                    <Button variant="ghost" onClick={prevStep}>Back</Button>
                                    <Button type="submit" variant="primary">Continue to Payment</Button>
                                </div>
                            </form>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="bg-white dark:bg-forest/10 p-8 rounded-3xl border border-forest/10 dark:border-cream/10">
                            <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
                            <div className="space-y-4 mb-8">
                                {[
                                    { id: 'credit_card', label: 'Credit Card (Stripe)' },
                                    { id: 'paypal', label: 'PayPal' },
                                    { id: 'cod', label: 'Cash on Delivery' }
                                ].map((method) => (
                                    <label
                                        key={method.id}
                                        className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === method.id
                                                ? 'border-primary bg-primary/5'
                                                : 'border-forest/10 hover:border-primary/30'
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value={method.id}
                                            checked={paymentMethod === method.id}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="w-5 h-5 text-primary focus:ring-primary"
                                        />
                                        <span className="font-semibold">{method.label}</span>
                                    </label>
                                ))}
                            </div>
                            <div className="flex justify-between">
                                <Button variant="ghost" onClick={prevStep}>Back</Button>
                                <Button
                                    onClick={handlePaymentSubmit}
                                    variant="primary"
                                    disabled={!paymentMethod}
                                >
                                    Review Order
                                </Button>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="bg-white dark:bg-forest/10 p-8 rounded-3xl border border-forest/10 dark:border-cream/10">
                            <h2 className="text-2xl font-bold mb-6">Review Order</h2>
                            <div className="space-y-6">
                                <div className="pb-6 border-b border-forest/10 dark:border-cream/10">
                                    <h3 className="font-bold mb-2 text-primary">Shipping To</h3>
                                    <p>{shippingAddress.firstName} {shippingAddress.lastName}</p>
                                    <p>{shippingAddress.address}</p>
                                    <p>{shippingAddress.city}, {shippingAddress.zip}</p>
                                </div>
                                <div className="pb-6 border-b border-forest/10 dark:border-cream/10">
                                    <h3 className="font-bold mb-2 text-primary">Payment Method</h3>
                                    <p className="capitalize">{paymentMethod.replace('_', ' ')}</p>
                                </div>
                                <div>
                                    <h3 className="font-bold mb-4 text-primary">Items</h3>
                                    {cartItems.map(item => (
                                        <div key={item.id} className="flex justify-between items-center mb-2">
                                            <span>{item.name} x {item.quantity}</span>
                                            <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-between mt-8">
                                <Button variant="ghost" onClick={prevStep}>Back</Button>
                                <Button onClick={handlePlaceOrder} variant="primary">Place Order</Button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Order Summary Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-forest/10 p-6 rounded-3xl border border-forest/10 dark:border-cream/10 sticky top-24">
                        <h3 className="text-xl font-bold mb-6">Order Summary</h3>
                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between">
                                <span className="text-forest/60 dark:text-cream/60">Subtotal</span>
                                <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-forest/60 dark:text-cream/60">Shipping</span>
                                <span className="font-semibold">${shipping.toFixed(2)}</span>
                            </div>
                            <div className="pt-4 border-t border-forest/10 dark:border-cream/10 flex justify-between">
                                <span className="text-lg font-bold">Total</span>
                                <span className="text-xl font-bold text-primary">${finalTotal.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
