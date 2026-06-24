'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface AnimatedSectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  addParticles?: boolean;
}

export function AnimatedSectionWrapper({
  children,
  className = '',
  id,
  addParticles = true,
}: AnimatedSectionWrapperProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax effect on scroll
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollProgress = 1 - Math.max(0, Math.min(1, (rect.top - window.innerHeight) / rect.height));
      
      if (sectionRef.current) {
        sectionRef.current.style.transform = `translateY(${scrollProgress * 20}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className={`relative ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false, margin: '-200px' }}
    >
      {/* Animated gradient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 animate-pulse" />
      </div>

      {/* Floating glassmorphic accent elements */}
      {addParticles && (
        <>
          <motion.div
            className="pointer-events-none absolute -left-32 top-1/4 size-64 rounded-full bg-gradient-to-r from-cyan-400/10 to-transparent blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="pointer-events-none absolute -right-32 bottom-1/4 size-64 rounded-full bg-gradient-to-l from-purple-400/10 to-transparent blur-3xl"
            animate={{
              x: [0, -30, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 5,
            }}
          />
        </>
      )}

      {children}
    </motion.section>
  );
}
