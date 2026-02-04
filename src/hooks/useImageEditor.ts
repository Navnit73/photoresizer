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

  const processImageApi = async (file: File, operations: any) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('operations', JSON.stringify(operations));
    
    const response = await fetch('/api/image/process', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Server Error: ${text}`);
    }
    
    return response.json();
  };

  const applyCrop = useCallback(async (cropData: CropData) => {
    if (!imageState.originalUrl || !imageState.file) return;
    
    setIsProcessing(true);
    saveToHistory(imageState);
    
    try {
      // Send crop request to backend
      // We start with the current file.
      // NOTE: cropData is relative to current displayed dimensions (imageState.width/height)
      // But Sharp needs pixels relative to the physical image.
      // If we keep imageState.width synced with physical dimensions (which we do in applyCrop result), 
      // then cropData is already in physical pixels?
      // Wait. updateDimensions updates imageState.width/height but NOT the underlying file.
      // So if user resizes dimensions in UI, crop handles passed from InteractiveCanvas are based on THAT displayed size.
      // But the FILE is still the original size.
      // So we must scale the crop coordinates to the File's natural size.
      // BUT, we don't have 'naturalWidth' here easily unless we load the image again or trust originalWidth.
      
      // Luckily, we track 'originalWidth/Height'. 
      // Wait, 'originalWidth' in state tracks the *current file's* natural width.
      // 'width' tracks the user's *desired* output width (or display width).
      // InteractiveCanvas uses 'imageState.width' for display/logic.
      // So cropData is in 'imageState.width' space.
      
      // Let's assume we need to scale:
      const scaleX = imageState.originalWidth / imageState.width;
      const scaleY = imageState.originalHeight / imageState.height;
      
      // Ops for backend
      const ops = {
          crop: {
              left: cropData.x * scaleX,
              top: cropData.y * scaleY,
              width: cropData.width * scaleX,
              height: cropData.height * scaleY
          },
          // Intermediate save: use lossless or high quality
          format: 'png',
          quality: 100 
      };

      const { url } = await processImageApi(imageState.file, ops);

      // Download the new intermediate file
      const res = await fetch(url);
      const blob = await res.blob();
      const newFile = new File([blob], `cropped-${Date.now()}.png`, { type: "image/png" });
      const newUrl = URL.createObjectURL(blob);
      
      // Retrieve new dimensions from the blob (or assume they match crop request)
      // Better to read them to be sure
      const img = new Image();
      img.onload = () => {
          setImageState(prev => ({
            ...prev,
            file: newFile,
            originalUrl: newUrl,
            editedUrl: newUrl,
            width: img.width, // Reset UI size to new natural size
            height: img.height,
            originalWidth: img.width,
            originalHeight: img.height,
            rotation: 0 // Reset rotation after crop
          }));
          setIsProcessing(false);
      };
      img.src = newUrl;
      
    } catch (error) {
      console.error('Error applying crop:', error);
      setIsProcessing(false);
      alert('Failed to crop image. Please check backend connection.');
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
  if (!imageState.file) return;

  setIsProcessing(true);

  try {
    const operations = {
      rotate: imageState.rotation,
      resize: {
        width: imageState.width,
        height: imageState.height,
      },
      backgroundColor: imageState.backgroundColor,
      format: imageState.format,
      quality: imageState.quality,
    };

    // 1️⃣ Ask backend to process image
    const { url } = await processImageApi(imageState.file, operations);

    // 2️⃣ Fetch processed image as blob
    const res = await fetch(url);
    const blob = await res.blob();

    // 3️⃣ Create local blob URL
    const blobUrl = URL.createObjectURL(blob);

    // 4️⃣ OPEN PREVIEW in new tab
    window.open(blobUrl, "_blank", "noopener,noreferrer");

    // 5️⃣ FORCE DOWNLOAD
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = `edited-image-${imageState.width}x${imageState.height}.${imageState.format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // (optional) Save preview url in state
    setImageState(prev => ({
      ...prev,
      editedUrl: blobUrl,
      fileSize: blob.size,
    }));

  } catch (error) {
    console.error("Error processing image:", error);
    alert("Failed to process image. Please check backend connection.");
  } finally {
    setIsProcessing(false);
  }
}, [imageState]);


  const generatePreview = useCallback(async (): Promise<string | null> => {
     // Keeping this null or implementing simple functionality if needed
     return null;
  }, []);

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
