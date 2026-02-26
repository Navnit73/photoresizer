import { useState, useEffect } from "react";
import { ExternalLink, Tag } from "lucide-react";

// The full pool of 7 Amazon affiliate links
const ADS = [
  {
    id: 1,
    title: "Nike Sneaker Anthracite White",
    description: "Elevate your everyday style with these premium Nike sneakers. Featuring a sleek Anthracite, White, and Black colorway for versatile, all-day comfort.",
    image: "/amazon-ad-sneaker.png",
    url: "https://www.amazon.in/Nike-Sneaker-Anthracite-White-Black/dp/B0DBVVS6MH?_encoding=UTF8&content-id=amzn1.sym.4505c6e5-478f-4db5-9c4e-be1fbfff9619&dib=eyJ2IjoiMSJ9.8TPrSw53n4nzs0Fu5Ok1hC1NfCwP2gb5awbAJjNf4N0v6mkEatfLbZCH71xgSay84VVobBDltx3nOT3XJhcjTucFJmSp9xe0jQ1CxF_GYk4nBESRN6tki2YvfI3HcBkQscHOue_lshiujaPmAHFaCmNEKCRoLp5he3_zD5F6jYcbHebraGzKY2SM1mepDYy2vxk6sq0EVM73lJ1opCxS7Xb4jPUmV6u2OEH80DqRbLr9x7gmukxlZPsRfKXuJ5FfgwTwyxYZSPNh-zD2xzn1Kvt9wxBwZn9cmbv6GS6glw8.byhdmIbaHEKlIE4Bd3V215pmpLbWR570nNFR5augwzA&dib_tag=se&pd_rd_r=28398e74-d91d-4e71-b9f2-b0f1c3724d69&pd_rd_w=FDRW3&pd_rd_wg=dncMU&qid=1772115074&refinements=p_72%3A1318477031%2Cp_36%3A60000-%2Cp_n_feature_nineteen_browse-bin%3A11301363031&rnid=11301362031&s=apparel&sr=1-9&th=1&psc=1&linkCode=ll2&tag=photoresizer7-21&linkId=a9ffac093efaf7759f3ca5b928163157&ref_=as_li_ss_tl",
    cta: "Shop on Amazon",
    badge: "Deal"
  },
  {
    id: 2,
    title: "OnePlus Wireless Earphones",
    description: "Experience premium sound with long playtime and dual-device connectivity. Fast charging directly on Amazon India.",
    image: "/amazon-ad-earphones.png",
    url: "https://www.amazon.in/OnePlus-Playback-Translation-Dual-Device-Connectivity/dp/B0FMDL81GS?_encoding=UTF8&pd_rd_w=UNUT3&content-id=amzn1.sym.3dfcdfa9-5b81-4b68-a3f1-b42adf3515e9&pf_rd_p=3dfcdfa9-5b81-4b68-a3f1-b42adf3515e9&pf_rd_r=66XVH59E9FA21N5SEMX5&pd_rd_wg=BztFJ&pd_rd_r=683b8e9b-1c80-4b4c-9ef4-e60dae03630e&th=1&linkCode=ll2&tag=photoresizer7-21&linkId=704d7394db5bbfc184e3cb63cbc3d74b&ref_=as_li_ss_tl",
    cta: "View Offer",
    badge: "Trending"
  },
  {
    id: 3,
    title: "Premium Glass Flask Bottles",
    description: "Stay hydrated in style with these insulated vacuum flasks. Featuring pastel colors and a convenient carrying strap.",
    image: "/amazon-ad-flasks.png",
    url: "https://www.amazon.in/Premium-Glass-Bottle-Protective-Sleeve/dp/B0FSFB2K1W?_encoding=UTF8&pd_rd_w=KiNLH&content-id=amzn1.sym.4d22ccf9-76d2-40f7-8603-47f08d124c7f&pf_rd_p=4d22ccf9-76d2-40f7-8603-47f08d124c7f&pf_rd_r=66XVH59E9FA21N5SEMX5&pd_rd_wg=BztFJ&pd_rd_r=683b8e9b-1c80-4b4c-9ef4-e60dae03630e&th=1&linkCode=ll2&tag=photoresizer7-21&linkId=98eb040aefc1024775eaf2cb4f7ebfd0&ref_=as_li_ss_tl",
    cta: "Shop Now",
    badge: "Popular"
  },
  {
    id: 4,
    title: "UPSC General Studies Book",
    description: "Crack the exam with this authentic summary and competitive practice guide. Essential for government preparation.",
    image: "/amazon-ad-upsc-book.png",
    url: "https://www.amazon.in/Authentic-Summary-Services-Competitive-General/dp/9362257610?crid=1N4BD1HATHGFU&dib=eyJ2IjoiMSJ9.0-YKr2FuJnKqxioFU_6DFaUoeYeDBpGsITXq-s7pJGyhtKG2XontQk1L-ov64V7u5ZyonXQz26aD64ocnhMa7qlnH_AS6qIYc0nIooFqyLjyUU8lWlkJHH5Hp01woTWkBy4fNVFF2voWrrbNQzW5teU-IqaftUaeKyHQ0S2HQdAosE8xkFkzTM8Kv_mW-mf3X_wTSbZ9MnxVD33Gt61ka5ZNNvO1FnhZJny8YXIzbTE.hzDOGE2lKcKK6enp3N6pXVmSg3buiWnM1VGghtrSh10&dib_tag=se&keywords=upsc+book&qid=1772116335&sprefix=upsc+bo%2Caps%2C495&sr=8-3&linkCode=ll2&tag=photoresizer7-21&linkId=74fd45339b6060365d0c4cd601be203c&ref_=as_li_ss_tl",
    cta: "Buy on Amazon",
    badge: "Books"
  },
  {
    id: 5,
    title: "Skinn by Titan Perfume",
    description: "Long-lasting luxury fragrance by Skinn. Elevate your presence with just a single spray of this premium scent.",
    image: "/amazon-ad-perfume.png",
    url: "https://www.amazon.in/Skinn-Titan-Long-Lasting-perfumes-fragrance/dp/B095YYXNYT?crid=336RVO2U29LU9&dib=eyJ2IjoiMSJ9.Y51m-NQB8dOuZ64ppct17C6BqmbH8Cs7cP__dlHGgTAMACBDNP68y91fNpIR72YUCUYFaaFr5_Nyd34XLd3OmPxHMbKjHODnSybdmB4TjxSENVxrpuEQm_UG8zDeOtrY0taKWYv3xMTGAER-istc0E4EIei6v5lv_zUif4-spOlyMmSaVf25Q5jby1ryiT_BDXFUaNpaIa7LBQ2Ot856rce1XyGzH4Rkt7EtF8w6CpTMuVz-CDg7bvV3428vHHneIPngGZiFcUEk7Qqk5XrD1FTK1IcDs28Yni8rjoH73YI.4pPXd6bN5dWFWU1wakVwGFEUK4Xinn0qBLF4drVd53A&dib_tag=se&keywords=perfume&qid=1772116404&sprefix=perfu%2Caps%2C460&sr=8-26&linkCode=ll2&tag=photoresizer7-21&linkId=281fd23f51664f0eff1ab392388cf3f0&ref_=as_li_ss_tl",
    cta: "Shop Now",
    badge: "Sale"
  },
  {
    id: 6,
    title: "Shop Millions of Products",
    description: "Discover incredible deals on electronics, fashion, home essentials, and more with fast, reliable delivery. Shop Amazon India.",
    image: "/amazon-shopping-cart.png",
    url: "https://www.amazon.in?&linkCode=ll2&tag=photoresizer7-21&linkId=2df0bcf6d3e590b757cd81b8d0c863b0&ref_=as_li_ss_tl",
    cta: "Explore Amazon",
    badge: "Sponsored"
  },
  {
    id: 7,
    title: "Running Low? Buy It Again",
    description: "Easily reorder your past purchases, daily essentials, and favorite items securely with just one click on Amazon.",
    image: "/amazon-shopping-cart.png",
    url: "https://www.amazon.in/gp/buyagain?ie=UTF8&ats=eyJleHBsaWNpdENhbmRpZGF0ZXMiOiJCMEM3Q1FIN1lCIiwiY3VzdG9tZXJJZCI6IkEzRDJVQ1RSTlRSVDdNIn0%3D&pd_rd_w=eyk1Z&content-id=amzn1.sym.b49ced08-9795-42d9-9f90-9b120c460d79&pf_rd_p=b49ced08-9795-42d9-9f90-9b120c460d79&pf_rd_r=R4W8JFCHS7P5EK0MDH2N&pd_rd_wg=OO6oP&pd_rd_r=e52915e5-7b2d-42e6-ab6d-386e231ff251&linkCode=ll2&tag=photoresizer7-21&linkId=e98c76e3768fccf02aef5f9984385856&ref_=as_li_ss_tl",
    cta: "View Past Orders",
    badge: "Sponsored"
  }
];

