"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative mb-8"
      >
        {/* Tangled leash dog SVG */}
        <svg
          width="260"
          height="210"
          viewBox="0 0 260 210"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          {/* Tangled leash behind dog */}
          <motion.path
            d="M70 60 Q100 30 130 55 Q160 80 120 100 Q80 120 110 90 Q140 60 100 50"
            stroke="var(--color-secondary)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="200"
            initial={{ strokeDashoffset: 200 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1.5, delay: 0.3 }}
          />

          {/* Body */}
          <motion.ellipse
            cx="130"
            cy="130"
            rx="55"
            ry="35"
            fill="var(--color-primary)"
            animate={{ rotate: [0, -2, 0, 2, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "130px 130px" }}
          />
          {/* Head - tilted confused */}
          <motion.g
            animate={{ rotate: [0, 15, 0, -5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "170px 100px" }}
          >
            <circle cx="175" cy="100" r="25" fill="var(--color-primary)" />
            {/* Snout */}
            <ellipse cx="198" cy="107" rx="14" ry="9" fill="#6b3fa0" />
            {/* Nose */}
            <circle cx="210" cy="105" r="4" fill="#1a1a2e" />
            {/* Eyes - worried */}
            <circle cx="178" cy="93" r="4" fill="white" />
            <circle cx="179" cy="94" r="2" fill="#1a1a2e" />
            {/* Eyebrow - worried expression */}
            <line x1="173" y1="86" x2="183" y2="84" stroke="#3d1f5c" strokeWidth="2.5" strokeLinecap="round" />
            {/* Ear - floppy */}
            <path d="M162 82 Q150 60 158 68 Q168 74 165 88Z" fill="#3d1f5c" />
          </motion.g>

          {/* Tail - drooping */}
          <motion.path
            d="M75 125 Q55 130 50 145"
            stroke="var(--color-primary)"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
            animate={{ d: ["M75 125 Q55 130 50 145", "M75 125 Q58 132 52 148", "M75 125 Q55 130 50 145"] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          {/* Front legs */}
          <line x1="145" y1="160" x2="140" y2="188" stroke="var(--color-primary)" strokeWidth="7" strokeLinecap="round" />
          <line x1="160" y1="158" x2="158" y2="188" stroke="var(--color-primary)" strokeWidth="7" strokeLinecap="round" />
          {/* Back legs */}
          <line x1="100" y1="158" x2="95" y2="188" stroke="var(--color-primary)" strokeWidth="7" strokeLinecap="round" />
          <line x1="115" y1="160" x2="112" y2="188" stroke="var(--color-primary)" strokeWidth="7" strokeLinecap="round" />

          {/* Dizzy stars */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "175px 75px" }}
          >
            <motion.text x="155" y="72" fontSize="14" fill="var(--color-secondary)" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }}>
              &#x2733;
            </motion.text>
            <motion.text x="185" y="65" fontSize="10" fill="var(--color-secondary)" animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              &#x2733;
            </motion.text>
            <motion.text x="195" y="82" fontSize="12" fill="var(--color-secondary)" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.5, repeat: Infinity }}>
              &#x2733;
            </motion.text>
          </motion.g>

          {/* Ground */}
          <line x1="30" y1="192" x2="240" y2="192" stroke="var(--color-secondary)" strokeWidth="2" strokeDasharray="6 4" />
        </svg>
      </motion.div>

      <motion.h1
        className="mb-3 text-center font-heading text-4xl font-bold"
        style={{ color: "var(--color-primary)" }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Something went wrong
      </motion.h1>

      <motion.p
        className="mb-8 text-center text-sm text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Our pup got tangled up. Let&apos;s try untangling things.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex gap-3"
      >
        <button
          onClick={reset}
          className="rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          Try Again
        </button>
        <a
          href="/"
          className="rounded-lg border-2 px-6 py-2.5 text-sm font-semibold transition hover:bg-gray-50"
          style={{ borderColor: "var(--color-primary)", color: "var(--color-primary)" }}
        >
          Back to Home
        </a>
      </motion.div>
    </div>
  );
}
