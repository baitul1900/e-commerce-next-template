import React from 'react';

const SectionWrapper = ({ children, className = "" }) => {
    return (
        <section className={`w-full flex justify-center ${className}`}>
            {/* আসল কন্টেইনার যা উইডথ কন্ট্রোল করে */}
            <div className="w-full max-w-[1480px] px-4 md:px-10 lg:px-16 mx-auto">
                {children}
            </div>
        </section>
    );
};

export default SectionWrapper;