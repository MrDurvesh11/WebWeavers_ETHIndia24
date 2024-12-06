"use client";

import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";

export function AuroraBackgroundDemo() {
  return (
    (<AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4">
       <div className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold dark:text-white text-center">
       Focus on quality learning,<br/>  not just quantity
      </div>

      <div className="font-light text-sm sm:text-base md:text-2xl lg:text-4xl dark:text-neutral-200 py-4 text-center">
      Get personalized guidance from experienced Trainers to excel in your academic journey
      </div>
      <button
        className="bg-blue-600 dark:bg-white rounded-full w-fit text-white dark:text-black px-6 py-3 mx-auto mt-6 transition hover:bg-blue-700 dark:hover:bg-neutral-300">
        Get Started
      </button>

      </motion.div>
    </AuroraBackground>)
  );
}
