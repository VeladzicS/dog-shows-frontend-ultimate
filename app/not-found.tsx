"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative mb-8"
      >
        {/* Sniffing dog SVG */}
        <svg
          width="280"
          height="200"
          viewBox="0 0 280 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          {/* Body */}
          <motion.ellipse
            cx="140"
            cy="130"
            rx="70"
            ry="40"
            fill="var(--color-primary)"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          {/* Head */}
          <motion.circle
            cx="200"
            cy="95"
            r="30"
            fill="var(--color-primary)"
            initial={{ x: -10 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          />
          {/* Snout */}
          <motion.ellipse
            cx="232"
            cy="102"
            rx="18"
            ry="12"
            fill="#6b3fa0"
            animate={{ x: [0, 3, 0, -2, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Nose */}
          <motion.circle
            cx="248"
            cy="100"
            r="5"
            fill="var(--color-secondary)"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          {/* Eye */}
          <circle cx="208" cy="88" r="4" fill="white" />
          <circle cx="209" cy="88" r="2" fill="#1a1a2e" />
          {/* Ear */}
          <motion.path
            d="M185 75 Q175 50 190 60 Q200 68 195 80Z"
            fill="#3d1f5c"
            animate={{ rotate: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "190px 75px" }}
          />
          {/* Tail */}
          <motion.path
            d="M70 120 Q45 90 55 70"
            stroke="var(--color-primary)"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            animate={{ d: ["M70 120 Q45 90 55 70", "M70 120 Q40 85 60 65", "M70 120 Q45 90 55 70"] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Front legs */}
          <line x1="160" y1="165" x2="155" y2="190" stroke="var(--color-primary)" strokeWidth="8" strokeLinecap="round" />
          <line x1="180" y1="165" x2="178" y2="190" stroke="var(--color-primary)" strokeWidth="8" strokeLinecap="round" />
          {/* Back legs */}
          <line x1="105" y1="162" x2="100" y2="190" stroke="var(--color-primary)" strokeWidth="8" strokeLinecap="round" />
          <line x1="120" y1="164" x2="118" y2="190" stroke="var(--color-primary)" strokeWidth="8" strokeLinecap="round" />
          {/* Ground line */}
          <motion.line
            x1="40"
            y1="192"
            x2="260"
            y2="192"
            stroke="var(--color-secondary)"
            strokeWidth="2"
            strokeDasharray="6 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          {/* Sniff marks */}
          <motion.g
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <circle cx="258" cy="92" r="2" fill="var(--color-secondary)" opacity="0.6" />
            <circle cx="265" cy="88" r="1.5" fill="var(--color-secondary)" opacity="0.4" />
            <circle cx="270" cy="95" r="1.5" fill="var(--color-secondary)" opacity="0.5" />
          </motion.g>
        </svg>
      </motion.div>

      <motion.h1
        className="mb-3 text-center font-heading text-6xl font-bold"
        style={{ color: "var(--color-primary)" }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        404
      </motion.h1>

      <motion.p
        className="mb-2 text-center text-xl font-medium text-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        This page has gone off-leash
      </motion.p>

      <motion.p
        className="mb-8 text-center text-sm text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65 }}
      >
        We sniffed everywhere but couldn&apos;t find what you&apos;re looking for.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex gap-3"
      >
        <Link
          href="/"
          className="rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          Back to Home
        </Link>
        <Link
          href="/search"
          className="rounded-lg border-2 px-6 py-2.5 text-sm font-semibold transition hover:bg-gray-50"
          style={{ borderColor: "var(--color-primary)", color: "var(--color-primary)" }}
        >
          Search
        </Link>
      </motion.div>
    </div>
  );
}
