import React, { useEffect, useRef } from "react";
import { cn } from "@/app/utils/utils";
import Image from "next/image";
import createGlobe from "cobe";

export function FeaturesSectionDemo() {
  const features = [
    {
      title: "Connect with Experienced Trainers",
      description:
        "Our platform connects students preparing for NEET, JEE, and CET with college students who have successfully completed their training.",
      imageSrc: "/connect.png",
    },
    {
      title: "Focused Topic Assistance",
      description:
        "Students can request help on specific topics, ensuring they receive targeted support and guidance.",
      imageSrc: "/assist.png",
    },
    {
      title: "Secure Online Meetings",
      description:
        "The application facilitates online meetings between trainees and trainers, ensuring a safe and focused learning environment.",
      imageSrc: "/secure.png",
    },
    {
      title: "Conversation Analysis",
      description:
        "All sessions are recorded and analyzed for maintaining quality and respectful conversations, ensuring a positive learning experience.",
      imageSrc: "/conversation.png",
    },
  ];

  return (
    <div className="py-10 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h4 className="text-3xl lg:text-5xl font-bold text-black dark:text-white">
          Empowering Education Through Technology
        </h4>
        <p className="mt-4 text-base lg:text-lg text-neutral-500 dark:text-neutral-300">
          Our platform bridges the gap in education, connecting aspiring students with the guidance they need to succeed.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 border dark:border-neutral-800 rounded-lg shadow-lg flex flex-col items-center justify-center"
          >
            <Image
              src={feature.imageSrc}
              alt={feature.title}
              width={200}
              height={200}
              className="rounded-md mb-4"
            />
            <h5 className="text-lg font-semibold text-black dark:text-white text-center">
              {feature.title}
            </h5>
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-300 text-center">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export const Globe = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 400 * 2, // Made responsive to the container size
      height: 400 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: [
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.1 },
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.01;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        maxWidth: "400px",
        height: "auto",
      }}
      className="globe-canvas"
    />
  );
};
