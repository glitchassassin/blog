import { useEffect, useRef } from 'react'

export default function Prototype() {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const previewCanvasRefs = useRef<{ [key: number]: HTMLCanvasElement | null }>(
		{},
	)

	const updatePreviews = () => {
		const mainCanvas = canvasRef.current
		if (!mainCanvas) return

		Object.entries(previewCanvasRefs.current).forEach(
			([sizeStr, previewCanvas]) => {
				if (previewCanvas) {
					const size = parseInt(sizeStr)
					const ctx = previewCanvas.getContext('2d')
					if (ctx) {
						previewCanvas.width = size
						previewCanvas.height = size
						ctx.imageSmoothingEnabled = size >= 32
						ctx.drawImage(mainCanvas, 0, 0, size, size)
					}
				}
			},
		)
	}

	const exportIcon = (size: number, filename?: string) => {
		const canvas = canvasRef.current
		if (!canvas) return

		// Create a temporary canvas for the specific size
		const tempCanvas = document.createElement('canvas')
		const tempCtx = tempCanvas.getContext('2d')
		if (!tempCtx) return

		tempCanvas.width = size
		tempCanvas.height = size
		tempCtx.imageSmoothingEnabled = size >= 32
		tempCtx.drawImage(canvas, 0, 0, size, size)

		// Create download link
		const link = document.createElement('a')
		link.download = filename || `favicon-${size}x${size}.png`
		link.href = tempCanvas.toDataURL('image/png')

		// Trigger download
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	}

	const exportAllIcons = () => {
		const iconSizes = [
			{ size: 16, filename: 'favicon-16x16.png' },
			{ size: 32, filename: 'favicon-32x32.png' },
			{ size: 48, filename: 'favicon-48x48.png' },
			{ size: 180, filename: 'apple-touch-icon.png' },
			{ size: 192, filename: 'android-chrome-192x192.png' },
			{ size: 512, filename: 'android-chrome-512x512.png' },
		]

		iconSizes.forEach(({ size, filename }, index) => {
			setTimeout(() => {
				exportIcon(size, filename)
			}, index * 100) // Small delay between downloads
		})
	}

	const exportWebManifest = () => {
		const manifest = {
			name: 'Your App Name',
			short_name: 'App',
			description: 'Your app description',
			start_url: '/',
			display: 'standalone',
			background_color: '#18181b',
			theme_color: '#f59e0b',
			icons: [
				{
					src: '/android-chrome-192x192.png',
					sizes: '192x192',
					type: 'image/png',
				},
				{
					src: '/android-chrome-512x512.png',
					sizes: '512x512',
					type: 'image/png',
				},
			],
		}

		const blob = new Blob([JSON.stringify(manifest, null, 2)], {
			type: 'application/json',
		})
		const link = document.createElement('a')
		link.download = 'site.webmanifest'
		link.href = URL.createObjectURL(blob)

		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
		URL.revokeObjectURL(link.href)
	}

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return

		const ctx = canvas.getContext('2d')
		if (!ctx) return

		// Set canvas size
		canvas.width = 512
		canvas.height = 512

		// Canvas starts with transparent background by default
		// No need to fill background - keeping it transparent

		const ratio = 11 / 8.5
		const height = canvas.height * 0.8
		const width = height / ratio
		const x = (canvas.width - width) / 2
		const y = (canvas.height - height) / 2

		// Draw brown notebook with rounded corners
		ctx.fillStyle = 'oklch(12.9% 0.077 45.635)' // even darker for back cover
		ctx.beginPath()
		ctx.roundRect(x + 10, y + 10, width, height, 20)
		ctx.fill()

		ctx.fillStyle = 'oklch(27.9% 0.077 45.635)' // amber-950 for darker brown notebook
		ctx.beginPath()
		ctx.roundRect(x, y, width, height, 20)
		ctx.fill()

		// Draw embossed border around inside of cover
		ctx.strokeStyle = 'oklch(20% 0.077 45.635)' // darker brown for embossed effect
		ctx.lineWidth = 10
		ctx.setLineDash([])
		ctx.beginPath()
		ctx.roundRect(x + 10, y + 20, width - 30, height - 40, 15)
		ctx.stroke()

		// Draw second rectangle on left side with square corners
		ctx.fillStyle = 'oklch(41.4% 0.112 45.904)' // amber-900 for binding
		ctx.fillRect(x, y, 20, height)

		drawSymbol(ctx, canvas, 50, 'oklch(20% 0.077 45.635)')
		drawSymbol(ctx, canvas, 30, '#f59e0b')

		// Update preview canvases
		updatePreviews()
	}, [])

	function drawSymbol(
		ctx: CanvasRenderingContext2D,
		canvas: HTMLCanvasElement,
		lineWidth: number,
		color: string,
	) {
		// Draw ">" symbol in the center
		const symbolSize = 60

		ctx.strokeStyle = color
		ctx.lineWidth = lineWidth
		ctx.lineCap = 'round'
		ctx.lineJoin = 'round'

		// Draw the ">" shape centered
		ctx.beginPath()
		// Start from upper line of ">"
		ctx.moveTo(
			canvas.width / 2 - symbolSize * 0.8,
			canvas.height / 2 - symbolSize,
		)
		// Draw to the point
		ctx.lineTo(canvas.width / 2 + symbolSize, canvas.height / 2)
		// Draw to lower line
		ctx.lineTo(
			canvas.width / 2 - symbolSize * 0.8,
			canvas.height / 2 + symbolSize,
		)
		ctx.stroke()
	}

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-amber-50 p-8 transition-colors duration-300 dark:bg-zinc-900">
			<h1 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
				Favicon Generator
			</h1>
			<p className="mb-6 text-zinc-600 dark:text-zinc-400">
				512x512 Canvas for favicon generation
			</p>

			<div className="rounded-lg border-2 border-zinc-300 bg-white p-4 shadow-lg transition-colors duration-300 dark:border-zinc-600 dark:bg-zinc-800">
				<canvas
					ref={canvasRef}
					className="border border-zinc-200 dark:border-zinc-600"
					style={{ width: '256px', height: '256px' }}
				/>
			</div>

			<p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
				Canvas size: 512x512 (displayed at 256x256 for better viewing)
			</p>

			<div className="mt-6 flex flex-wrap gap-3">
				<button
					onClick={() => exportIcon(512)}
					className="rounded-lg bg-amber-500 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700"
				>
					Export 512x512
				</button>
				<button
					onClick={exportAllIcons}
					className="rounded-lg bg-blue-500 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
				>
					Export All Icons
				</button>
				<button
					onClick={exportWebManifest}
					className="rounded-lg bg-green-500 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
				>
					Download Manifest
				</button>
			</div>

			<div className="mt-8 w-full max-w-2xl">
				<h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
					Favicon Preview at Different Sizes
				</h2>
				<div className="grid grid-cols-3 gap-6 rounded-lg bg-zinc-100 p-6 dark:bg-zinc-800">
					{[
						{ size: 256, label: '256x256 (High-res)' },
						{ size: 128, label: '128x128' },
						{ size: 64, label: '64x64' },
						{ size: 32, label: '32x32 (Standard)' },
						{ size: 24, label: '24x24' },
						{ size: 16, label: '16x16 (Tiny)' },
					].map(({ size, label }) => (
						<div key={size} className="flex flex-col items-center">
							<div
								className="mb-2 border border-zinc-300 bg-white dark:border-zinc-600 dark:bg-zinc-700"
								style={{
									width: `${Math.max(size, 32)}px`,
									height: `${Math.max(size, 32)}px`,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<canvas
									ref={(el) => {
										previewCanvasRefs.current[size] = el
									}}
									style={{
										width: `${size}px`,
										height: `${size}px`,
										imageRendering: size <= 32 ? 'pixelated' : 'auto',
									}}
								/>
							</div>
							<span className="text-xs text-zinc-600 dark:text-zinc-400">
								{label}
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
