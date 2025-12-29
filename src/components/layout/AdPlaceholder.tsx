import { motion } from 'framer-motion';

interface AdPlaceholderProps {
  position: 'top' | 'sidebar' | 'bottom';
}

export function AdPlaceholder({ position }: AdPlaceholderProps) {
  const sizes = {
    top: 'h-20 w-full',
    sidebar: 'w-[300px] h-[250px]',
    bottom: 'h-24 w-full',
  };

  const labels = {
    top: 'Advertisement - 728×90',
    sidebar: 'Ad Space - 300×250',
    bottom: 'Advertisement - 728×90',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className={`ad-placeholder rounded-lg flex items-center justify-center ${sizes[position]}`}
    >
      <span className="text-xs text-muted-foreground">{labels[position]}</span>
    </motion.div>
  );
}
