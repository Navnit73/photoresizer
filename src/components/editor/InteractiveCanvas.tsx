import { useState, useRef, useEffect } from 'react'
import { ImageState } from '@/types/editor'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, X, RotateCcw, Crop, Move, Lock, Unlock } from 'lucide-react'

interface CropData {
  x: number
  y: number
  width: number
  height: number
}

type Handle =
  | 'move'
  | 'nw' | 'ne' | 'sw' | 'se'
  | null

type AspectRatio = 'free' | '1:1' | '16:9' | '4:3' | '3:2' | '9:16'

const ASPECT_RATIOS: { value: AspectRatio; label: string; ratio: number | null }[] = [
  { value: 'free', label: 'Free', ratio: null },
  { value: '1:1', label: '1:1', ratio: 1 },
  { value: '16:9', label: '16:9', ratio: 16 / 9 },
  { value: '4:3', label: '4:3', ratio: 4 / 3 },
  { value: '3:2', label: '3:2', ratio: 3 / 2 },
  { value: '9:16', label: '9:16', ratio: 9 / 16 }
]

// Haptic feedback helper
const hapticFeedback = (style: 'light' | 'medium' | 'heavy' = 'light') => {
  if ('vibrate' in navigator) {
    const duration = style === 'light' ? 10 : style === 'medium' ? 20 : 40
    navigator.vibrate(duration)
  }
}

