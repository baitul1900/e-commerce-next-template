'use client';

import React, { useEffect, useState } from 'react';
import SectionWrapper from '@/components/layout/SectionWrapper';
import ProductGallery from '@/components/products/ProductGallery';
import RelatedProducts from '@/components/products/RelatedProducts';
import { useParams } from 'next/navigation';
import ProductInfo from '@/components/products/ProductInfo';
import ProductDetailsTabs from '@/components/products/ProductDetailsTabs';

// Dummy Data
const DUMMY_PRODUCTS = {
    '1': {
        id: '1',
        title: 'Premium Wireless Headphones',
        price: 299.99,
        originalPrice: 349.99,
        rating: 4.8,
        reviews: 124,
        description: 'Experience high-fidelity audio with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and ultra-comfortable ear cushions for long listening sessions. These headphones are engineered to deliver deep, immersive sound and crystal-clear calls, making them perfect for commuters, travelers, and audiophiles alike.',
        category: 'Electronics',
        inStock: true,
        images: [
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1524678606372-987d74527785?q=80&w=1000&auto=format&fit=crop'
        ]
    },
    '2': {
        id: '2',
        title: 'Ergonomic Office Chair',
        price: 199.99,
        rating: 4.5,
        reviews: 89,
        description: 'Work in comfort with our ergonomic office chair. Designed with lumbar support, adjustable height, and breathable mesh material to keep you cool and productive throughout the day. The sturdy base and smooth-rolling casters ensure stability and ease of movement.',
        category: 'Furniture',
        inStock: true,
        images: [
            'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1519947486511-4639940be64e?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=1000&auto=format&fit=crop'
        ]
    }
};

const ProductDetailsPage = () => {
    const params = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (params?.id) {
            // Simulate API call
            setLoading(true);
            setTimeout(() => {
                const foundProduct = DUMMY_PRODUCTS[params.id] || DUMMY_PRODUCTS['1']; // Fallback to product 1
                setProduct(foundProduct);
                setLoading(false);
            }, 500);
        }
    }, [params?.id]);

    if (loading) {
        return (
            <SectionWrapper className="py-12 min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </SectionWrapper>
        );
    }

    if (!product) {
        return (
            <SectionWrapper className="py-12 text-center">
                <h2 className="text-2xl font-bold">Product not found</h2>
            </SectionWrapper>
        );
    }

    return (
        <SectionWrapper className="py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                {/* Left Column - Gallery */}
                <ProductGallery images={product.images} />

                {/* Right Column - Product Info */}
                <ProductInfo product={product} />
            </div>

            {/* Bottom Section - Tabs */}
            <ProductDetailsTabs product={product} />

            {/* Related Products */}
            <RelatedProducts currentProductId={product.id} />
        </SectionWrapper>
    );
};

export default ProductDetailsPage;
