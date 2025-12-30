import { FileImage, Shield, Zap, Globe, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden"
    >
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 gradient-hero" />
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="relative container py-8 md:py-10">
        <div className="flex flex-col gap-6">
          {/* Main Header Content */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Logo and Title */}
            <div className="flex items-center gap-4">
              <motion.div 
                initial={{ scale: 0.8, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="relative"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/30">
                  <FileImage className="w-9 h-9 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-md">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                </div>
              </motion.div>
              
              <div className="text-white">
                <motion.h1 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl md:text-3xl font-bold font-heading tracking-tight"
                >
                  Government Form Photo Editor
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-white/80 text-sm md:text-base mt-1"
                >
                  Resize, Crop & Convert Photos for Official Documents
                </motion.p>
              </div>
            </div>
            
            {/* Feature Badges */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white text-sm">
                <Shield className="w-4 h-4" />
                <span className="font-medium">100% Private</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white text-sm">
                <Zap className="w-4 h-4" />
                <span className="font-medium">Instant Processing</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white text-sm">
                <Globe className="w-4 h-4" />
                <span className="font-medium">Works Offline</span>
              </div>
            </motion.div>
          </div>
          
          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center md:text-left"
          >
            <p className="text-white/70 text-xs md:text-sm max-w-2xl">
              Perfect for Passport, Aadhaar, PAN Card, Visa, Job Applications & more. 
              All processing happens in your browser — your photos never leave your device.
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" preserveAspectRatio="none">
          <path d="M0 40V20C200 0 400 30 600 20C800 10 1000 35 1200 20V40H0Z" fill="hsl(var(--background))" />
        </svg>
      </div>
    </motion.header>
  );
}
