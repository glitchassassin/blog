import type { NoteMetadata } from '#app/types/metadata'

interface NoteFeatureImageProps {
	note: NoteMetadata
}

export function NoteFeatureImage({ note }: NoteFeatureImageProps) {
	if (!note.featureImage) {
		return null
	}

	return (
		<picture className="mb-8 block aspect-video overflow-hidden rounded-lg border border-amber-200/50 shadow-md dark:border-zinc-700/50">
			{note.featureImageDark && (
				<source
					media="(prefers-color-scheme: dark)"
					srcSet={note.featureImageDark}
				/>
			)}
			<img
				src={note.featureImage}
				alt={note.featureImageAlt ?? note.title ?? ''}
				className="h-full w-full object-cover"
			/>
		</picture>
	)
}