export function InteractiveCanvas({
  imageState,
  onCropApply
}: {
  imageState: ImageState
  onCropApply: (crop: CropData) => void
}) {
  const [isCropMode, setIsCropMode] = useState(false)
  const [activeHandle, setActiveHandle] = useState<Handle>(null)
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('free')
  const [isLocked, setIsLocked] = useState(false)

  const pointerId = useRef<number | null>(null)
  const raf = useRef<number | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const cropBoxRef = useRef<HTMLDivElement>(null)
  const lockedRatio = useRef<number | null>(null)

  const start = useRef({
    x: 0,
    y: 0,
    crop: {} as CropData
  })

  const [crop, setCrop] = useState<CropData>({
    x: 0,
    y: 0,
    width: imageState.width,
    height: imageState.height
  })

  const CANVAS_W = 520
  const CANVAS_H = 400

  const scale = Math.min(
    CANVAS_W / imageState.width,
    CANVAS_H / imageState.height,
    1
  )

  const displayW = imageState.width * scale
  const displayH = imageState.height * scale

  const clamp = (v: number, min: number, max: number) =>
    Math.max(min, Math.min(max, v))

  const getCurrentAspectRatio = () => {
    return ASPECT_RATIOS.find(ar => ar.value === aspectRatio)?.ratio
  }

  const constrainToAspectRatio = (newCrop: CropData, handle: Handle): CropData => {
    const ratio = getCurrentAspectRatio()
    if (!ratio) return newCrop

    const result = { ...newCrop }

    if (handle === 'move') {
      // Moving doesn't change dimensions, just position
      return result
    }

    // For corner handles, maintain aspect ratio
    if (handle === 'se' || handle === 'nw' || handle === 'ne' || handle === 'sw') {
      const targetRatio = ratio
      const currentRatio = result.width / result.height

      if (Math.abs(currentRatio - targetRatio) > 0.01) {
        // Adjust based on which dimension changed more
        const widthChange = Math.abs(result.width - start.current.crop.width)
        const heightChange = Math.abs(result.height - start.current.crop.height)

        if (widthChange > heightChange) {
          // Width changed more, adjust height
          const newHeight = result.width / targetRatio
          
          if (handle === 'se') {
            result.height = Math.min(newHeight, imageState.height - result.y)
            result.width = result.height * targetRatio
          } else if (handle === 'nw') {
            const oldBottom = start.current.crop.y + start.current.crop.height
            result.height = result.width / targetRatio
            result.y = oldBottom - result.height
          } else if (handle === 'ne') {
            const oldBottom = start.current.crop.y + start.current.crop.height
            result.height = result.width / targetRatio
            result.y = oldBottom - result.height
          } else if (handle === 'sw') {
            result.height = result.width / targetRatio
          }
        } else {
          // Height changed more, adjust width
          const newWidth = result.height * targetRatio
          
          if (handle === 'se') {
            result.width = Math.min(newWidth, imageState.width - result.x)
            result.height = result.width / targetRatio
          } else if (handle === 'nw') {
            const oldRight = start.current.crop.x + start.current.crop.width
            result.width = result.height * targetRatio
            result.x = oldRight - result.width
          } else if (handle === 'ne') {
            result.width = result.height * targetRatio
          } else if (handle === 'sw') {
            const oldRight = start.current.crop.x + start.current.crop.width
            result.width = result.height * targetRatio
            result.x = oldRight - result.width
          }
        }
      }
    }

    return result
  }

  useEffect(() => {
    const initialCrop = {
      x: imageState.width * 0.1,
      y: imageState.height * 0.1,
      width: imageState.width * 0.8,
      height: imageState.height * 0.8
    }
    setCrop(initialCrop)
    
    // Store initial ratio if locked
    if (isLocked) {
      lockedRatio.current = initialCrop.width / initialCrop.height
    }
  }, [imageState.width, imageState.height])

  useEffect(() => {
    // When aspect ratio changes, adjust crop to match
    const ratio = getCurrentAspectRatio()
    if (ratio) {
      const currentRatio = crop.width / crop.height
      if (Math.abs(currentRatio - ratio) > 0.01) {
        const centerX = crop.x + crop.width / 2
        const centerY = crop.y + crop.height / 2
        
        let newWidth = crop.width
        let newHeight = crop.width / ratio
        
        // If new height exceeds bounds, scale based on height
        if (newHeight > imageState.height) {
          newHeight = imageState.height * 0.8
          newWidth = newHeight * ratio
        }
        
        setCrop({
          x: clamp(centerX - newWidth / 2, 0, imageState.width - newWidth),
          y: clamp(centerY - newHeight / 2, 0, imageState.height - newHeight),
          width: newWidth,
          height: newHeight
        })
      }
    }
  }, [aspectRatio])

const onPointerDown = (e: React.PointerEvent, handle: Handle) => {
  if (!isCropMode) return

  e.preventDefault()
  e.stopPropagation()

  hapticFeedback('medium')

  const target = e.currentTarget as HTMLElement
  target.setPointerCapture(e.pointerId)

  pointerId.current = e.pointerId
  setActiveHandle(handle)

  start.current = {
    x: e.clientX,
    y: e.clientY,
    crop: { ...crop }
  }
}


  const updateCrop = (x: number, y: number) => {
    const dx = (x - start.current.x) / scale
    const dy = (y - start.current.y) / scale
    const minSize = 30

    let next = { ...start.current.crop }

    if (activeHandle === 'move') {
      next.x = clamp(
        start.current.crop.x + dx,
        0,
        imageState.width - next.width
      )
      next.y = clamp(
        start.current.crop.y + dy,
        0,
        imageState.height - next.height
      )
    }

    if (activeHandle === 'se') {
      next.width = clamp(
        start.current.crop.width + dx,
        minSize,
        imageState.width - next.x
      )
      next.height = clamp(
        start.current.crop.height + dy,
        minSize,
        imageState.height - next.y
      )
    }

    if (activeHandle === 'nw') {
      const nx = clamp(
        start.current.crop.x + dx,
        0,
        start.current.crop.x + start.current.crop.width - minSize
      )
      const ny = clamp(
        start.current.crop.y + dy,
        0,
        start.current.crop.y + start.current.crop.height - minSize
      )
      next.width += start.current.crop.x - nx
      next.height += start.current.crop.y - ny
      next.x = nx
      next.y = ny
    }

    if (activeHandle === 'ne') {
      next.width = clamp(
        start.current.crop.width + dx,
        minSize,
        imageState.width - next.x
      )
      const ny = clamp(
        start.current.crop.y + dy,
        0,
        start.current.crop.y + start.current.crop.height - minSize
      )
      next.height += start.current.crop.y - ny
      next.y = ny
    }

    if (activeHandle === 'sw') {
      const nx = clamp(
        start.current.crop.x + dx,
        0,
        start.current.crop.x + start.current.crop.width - minSize
      )
      next.width += start.current.crop.x - nx
      next.x = nx
      next.height = clamp(
        start.current.crop.height + dy,
        minSize,
        imageState.height - next.y
      )
    }

    // Apply aspect ratio constraints if set
    next = constrainToAspectRatio(next, activeHandle)

    setCrop({
      x: Math.round(next.x),
      y: Math.round(next.y),
      width: Math.round(next.width),
      height: Math.round(next.height)
    })
  }

 const onPointerMove = (e: React.PointerEvent) => {
  if (!isCropMode) return
  if (pointerId.current !== e.pointerId) return

  e.preventDefault() // ✅ only when actively dragging

  if (raf.current) cancelAnimationFrame(raf.current)

  raf.current = requestAnimationFrame(() =>
    updateCrop(e.clientX, e.clientY)
  )
}


  const onPointerUp = (e: React.PointerEvent) => {
    if (pointerId.current === null) return
    
    // Haptic feedback on release
    hapticFeedback('light')
    
    // Release pointer capture
    const target = e.currentTarget as HTMLElement
    if (target.hasPointerCapture(pointerId.current)) {
      target.releasePointerCapture(pointerId.current)
    }
    
    pointerId.current = null
    setActiveHandle(null)
  }

  const applyCrop = () => {
    hapticFeedback('heavy')
    onCropApply({ ...crop })
    setIsCropMode(false)
  }

  const handleAspectRatioChange = (newRatio: AspectRatio) => {
    hapticFeedback('light')
    setAspectRatio(newRatio)
    if (newRatio === 'free') {
      setIsLocked(false)
    }
  }

  const toggleLock = () => {
    hapticFeedback('medium')
    const newLocked = !isLocked
    setIsLocked(newLocked)
    
    if (newLocked) {
      // Lock current aspect ratio
      lockedRatio.current = crop.width / crop.height
      setAspectRatio('free')
    } else {
      lockedRatio.current = null
    }
  }

  if (!imageState.originalUrl) return null

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <Button size="sm" onClick={() => {
          hapticFeedback('medium')
          setIsCropMode(true)
        }}>
          <Crop className="w-4 h-4 mr-2" />
          Crop
        </Button>
      </div>

      {isCropMode && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-medium text-muted-foreground">Aspect Ratio:</span>
            {ASPECT_RATIOS.map(ar => (
              <Button
                key={ar.value}
                size="sm"
                variant={aspectRatio === ar.value && !isLocked ? 'default' : 'outline'}
                onClick={() => handleAspectRatioChange(ar.value)}
                disabled={isLocked && ar.value !== 'free'}
                className="h-7 px-2 text-xs"
              >
                {ar.label}
              </Button>
            ))}
            <Button
              size="sm"
              variant={isLocked ? 'default' : 'outline'}
              onClick={toggleLock}
              className="h-7 px-2"
              title={isLocked ? 'Unlock aspect ratio' : 'Lock current aspect ratio'}
            >
              {isLocked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-1.5 bg-muted px-3 py-1.5 rounded-md">
              <span className="text-xs font-medium text-muted-foreground">Dimensions:</span>
              <span className="font-mono font-semibold">
                {Math.round(crop.width)} × {Math.round(crop.height)} px
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-muted px-3 py-1.5 rounded-md">
              <span className="text-xs font-medium text-muted-foreground">Ratio:</span>
              <span className="font-mono font-semibold">
                {(crop.width / crop.height).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}

      <Card
  ref={cardRef}
  className="relative overflow-hidden"
  onPointerMove={isCropMode ? onPointerMove : undefined}
  onPointerUp={isCropMode ? onPointerUp : undefined}
  onPointerLeave={isCropMode ? onPointerUp : undefined}
  onPointerCancel={isCropMode ? onPointerUp : undefined}
>

        <div className="relative flex justify-center p-2 bg-muted/30">
          <div
            className="relative"
            style={{ width: displayW, height: displayH }}
          >
            <img
              src={imageState.originalUrl}
              draggable={false}
              className="rounded-lg shadow-sm pointer-events-none"
              style={{
                width: displayW,
                height: displayH,
                transform: `rotate(${imageState.rotation}deg)`,
                userSelect: 'none',
                WebkitUserSelect: 'none'
              }}
            />

            {isCropMode && (
              <>
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] pointer-events-none" />
<div
  ref={cropBoxRef}
  className="absolute z-20 rounded-xl border-2 border-white shadow-2xl cursor-move"
  style={{
    touchAction: 'none', // ✅ correct place
    left: `${(crop.x / imageState.width) * 100}%`,
    top: `${(crop.y / imageState.height) * 100}%`,
    width: `${(crop.width / imageState.width) * 100}%`,
    height: `${(crop.height / imageState.height) * 100}%`
  }}
  onPointerDown={e => onPointerDown(e, 'move')}
>

                  <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="border border-white/25" />
                    ))}
                  </div>

                  {[
                    ['nw', '-top-3 -left-3', 'cursor-nwse-resize'],
                    ['ne', '-top-3 -right-3', 'cursor-nesw-resize'],
                    ['sw', '-bottom-3 -left-3', 'cursor-nesw-resize'],
                    ['se', '-bottom-3 -right-3', 'cursor-nwse-resize']
                  ].map(([h, pos, cursor]) => (
                    <div
                      key={h}
                      onPointerDown={e => onPointerDown(e, h as Handle)}
                      className={`absolute ${pos} w-7 h-7 rounded-full bg-white shadow-lg border-2 border-primary ${cursor} transition-all`}
                      style={{ 
                        touchAction: 'none',
                        // transform: activeHandle === h ? 'scale(1.2)' : 'scale(1)',
                        // boxShadow: activeHandle === h ? '0 0 0 3px rgba(59, 130, 246, 0.3)' : undefined
                      }}
                    />
                  ))}

                  {/* <div className="absolute top-2 left-2 bg-black/70 text-white rounded px-2 py-1 text-xs flex items-center gap-1 pointer-events-none backdrop-blur-sm">
                    <Move className="w-3 h-3" />
                    Drag to move
                  </div> */}
                </div>
              </>
            )}
          </div>
        </div>
      </Card>

      {isCropMode && (
        <div className="flex justify-center gap-2">
          <Button size="sm" onClick={applyCrop}>
            <Check className="w-4 h-4 mr-1" />
            Apply
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              hapticFeedback('light')
              setCrop({
                x: 0,
                y: 0,
                width: imageState.width,
                height: imageState.height
              })
            }}
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              hapticFeedback('light')
              setIsCropMode(false)
            }}
          >
            <X className="w-4 h-4 mr-1" />
            Cancel
          </Button>
        </div>
      )}

      <p className="text-xs text-muted-foreground text-center">
        {isCropMode 
          ? 'Drag to move • Resize from corners • Select aspect ratio above'
          : 'Click Crop to start editing'}
      </p>
    </div>
  )
}