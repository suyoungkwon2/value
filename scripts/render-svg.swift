import AppKit
import Foundation

let input = URL(fileURLWithPath: CommandLine.arguments[1])
let output = URL(fileURLWithPath: CommandLine.arguments[2])
guard let image = NSImage(contentsOf: input) else { fatalError("Could not read SVG") }
let size = NSSize(width: 1200, height: 630)
image.size = size
guard let bitmap = NSBitmapImageRep(
  bitmapDataPlanes: nil,
  pixelsWide: 1200,
  pixelsHigh: 630,
  bitsPerSample: 8,
  samplesPerPixel: 4,
  hasAlpha: true,
  isPlanar: false,
  colorSpaceName: .deviceRGB,
  bytesPerRow: 0,
  bitsPerPixel: 0
) else { fatalError("Could not allocate bitmap") }
NSGraphicsContext.saveGraphicsState()
NSGraphicsContext.current = NSGraphicsContext(bitmapImageRep: bitmap)
NSGraphicsContext.current?.imageInterpolation = .high
image.draw(in: NSRect(origin: .zero, size: size))
NSGraphicsContext.restoreGraphicsState()
guard let data = bitmap.representation(using: .png, properties: [:]) else { fatalError("Could not encode PNG") }
try data.write(to: output)
