"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  MenuItem,
  Menu,
  ProductItem,
  HoveredLink,
} from "@/components/ui/navbar-menu"; // Assuming this is your components path
import { FaBars } from "react-icons/fa"; // FontAwesome icons for the hamburger

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export function NavbarDemo() {
  return (
    <div className="w-full bg-white dark:bg-black shadow-lg py-4 fixed top-0 z-50 transition-colors">
      <Navbar />
    </div>
  );
}

function Navbar() {
  const [active, setActive] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to handle mobile menu

  return (
    <div className="max-w-7xl mx-auto flex justify-between items-center px-6 lg:px-8">
      {/* Left: Logo */}
      <div className="flex items-center space-x-4">
        <Image
          src="/logo.png" // Replace with your logo path
          alt="EquiChain Logo"
          width={50}
          height={50}
          className="h-12 w-12 lg:h-20 lg:w-20"
        />
        <span className="font-bold text-lg lg:text-xl text-black dark:text-white">
          EquiChain
        </span>
      </div>
      
      {/* Right: Hamburger Menu for Mobile */}
      <div className="lg:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <FaBars className="text-xl text-black dark:text-white" />
        </button>
      </div>

      {/* Center: Menu (hidden on mobile, visible on larger screens) */}
      <div className={`hidden lg:flex flex-1 justify-center`}>
        <Menu setActive={setActive} className="flex space-x-8">
          <HoveredLink href="/">Home</HoveredLink>
          <MenuItem setActive={setActive} active={active} item="Services">
            <div className="text-sm grid grid-cols-2 gap-10 p-4 text-neutral-700 dark:text-neutral-300">
              <ProductItem
                title="Fair IPO Allocation"
                href="/services"
                src="/randomness.png"
                description="Ensure transparent and equitable IPO allocation using Web3."
              />
              <ProductItem
                title="Decentralized Bidding"
                href="/services"
                src="/bidding.png"
                description="Empower participants with decentralized bidding mechanisms."
              />
              <ProductItem
                title="Allocation Transparency"
                href="/services"
                src="/transparency.png"
                description="Track and verify allocation decisions with blockchain transparency."
              />
              <ProductItem
                title="Community Engagement"
                href="/services"
                src="/community.png"
                description="Build investor confidence through open communication channels."
              />
            </div>
          </MenuItem>
          <HoveredLink href="/about">About</HoveredLink>
        </Menu>
      </div>
      
      {/* Right: Login Button (visible on larger screens) */}
      <div className="hidden lg:flex">
        <Link href="/auth/login">
          <div className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Login
          </div>
        </Link>
      </div>

      {/* Mobile Menu (visible on mobile when clicked) */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white dark:bg-black p-4 space-y-4 shadow-lg">
          <Menu setActive={setActive} className="flex flex-col space-y-4">
            <HoveredLink href="/">Home</HoveredLink>
            <MenuItem setActive={setActive} active={active} item="Services">
              <div className="text-sm grid grid-cols-1 gap-6 text-neutral-700 dark:text-neutral-300">
                <ProductItem
                  title="Fair IPO Allocation"
                  href="/services"
                  src="/randomness.png"
                  description="Ensure transparent and equitable IPO allocation using Web3."
                />
                <ProductItem
                  title="Decentralized Bidding"
                  href="/services"
                  src="/bidding.png"
                  description="Empower participants with decentralized bidding mechanisms."
                />
                <ProductItem
                  title="Allocation Transparency"
                  href="/services"
                  src="/transparency.png"
                  description="Track and verify allocation decisions with blockchain transparency."
                />
                <ProductItem
                  title="Community Engagement"
                  href="/services"
                  src="/community.png"
                  description="Build investor confidence through open communication channels."
                />
              </div>
            </MenuItem>

            <HoveredLink href="/about">About</HoveredLink>
          </Menu>
        </div>
      )}
    </div>
  );
}
