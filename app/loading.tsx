"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        <svg
          width="160"
          height="130"
          viewBox="0 0 160 130"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Dog body */}
          <motion.ellipse
            cx="80"
            cy="75"
            rx="40"
            ry="24"
            fill="var(--color-primary)"
            animate={{ scaleY: [1, 1.04, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "80px 75px" }}
          />
          {/* Head - bobbing */}
          <motion.g
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <circle cx="115" cy="55" r="18" fill="var(--color-primary)" />
            {/* Snout */}
            <ellipse cx="132" cy="60" rx="10" ry="7" fill="#6b3fa0" />
            {/* Nose */}
            <circle cx="140" cy="58" r="3" fill="var(--color-secondary)" />
            {/* Eye */}
            <motion.g>
              <circle cx="118" cy="50" r="3" fill="white" />
              <circle cx="119" cy="50" r="1.5" fill="#1a1a2e" />
            </motion.g>
            {/* Ear */}
            <path d="M105 44 Q97 28 106 35 Q113 40 110 50Z" fill="#3d1f5c" />
          </motion.g>

          {/* Tail - wagging */}
          <motion.path
            d="M40 70 Q25 55 30 40"
            stroke="var(--color-primary)"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
            animate={{
              d: [
                "M40 70 Q20 50 30 35",
                "M40 70 Q35 45 22 38",
                "M40 70 Q20 50 30 35",
              ],
            }}
            transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Front legs - trotting */}
          <motion.line
            x1="95" y1="95" x2="90" y2="115"
            stroke="var(--color-primary)" strokeWidth="6" strokeLinecap="round"
            animate={{ x2: [90, 95, 90], y2: [115, 112, 115] }}
            transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.line
            x1="105" y1="94" x2="103" y2="115"
            stroke="var(--color-primary)" strokeWidth="6" strokeLinecap="round"
            animate={{ x2: [103, 98, 103], y2: [115, 112, 115] }}
            transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          />
          {/* Back legs - trotting */}
          <motion.line
            x1="60" y1="93" x2="55" y2="115"
            stroke="var(--color-primary)" strokeWidth="6" strokeLinecap="round"
            animate={{ x2: [55, 60, 55], y2: [115, 112, 115] }}
            transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          />
          <motion.line
            x1="70" y1="94" x2="68" y2="115"
            stroke="var(--color-primary)" strokeWidth="6" strokeLinecap="round"
            animate={{ x2: [68, 63, 68], y2: [115, 112, 115] }}
            transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Ground dots - moving to simulate walking */}
          <motion.g
            animate={{ x: [0, -30] }}
            transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
          >
            {[0, 20, 40, 60, 80, 100, 120, 140, 160, 180].map((x) => (
              <circle key={x} cx={x} cy="118" r="1" fill="var(--color-secondary)" opacity="0.5" />
            ))}
          </motion.g>
        </svg>
      </motion.div>

      <motion.div
        className="mt-6 flex items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <span className="text-sm font-medium text-gray-400">Fetching</span>
        <motion.span
          className="flex gap-0.5"
          style={{ color: "var(--color-primary)" }}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="text-lg font-bold"
              animate={{ opacity: [0.2, 1, 0.2], y: [0, -3, 0] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            >
              .
            </motion.span>
          ))}
        </motion.span>
      </motion.div>
    </div>
  );
}
