'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const CheckoutContext = createContext();

export const useCheckout = () => useContext(CheckoutContext);

export const CheckoutProvider = ({ children }) => {
    const [step, setStep] = useState(1); // 1: Account, 2: Shipping, 3: Payment, 4: Review
    const [user, setUser] = useState(null);
    const [shippingAddress, setShippingAddress] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zip: '',
        country: ''
    });
    const [paymentMethod, setPaymentMethod] = useState('');

    // Load user/checkout data from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('checkout_user');
        const savedAddress = localStorage.getItem('checkout_address');

        if (savedUser) setUser(JSON.parse(savedUser));
        if (savedAddress) setShippingAddress(JSON.parse(savedAddress));
    }, []);

    // Save to localStorage
    useEffect(() => {
        if (user) localStorage.setItem('checkout_user', JSON.stringify(user));
        if (shippingAddress.email) localStorage.setItem('checkout_address', JSON.stringify(shippingAddress));
    }, [user, shippingAddress]);

    const updateShippingAddress = (data) => {
        setShippingAddress(prev => ({ ...prev, ...data }));
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);
    const goToStep = (stepNumber) => setStep(stepNumber);

    return (
        <CheckoutContext.Provider value={{
            step,
            user,
            setUser,
            shippingAddress,
            updateShippingAddress,
            paymentMethod,
            setPaymentMethod,
            nextStep,
            prevStep,
            goToStep
        }}>
            {children}
        </CheckoutContext.Provider>
    );
};
