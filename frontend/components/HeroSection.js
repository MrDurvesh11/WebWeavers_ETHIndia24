// HeroSection.js

import { motion } from "framer-motion";
import React from "react";

export default function AuroraBackgroundDemo() {
  return (
    <div className="relative w-full h-screen bg-black">
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-transparent to-transparent animate-aurora"></div>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4 z-20"
      >
        <div className="text-2xl mt-64 sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white text-center">
          Revolutionizing IPO Allocation,<br /> One Block at a Time
        </div>

        <div className="font-light text-sm sm:text-base md:text-2xl lg:text-4xl text-gray-300 py-4 text-center">
          Experience transparent, fair, and decentralized IPO allocation with EquiChain Web3-powered platform.
        </div>
        <button className="bg-blue-600 dark:bg-gray-800 rounded-full w-fit text-white px-6 py-3 mx-auto mt-6 transition hover:bg-blue-700 dark:hover:bg-gray-600">
          Get Started
        </button>
      </motion.div>
    </div>
  );
}

// Add the aurora animation styles to your global styles or inject it as inline styles.
const auroraStyle = `
  @keyframes aurora {
    0% {
      background-position: 0% 0%;
    }
    50% {
      background-position: 100% 100%;
    }
    100% {
      background-position: 0% 0%;
    }
  }

  .animate-aurora {
    background: linear-gradient(
      45deg, 
      rgba(255, 0, 150, 0.5), 
      rgba(0, 255, 234, 0.5), 
      rgba(123, 31, 162, 0.4), 
      rgba(34, 193, 195, 0.4)
    );
    background-size: 400% 400%;
    animation: aurora 6s ease-in-out infinite;
    mix-blend-mode: screen;
  }
`;

// Inject the aurora animation styles into the document's head
if (typeof window !== "undefined") {
  const styleElement = document.createElement("style");
  styleElement.innerHTML = auroraStyle;
  document.head.appendChild(styleElement);
}
