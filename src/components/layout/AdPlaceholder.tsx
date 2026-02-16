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
    <div
      className={`ad-placeholder rounded-lg flex items-center justify-center ${sizes[position]} animate-[fadeIn_0.5s_ease-out_0.5s_both]`}
    >
      <span className="text-xs text-muted-foreground">{labels[position]}</span>
    </div>
  );
}
