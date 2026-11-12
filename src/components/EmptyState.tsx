import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center text-center py-20 px-6"
    >
      {icon && (
        <div className="text-oracle-text-muted mb-6 [&>svg]:w-12 [&>svg]:h-12">
          {icon}
        </div>
      )}

      <h3 className="font-serif text-xl text-oracle-text mb-3">
        {title}
      </h3>

      <p className="text-oracle-text-dim text-sm max-w-sm leading-relaxed mb-8">
        {description}
      </p>

      {action && (
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={action.onClick}
          className="font-sans text-xs tracking-wider uppercase px-6 py-3 rounded-lg bg-oracle-amber/10 text-oracle-amber border border-oracle-amber/20 hover:bg-oracle-amber/20 hover:border-oracle-amber/40 transition-all duration-300 cursor-pointer"
        >
          {action.label}
        </motion.button>
      )}
    </motion.div>
  );
}
