import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface AdUnitProps {
  slotId?: string; // Optional for now, but good to have
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  layoutKey?: string; // For In-feed ads
  className?: string;
  style?: React.CSSProperties;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const AdUnit = ({
  slotId = '8924610486', // Default slot, can be overridden
  format = 'auto',
  layoutKey,
  className = '',
  style = { display: 'block' },
}: AdUnitProps) => {
  const adRef = useRef<HTMLModElement>(null);
  const location = useLocation();

  useEffect(() => {
    try {
      if (adRef.current && !adRef.current.getAttribute('data-adsbygoogle-status')) {
        // Safely access and initialize adsbygoogle
        const adsbygoogle = (window as any).adsbygoogle = (window as any).adsbygoogle || [];
        adsbygoogle.push({});
      }
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, [location.pathname]);

  return (
    <div className={`ad-container my-4 text-center ${className}`}>
      <ins
        key={location.pathname}
        ref={adRef}
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-2980455227951378"
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
        {...(layoutKey ? { 'data-ad-layout-key': layoutKey } : {})}
      ></ins>
    </div>
  );
};

export default AdUnit;
