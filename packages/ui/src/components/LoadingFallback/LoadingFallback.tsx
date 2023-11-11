'use client';

import React, { useEffect, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

type LoadingFallbackProps<T> = {
  children: (data: T) => React.ReactNode;
  data: T | null;
};

export const LoadingFallback = <T extends object>({ children, data }: LoadingFallbackProps<T>) => {
  const [isDelayComplete, setIsDelayComplete] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsDelayComplete(true);
    }, 200);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {!isDelayComplete ? null : data === null ? (
        <motion.div animate={{ opacity: 1 }} exit={{ opacity: 0 }} initial={{ opacity: 0 }} key="loading">
          <p>Loading...</p>
        </motion.div>
      ) : (
        <motion.div animate={{ opacity: 1 }} exit={{ opacity: 0 }} initial={{ opacity: 0 }} key="callback">
          {children(data)}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