type AdVariant = 'carousel' | 'banner';

interface AmazonAdProps {
  variant?: AdVariant;
  className?: string;
  startIndex?: number; // Optional offset so multiple banners don't always align identically
}

export function AmazonAd({ variant = 'carousel', className = '', startIndex = 0 }: AmazonAdProps) {
  const [currentAdIndex, setCurrentAdIndex] = useState(startIndex % ADS.length);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // 8 second interval logic
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ADS.length);
        setIsFading(false);
      }, 400); // quick fade transition
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const currentAd = ADS[currentAdIndex];

  // ==========================================
  // CAROUSEL VARIANT (Main Homepage Display)
  // ==========================================
  if (variant === 'carousel') {
    return (
      <div className={`w-full max-w-4xl mx-auto my-6 px-2 sm:px-4 ${className}`}>
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col sm:flex-row items-center gap-4 p-4 relative group transition-shadow hover:shadow-md">
          
          <div className="absolute top-3 right-3 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold px-2 py-0.5 rounded-md tracking-wider z-10">
            {currentAd.badge}
          </div>

          <div className={`w-full sm:w-1/3 flex-shrink-0 flex justify-center bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
            <img 
              src={currentAd.image} 
              alt={currentAd.title} 
              className="w-48 h-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300 min-h-[140px] max-h-[160px]"
            />
          </div>

          <div className={`w-full sm:w-2/3 flex flex-col justify-center space-y-3 transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
            <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white leading-tight pr-16 min-h-[28px]">
              {currentAd.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 min-h-[60px]">
              {currentAd.description}
            </p>
            
            <div className="pt-2">
              <a 
                href={currentAd.url}
                target="_blank" 
                rel="noopener noreferrer nofollow"
                className="inline-flex items-center justify-center gap-2 bg-[#FF9900] hover:bg-[#e38800] text-slate-900 font-semibold py-2.5 px-6 rounded-lg transition-colors w-full sm:w-auto text-sm"
                title={currentAd.title}
              >
                {currentAd.cta}
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Dots */}
          <div className="absolute bottom-3 right-4 flex gap-1.5 z-10">
            {ADS.map((_, index) => (
              <div 
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentAdIndex 
                    ? 'w-4 bg-[#FF9900]' 
                    : 'w-1.5 bg-slate-300 dark:bg-slate-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // BANNER VARIANT (Header / Footer Strip)
  // ==========================================
  return (
    <div className={`w-full bg-[#232F3E] text-white relative flex justify-center py-2 px-4 transition-colors hover:bg-[#131a22] ${className}`}>
      <div className={`w-full max-w-6xl flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-sm transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* Banner Tag */}
        <div className="hidden sm:flex items-center gap-1.5 text-[#FF9900] font-bold text-xs uppercase tracking-wider whitespace-nowrap">
          <Tag className="w-3.5 h-3.5" />
          Amazon Deal
        </div>

        {/* Content */}
        <div className="flex items-center gap-3 overflow-hidden w-full sm:w-auto justify-center">
          <img 
            src={currentAd.image} 
            alt="Ad thumbnail" 
            className="w-10 h-10 rounded object-contain bg-white/10 hidden sm:block p-1 shrink-0"
          />
          <div className="flex flex-col sm:flex-row sm:items-center text-center sm:text-left truncate">
            <span className="font-semibold text-white/90 truncate max-w-[200px] md:max-w-none mr-2">
              {currentAd.title}
            </span>
            <span className="text-white/60 hidden md:inline truncate max-w-[300px] lg:max-w-none">
              — {currentAd.description}
            </span>
          </div>
        </div>

        {/* CTA */}
        <a 
          href={currentAd.url}
          target="_blank" 
          rel="noopener noreferrer nofollow"
          className="whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 bg-[#FF9900] hover:bg-[#e38800] text-slate-900 font-semibold px-4 py-1.5 rounded text-xs transition-colors"
        >
          {currentAd.cta}
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

      </div>
    </div>
  );
}
