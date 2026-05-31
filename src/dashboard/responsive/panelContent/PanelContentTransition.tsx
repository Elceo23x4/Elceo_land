/**
 * PanelContentTransition.tsx
 *
 * V1B-8B: Wraps panel section content in a subtle framer-motion fade/slide
 * transition when switching tabs. Uses useReducedMotion for accessibility.
 */

import type { ReactNode } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export interface PanelContentTransitionProps {
  /** Unique key for the current section (e.g. `${panelId}-${mode}`) */
  sectionKey: string;
  children: ReactNode;
}

export default function PanelContentTransition({ sectionKey, children }: PanelContentTransitionProps) {
  const reduceMotion = useReducedMotion();

  const variants = reduceMotion
    ? {
        initial: { opacity: 1, y: 0 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 1, y: 0 },
      }
    : {
        initial: { opacity: 0, y: 4 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -3 },
      };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={sectionKey}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={reduceMotion ? { duration: 0 } : { duration: 0.18, ease: "easeOut" }}
        className="dashboard-panel-content-transition"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
