import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface AdUnitProps {
  slotId?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  layoutKey?: string;
  className?: string;
  style?: React.CSSProperties;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const AdUnit = ({
  slotId = '8924610486',
  format = 'auto',
  layoutKey,
  className = '',
  style = { display: 'block' },
}: AdUnitProps) => {
  const adRef = useRef<HTMLModElement>(null);
  const location = useLocation();

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 20; // retry up to ~2s for deferred script

    const pushAd = () => {
      try {
        if (!adRef.current) return;

        // Already initialized by AdSense — don't double-push
        if (adRef.current.getAttribute('data-adsbygoogle-status')) return;

        if (typeof window !== 'undefined' && window.adsbygoogle !== undefined) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } else if (retryCount < maxRetries) {
          // AdSense script is deferred — wait and retry
          retryCount++;
          setTimeout(pushAd, 100);
        } else {
          console.warn('AdSense: script did not load in time.');
        }
      } catch (e) {
        console.error('AdSense error:', e);
      }
    };

    pushAd();
  }, [location.pathname]);

  return (
    <div key={location.pathname} className={`ad-container my-4 text-center ${className}`}>
      <ins
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
