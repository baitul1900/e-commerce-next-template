'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProductGallery = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    if (!images || images.length === 0) return null;

    const handleMouseMove = (e) => {
        if (!isZoomed) return;
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setMousePosition({ x, y });
    };

    const handleImageClick = (e) => {
        if (!isZoomed) {
            // Set initial position on click
            const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - left) / width) * 100;
            const y = ((e.clientY - top) / height) * 100;
            setMousePosition({ x, y });
        }
        setIsZoomed(!isZoomed);
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div
                className={`relative aspect-square w-full overflow-hidden rounded-2xl bg-white/5 border border-forest/5 dark:border-cream/5 ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                onClick={handleImageClick}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setIsZoomed(false)}
            >
                <AnimatePresence mode="wait">
                    <motion.img
                        key={selectedImage}
                        src={images[selectedImage]}
                        alt={`Product image ${selectedImage + 1}`}
                        initial={{ opacity: 0, x: 20, scale: 1 }}
                        animate={{
                            opacity: 1,
                            x: 0,
                            scale: isZoomed ? 2 : 1
                        }}
                        exit={{ opacity: 0, x: -20, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="h-full w-full object-cover object-center"
                        style={{
                            transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                        }}
                    />
                </AnimatePresence>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all duration-200 ${selectedImage === index
                            ? 'border-forest dark:border-cream ring-2 ring-forest/20 dark:ring-cream/20'
                            : 'border-transparent hover:border-forest/50 dark:hover:border-cream/50'
                            }`}
                    >
                        <img
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className="h-full w-full object-cover object-center"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ProductGallery;
