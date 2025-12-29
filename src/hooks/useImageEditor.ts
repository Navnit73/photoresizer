import { useCallback, useState } from 'react';
import { ImageState } from '@/types/editor';

const initialState: ImageState = {
  file: null,
  originalUrl: null,
  editedUrl: null,
  width: 0,
  height: 0,
  originalWidth: 0,
  originalHeight: 0,
  rotation: 0,
  backgroundColor: '#FFFFFF',
  quality: 90,
  format: 'jpeg',
  fileSize: 0,
  originalFileSize: 0,
};

export function useImageEditor() {
  const [imageState, setImageState] = useState<ImageState>(initialState);
  const [isProcessing, setIsProcessing] = useState(false);

  const loadImage = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    
    img.onload = () => {
      setImageState({
        file,
        originalUrl: url,
        editedUrl: url,
        width: img.width,
        height: img.height,
        originalWidth: img.width,
        originalHeight: img.height,
        rotation: 0,
        backgroundColor: '#FFFFFF',
        quality: 90,
        format: 'jpeg',
        fileSize: file.size,
        originalFileSize: file.size,
      });
    };
    
    img.src = url;
  }, []);

  const updateDimensions = useCallback((width: number, height: number, maintainRatio: boolean = false) => {
    setImageState(prev => {
      if (maintainRatio && prev.originalWidth && prev.originalHeight) {
        const ratio = prev.originalWidth / prev.originalHeight;
        if (width !== prev.width) {
          height = Math.round(width / ratio);
        } else {
          width = Math.round(height * ratio);
        }
      }
      return { ...prev, width, height };
    });
  }, []);

  const setRotation = useCallback((rotation: number) => {
    setImageState(prev => ({ ...prev, rotation: rotation % 360 }));
  }, []);

  const setBackgroundColor = useCallback((backgroundColor: string) => {
    setImageState(prev => ({ ...prev, backgroundColor }));
  }, []);

  const setQuality = useCallback((quality: number) => {
    setImageState(prev => ({ ...prev, quality }));
  }, []);

  const setFormat = useCallback((format: 'jpeg' | 'png' | 'webp') => {
    setImageState(prev => ({ ...prev, format }));
  }, []);

  const applyPreset = useCallback((width: number, height: number) => {
    setImageState(prev => ({ ...prev, width, height }));
  }, []);

  const processAndDownload = useCallback(async () => {
    if (!imageState.originalUrl) return;
    
    setIsProcessing(true);
    
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = imageState.originalUrl!;
      });

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      
      // Handle rotation
      const radians = (imageState.rotation * Math.PI) / 180;
      const isRotated90or270 = imageState.rotation === 90 || imageState.rotation === 270;
      
      canvas.width = isRotated90or270 ? imageState.height : imageState.width;
      canvas.height = isRotated90or270 ? imageState.width : imageState.height;
      
      // Fill background
      if (imageState.backgroundColor !== 'transparent') {
        ctx.fillStyle = imageState.backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      // Apply rotation and draw
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(radians);
      
      const drawWidth = isRotated90or270 ? imageState.height : imageState.width;
      const drawHeight = isRotated90or270 ? imageState.width : imageState.height;
      
      ctx.drawImage(
        img,
        -drawWidth / 2,
        -drawHeight / 2,
        drawWidth,
        drawHeight
      );
      
      // Export
      const mimeType = `image/${imageState.format}`;
      const quality = imageState.format === 'png' ? 1 : imageState.quality / 100;
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `edited-image.${imageState.format}`;
            a.click();
            URL.revokeObjectURL(url);
          }
          setIsProcessing(false);
        },
        mimeType,
        quality
      );
    } catch (error) {
      console.error('Error processing image:', error);
      setIsProcessing(false);
    }
  }, [imageState]);

  const generatePreview = useCallback(async (): Promise<string | null> => {
    if (!imageState.originalUrl) return null;
    
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = imageState.originalUrl!;
      });

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      
      const radians = (imageState.rotation * Math.PI) / 180;
      const isRotated90or270 = imageState.rotation === 90 || imageState.rotation === 270;
      
      canvas.width = isRotated90or270 ? imageState.height : imageState.width;
      canvas.height = isRotated90or270 ? imageState.width : imageState.height;
      
      if (imageState.backgroundColor !== 'transparent') {
        ctx.fillStyle = imageState.backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(radians);
      
      const drawWidth = isRotated90or270 ? imageState.height : imageState.width;
      const drawHeight = isRotated90or270 ? imageState.width : imageState.height;
      
      ctx.drawImage(
        img,
        -drawWidth / 2,
        -drawHeight / 2,
        drawWidth,
        drawHeight
      );
      
      return canvas.toDataURL(`image/${imageState.format}`, imageState.quality / 100);
    } catch {
      return null;
    }
  }, [imageState]);

  const reset = useCallback(() => {
    if (imageState.originalUrl) {
      URL.revokeObjectURL(imageState.originalUrl);
    }
    setImageState(initialState);
  }, [imageState.originalUrl]);

  return {
    imageState,
    isProcessing,
    loadImage,
    updateDimensions,
    setRotation,
    setBackgroundColor,
    setQuality,
    setFormat,
    applyPreset,
    processAndDownload,
    generatePreview,
    reset,
  };
}
