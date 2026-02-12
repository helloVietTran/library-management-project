'use client';

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashScreen() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/60"
        >
          <>
            <motion.div
              initial={{ scale: 1.6, rotate: 270, opacity: 0.25 }}
              animate={{
                scale: 1,
                rotate: 0,
                opacity: 1,
                borderRadius: ['25%', '50%', '25%'],
              }}
              transition={{
                ease: 'easeInOut',
                duration: 1.2,
              }}
              className="w-[100px] h-[100px] absolute border opacity-24"
              style={{ borderColor: '#445ebf' }} 
            />

            <motion.div
              initial={{ scale: 1, rotate: 0, opacity: 1 }}
              animate={{
                scale: 1.2,
                rotate: 270,
                opacity: 0.25,
                borderRadius: ['25%', '50%', '25%'],
              }}
              transition={{
                ease: 'easeInOut',
                duration: 1.2,
              }}
              className="w-[120px] h-[120px] absolute border-[6px] opacity-24"
              style={{ borderColor: '#5a73d1' }} 
            />
          </>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
