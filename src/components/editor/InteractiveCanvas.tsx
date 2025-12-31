import { useState, useRef, useEffect } from 'react'
import { ImageState } from '@/types/editor'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, X, RotateCcw, Crop, Move } from 'lucide-react'

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

export function InteractiveCanvas({
  imageState,
  onCropApply
}: {
  imageState: ImageState
  onCropApply: (crop: CropData) => void
}) {
  const [isCropMode, setIsCropMode] = useState(false)
  const [activeHandle, setActiveHandle] = useState<Handle>(null)

  const pointerId = useRef<number | null>(null)
  const raf = useRef<number | null>(null)

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

  useEffect(() => {
    setCrop({
      x: imageState.width * 0.1,
      y: imageState.height * 0.1,
      width: imageState.width * 0.8,
      height: imageState.height * 0.8
    })
  }, [imageState.width, imageState.height])

  const onPointerDown = (
    e: React.PointerEvent,
    handle: Handle
  ) => {
    e.preventDefault()
    e.stopPropagation()

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

    setCrop({
      x: Math.round(next.x),
      y: Math.round(next.y),
      width: Math.round(next.width),
      height: Math.round(next.height)
    })
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (pointerId.current !== e.pointerId) return
    if (raf.current) cancelAnimationFrame(raf.current)

    raf.current = requestAnimationFrame(() =>
      updateCrop(e.clientX, e.clientY)
    )
  }

  const onPointerUp = () => {
    pointerId.current = null
    setActiveHandle(null)
  }

  const applyCrop = () => {
    onCropApply({ ...crop })
    setIsCropMode(false)
  }

  if (!imageState.originalUrl) return null

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Button size="sm" onClick={() => setIsCropMode(true)}>
          <Crop className="w-4 h-4 mr-2" />
          Crop
        </Button>
      </div>

      <Card
        className="relative overflow-hidden"
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
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
                transform: `rotate(${imageState.rotation}deg)`
              }}
            />

            {isCropMode && (
              <>
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] pointer-events-none" />

                <div
                  className="absolute z-20 rounded-xl border-2 border-white shadow-2xl cursor-move"
                  style={{
                    left: `${(crop.x / imageState.width) * 100}%`,
                    top: `${(crop.y / imageState.height) * 100}%`,
                    width: `${(crop.width / imageState.width) * 100}%`,
                    height: `${(crop.height / imageState.height) * 100}%`
                  }}
                  onPointerDown={e => onPointerDown(e, 'move')}
                >
                  <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="border border-white/25" />
                    ))}
                  </div>

                  {[
                    ['nw', '-top-2 -left-2'],
                    ['ne', '-top-2 -right-2'],
                    ['sw', '-bottom-2 -left-2'],
                    ['se', '-bottom-2 -right-2']
                  ].map(([h, pos]) => (
                    <div
                      key={h}
                      onPointerDown={e =>
                        onPointerDown(e, h as Handle)
                      }
                      className={`absolute ${pos} w-4 h-4 rounded-full bg-white shadow-lg border border-primary cursor-pointer`}
                    />
                  ))}

                  <div className="absolute top-2 left-2 bg-black/50 text-white rounded px-2 py-1 text-xs flex items-center gap-1 pointer-events-none">
                    <Move className="w-3 h-3" />
                    Drag
                  </div>
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
            onClick={() =>
              setCrop({
                x: 0,
                y: 0,
                width: imageState.width,
                height: imageState.height
              })
            }
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsCropMode(false)}
          >
            <X className="w-4 h-4 mr-1" />
            Cancel
          </Button>
        </div>
      )}

      <p className="text-xs text-muted-foreground text-center">
        Drag to move • Resize from corners • Clean, non-destructive crop
      </p>
    </div>
  )
}
