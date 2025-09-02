import React from "react";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";

export default function About() {
    return (
        <>
            <Header />
             <div className="flex items-center justify-center min-h-[80vh] bg-gradient-to-br from-background to-secondary">
                <div className="text-center px-4">
                    <h1 className="text-5xl md:text-7xl font-serif mb-6 text-foreground">
                        Gold and Diamond Jewelry
                        <span className="block text-[#FFD700]">Manufacturer</span>
                    </h1>
                    <p className="text-xl text-[#8C8C8C] mb-8 max-w-2xl mx-auto">
                        Second generation family owned wholesale diamond jewelry manufacturer serving 
                        USA, Caribbean Islands, South America and Canada since 1992.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a 
                        href="/story"
                        className="bg-[#FFD700] text-primary hover:bg-[#D4AF37] px-8 py-4 rounded-md font-medium transition-all duration-300 inline-block"
                        >
                        Learn Our Story
                        </a>
                        <a 
                        href="#"
                        className="border border-[#FFD700] text-[#FFD700] hover:bg-[#D4AF37] hover:text-primary px-8 py-4 rounded-md font-medium transition-all duration-300 inline-block"
                        >
                        View Collections
                        </a>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
