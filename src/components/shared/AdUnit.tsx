import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

type AdType = 'header' | 'blog' | 'sidebar';

interface AdUnitProps {
  /** High-level placement type. When set, overrides slotId/format/style. */
  type?: AdType;
  /** Fallback manual slot ID (used only when `type` is not provided). */
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

/** Per-placement ad configuration matching the AdSense slot definitions. */
const AD_CONFIG: Record<AdType, {
  slot: string;
  style: React.CSSProperties;
  format: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  fullWidthResponsive: boolean;
}> = {
  header: {
    slot: '9972099494',
    style: { display: 'inline-block', width: '728px', height: '90px' },
    format: 'horizontal',
    fullWidthResponsive: false,
  },
  blog: {
    slot: '9132763063',
    style: { display: 'inline-block', width: '728px', height: '90px' },
    format: 'horizontal',
    fullWidthResponsive: false,
  },
  sidebar: {
    slot: '7120906578',
    style: { display: 'block' },
    format: 'auto',
    fullWidthResponsive: true,
  },
};

const AdUnit = ({
  type,
  slotId = '9972099494',
  format = 'auto',
  layoutKey,
  className = '',
  style = { display: 'block' },
}: AdUnitProps) => {
  const adRef = useRef<HTMLModElement>(null);
  const location = useLocation();

  // Resolve config from type preset or manual props
  const cfg = type ? AD_CONFIG[type] : null;
  const resolvedSlot   = cfg ? cfg.slot   : slotId;
  const resolvedStyle  = cfg ? cfg.style  : style;
  const resolvedFormat = cfg ? cfg.format : format;
  const resolvedFwr    = cfg ? cfg.fullWidthResponsive : true;

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
        style={resolvedStyle}
        data-ad-client="ca-pub-2980455227951378"
        data-ad-slot={resolvedSlot}
        data-ad-format={resolvedFormat}
        data-full-width-responsive={resolvedFwr ? 'true' : 'false'}
        {...(layoutKey ? { 'data-ad-layout-key': layoutKey } : {})}
      ></ins>
    </div>
  );
};

export default AdUnit;
