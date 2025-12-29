import { useCallback, useState } from 'react';
import { ImageState } from '@/types/editor';

interface CropData {
  x: number;
  y: number;
  width: number;
  height: number;
}

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
  const [history, setHistory] = useState<ImageState[]>([]);

  const saveToHistory = useCallback((state: ImageState) => {
    setHistory(prev => [...prev.slice(-9), state]);
  }, []);

  const loadImage = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    
    img.onload = () => {
      const newState: ImageState = {
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
      };
      setImageState(newState);
      setHistory([newState]);
    };
    
    img.src = url;
  }, []);

  const updateDimensions = useCallback((width: number, height: number, maintainRatio: boolean = false) => {
    setImageState(prev => {
      let newWidth = width;
      let newHeight = height;
      
      if (maintainRatio && prev.originalWidth && prev.originalHeight) {
        const ratio = prev.originalWidth / prev.originalHeight;
        if (width !== prev.width) {
          newHeight = Math.round(width / ratio);
        } else {
          newWidth = Math.round(height * ratio);
        }
      }
      
      const newState = { ...prev, width: newWidth, height: newHeight };
      return newState;
    });
  }, []);

  const setRotation = useCallback((rotation: number) => {
    setImageState(prev => {
      const newState = { ...prev, rotation: ((rotation % 360) + 360) % 360 };
      saveToHistory(prev);
      return newState;
    });
  }, [saveToHistory]);

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
    setImageState(prev => {
      saveToHistory(prev);
      return { ...prev, width, height };
    });
  }, [saveToHistory]);

  const applyCrop = useCallback(async (cropData: CropData) => {
    if (!imageState.originalUrl) return;
    
    setIsProcessing(true);
    saveToHistory(imageState);
    
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
      
      // Scale crop coordinates to actual image dimensions
      const scaleX = img.naturalWidth / imageState.width;
      const scaleY = img.naturalHeight / imageState.height;
      
      const actualX = cropData.x * scaleX;
      const actualY = cropData.y * scaleY;
      const actualWidth = cropData.width * scaleX;
      const actualHeight = cropData.height * scaleY;
      
      canvas.width = actualWidth;
      canvas.height = actualHeight;
      
      ctx.drawImage(
        img,
        actualX, actualY, actualWidth, actualHeight,
        0, 0, actualWidth, actualHeight
      );
      
      const newUrl = canvas.toDataURL('image/png');
      
      setImageState(prev => ({
        ...prev,
        originalUrl: newUrl,
        editedUrl: newUrl,
        width: Math.round(cropData.width),
        height: Math.round(cropData.height),
        originalWidth: Math.round(actualWidth),
        originalHeight: Math.round(actualHeight),
      }));
      
    } catch (error) {
      console.error('Error applying crop:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [imageState, saveToHistory]);

  const undo = useCallback(() => {
    if (history.length > 1) {
      const previousState = history[history.length - 2];
      setHistory(prev => prev.slice(0, -1));
      setImageState(previousState);
    }
  }, [history]);

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
      
      const mimeType = `image/${imageState.format}`;
      const quality = imageState.format === 'png' ? 1 : imageState.quality / 100;
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `edited-image-${imageState.width}x${imageState.height}.${imageState.format}`;
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
    setHistory([]);
  }, [imageState.originalUrl]);

  return {
    imageState,
    isProcessing,
    history,
    loadImage,
    updateDimensions,
    setRotation,
    setBackgroundColor,
    setQuality,
    setFormat,
    applyPreset,
    applyCrop,
    undo,
    processAndDownload,
    generatePreview,
    reset,
  };
}
