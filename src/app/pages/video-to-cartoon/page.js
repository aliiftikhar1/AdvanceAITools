'use client'
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import UserLayout from '../../UserLayout'

// Dynamically import Framer Motion to avoid SSR issues
const MotionHeading = dynamic(() => import("framer-motion").then(mod => mod.motion.h1), { ssr: false });
const MotionParagraph = dynamic(() => import("framer-motion").then(mod => mod.motion.p), { ssr: false });
const MotionDiv = dynamic(() => import("framer-motion").then(mod => mod.motion.div), { ssr: false });

export default function VideoTOCartoon() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null; // Avoid rendering on server-side
    }

    return (
        <UserLayout>
        <div className="h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
            {/* Animated Heading */}
            <MotionHeading
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-4xl md:text-6xl font-bold text-center mb-4"
            >
                Video to Cartoon
            </MotionHeading>
            {/* Animated Subheading */}
            <MotionParagraph
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-lg md:text-2xl text-center mb-6"
            >
                We're working on something amazing! Stay tuned.
            </MotionParagraph>
            {/* Countdown Timer or Placeholder */}
            <MotionDiv
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="bg-gray-800 py-4 px-6 rounded-lg shadow-lg text-center"
            >
                <p className="text-2xl md:text-4xl font-semibold mb-2">Coming Soon</p>
                <p className="text-sm md:text-lg">We can't wait to show you!</p>
            </MotionDiv>
            {/* Placeholder for Notify Me Button */}
            <MotionDiv
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 1.5 }}
                className="mt-8"
            >
                {/* <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">
                    Notify Me
                </button> */}
            </MotionDiv>
        </div>
        </UserLayout>
    );
}
