import { useState, useEffect } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Bookmark, X, Sparkles, Heart } from 'lucide-react'

export function BookmarkPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    // Check if popup was already shown in this session
    const shown = sessionStorage.getItem('bookmarkPopupShown')
    
    if (!shown) {
      // Show popup after 10 seconds
      const timer = setTimeout(() => {
        setIsOpen(true)
        setHasShown(true)
        sessionStorage.setItem('bookmarkPopupShown', 'true')
      }, 10000)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleBookmark = () => {
    // Try to bookmark the page
    if (window.sidebar && window.sidebar.addPanel) {
      // Firefox
      window.sidebar.addPanel(
        'Photo Resizer',
        'https://www.photoresizer.co.in/',
        ''
      )
    } else if (window.external && 'AddFavorite' in window.external) {
      // IE
      window.external.AddFavorite(
        'https://www.photoresizer.co.in/',
        'Photo Resizer'
      )
    } else {
      // For modern browsers, show instructions
      alert(
        'Please bookmark this page manually:\n\n' +
        '• Press Ctrl+D (Windows/Linux) or Cmd+D (Mac)\n' +
        '• Or click the star icon in your browser\'s address bar'
      )
    }
    setIsOpen(false)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md border-0 p-0 overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-full p-1 hover:bg-white/50 transition-colors z-10"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>

        <div className="relative p-8 text-center">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-4 left-8 animate-pulse">
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </div>
            <div className="absolute top-12 right-12 animate-pulse delay-150">
              <Sparkles className="w-4 h-4 text-pink-400" />
            </div>
            <div className="absolute bottom-8 left-12 animate-pulse delay-300">
              <Sparkles className="w-5 h-5 text-blue-400" />
            </div>
          </div>

          {/* Main content */}
          <div className="relative z-10">
            {/* Icon */}
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-50 animate-pulse" />
                <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-full">
                  <Bookmark className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
              Enjoying Photo Resizer?
            </h2>

            {/* Description */}
            <p className="text-gray-700 mb-2 leading-relaxed">
              Save time on your next visit!
            </p>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              Bookmark our site for quick and easy access to professional photo editing tools anytime.
            </p>

            {/* Features */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 mb-6 space-y-2">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>100% Free Forever</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span>No Registration Required</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                <span>Lightning Fast Processing</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={handleBookmark}
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all"
              >
                <Bookmark className="w-4 h-4 mr-2" />
                Bookmark Now
              </Button>
              <Button
                onClick={handleClose}
                size="lg"
                variant="outline"
                className="bg-white/80 backdrop-blur-sm hover:bg-white border-gray-200"
              >
                Maybe Later
              </Button>
            </div>

            {/* Footer note */}
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
              <Heart className="w-3 h-3 text-red-400 fill-red-400" />
              <span>Made with love for photographers</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Add this to your global CSS or tailwind config for the animation delays
// @layer utilities {
//   .delay-150 {
//     animation-delay: 150ms;
//   }
//   .delay-300 {
//     animation-delay: 300ms;
//   }
// }