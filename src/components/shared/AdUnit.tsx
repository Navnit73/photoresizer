import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

type AdType = 'header' | 'blog' | 'sidebar' | 'in-article' | 'multiplex';

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

/**
 * Per-placement ad configuration matching AdSense slot definitions.
 *
 * All slots now use responsive display:block + fullWidthResponsive so
 * they render correctly on every screen size (mobile, tablet, desktop).
 * The previous header/blog slots used fixed 728×90 inline-block, which
 * caused zero impressions on screens narrower than 728 px.
 */
const AD_CONFIG: Record<AdType, {
  slot: string;
  style: React.CSSProperties;
  format: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  fullWidthResponsive: boolean;
  layout?: string;
  layoutKey?: string;
}> = {
  header: {
    slot: '9972099494',
    style: { display: 'block' },
    format: 'auto',
    fullWidthResponsive: true,
  },
  blog: {
    slot: '9132763063',
    style: { display: 'block' },
    format: 'auto',
    fullWidthResponsive: true,
  },
  sidebar: {
    slot: '7120906578',
    style: { display: 'block' },
    format: 'auto',
    fullWidthResponsive: true,
  },
  'in-article': {
    slot: '7120906578',
    style: { display: 'block', textAlign: 'center' as const },
    format: 'fluid',
    fullWidthResponsive: true,
    layout: 'in-article',
  },
  multiplex: {
    slot: '7120906578',
    style: { display: 'block' },
    format: 'autorelaxed',
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
  const containerRef = useRef<HTMLDivElement>(null);
  const adRef = useRef<HTMLModElement>(null);
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const pushedRef = useRef(false);

  // Resolve config from type preset or manual props
  const cfg = type ? AD_CONFIG[type] : null;
  const resolvedSlot   = cfg ? cfg.slot   : slotId;
  const resolvedStyle  = cfg ? cfg.style  : style;
  const resolvedFormat = cfg ? (cfg.format as any) : format;
  const resolvedFwr    = cfg ? cfg.fullWidthResponsive : true;
  const resolvedLayout = cfg?.layout;
  const resolvedLayoutKey = cfg?.layoutKey || layoutKey;

  // Reset pushed state on route change so ads can re-initialize
  useEffect(() => {
    pushedRef.current = false;
  }, [location.pathname]);

  // IntersectionObserver: only mark visible when ad container enters viewport.
  // This improves viewability scores (higher CPM) and Core Web Vitals.
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // start loading 200px before visible
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [location.pathname]);

  // Push the ad once the container is visible and AdSense script is loaded
  useEffect(() => {
    if (!isVisible || pushedRef.current) return;

    const pushAd = () => {
      try {
        if (!adRef.current) return;

        // Already initialized by AdSense — don't double-push
        if (adRef.current.getAttribute('data-adsbygoogle-status')) {
          pushedRef.current = true;
          return;
        }

        if (typeof window !== 'undefined' && window.adsbygoogle !== undefined) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          pushedRef.current = true;
        }
      } catch (e) {
        console.error('AdSense error:', e);
      }
    };

    // If AdSense is already loaded, push immediately
    if (typeof window !== 'undefined' && window.adsbygoogle !== undefined) {
      pushAd();
      return;
    }

    // Otherwise listen for the custom event dispatched when AdSense loads
    const onAdsenseReady = () => pushAd();
    window.addEventListener('adsense-ready', onAdsenseReady);

    // Fallback: also poll in case the event was missed (e.g. script loaded before this component)
    let retryCount = 0;
    const maxRetries = 30;
    const timer = setInterval(() => {
      retryCount++;
      if (typeof window !== 'undefined' && window.adsbygoogle !== undefined) {
        pushAd();
        clearInterval(timer);
      } else if (retryCount >= maxRetries) {
        clearInterval(timer);
      }
    }, 300);

    return () => {
      window.removeEventListener('adsense-ready', onAdsenseReady);
      clearInterval(timer);
    };
  }, [isVisible, location.pathname]);

  return (
    <div
      ref={containerRef}
      key={`${location.pathname}-${resolvedSlot}-${type || 'manual'}`}
      className={`ad-container ${className}`}
    >
      {isVisible && (
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={resolvedStyle}
          data-ad-client="ca-pub-2980455227951378"
          data-ad-slot={resolvedSlot}
          data-ad-format={resolvedFormat}
          data-full-width-responsive={resolvedFwr ? 'true' : 'false'}
          {...(resolvedLayout ? { 'data-ad-layout': resolvedLayout } : {})}
          {...(resolvedLayoutKey ? { 'data-ad-layout-key': resolvedLayoutKey } : {})}
        ></ins>
      )}
    </div>
  );
};

export default AdUnit;
