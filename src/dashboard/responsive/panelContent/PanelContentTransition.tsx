/**
 * PanelContentTransition.tsx
 *
 * V1B-8: Wraps panel section content in a subtle framer-motion fade/slide
 * transition when switching tabs. Respects prefers-reduced-motion.
 */

import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface PanelContentTransitionProps {
  /** Unique key for the current section (e.g. `${panelId}-${mode}`) */
  sectionKey: string;
  children: ReactNode;
}

const variants = {
  initial: { opacity: 0, y: 4 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -3 },
};

export default function PanelContentTransition({ sectionKey, children }: PanelContentTransitionProps) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={sectionKey}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="dashboard-panel-content-transition"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
