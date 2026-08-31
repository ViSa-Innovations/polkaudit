/**
 * Extract YouTube video ID from common URL formats for embed.
 * Supports watch, youtu.be, embed, and shorts URLs.
 */
export function getYouTubeVideoId(url: string | undefined): string | null {
  if (!url?.trim()) return null

  try {
    const parsed = new URL(url.trim())

    if (parsed.hostname === 'youtu.be') {
      return parsed.pathname.slice(1).split('/')[0] || null
    }

    const watchId = parsed.searchParams.get('v')
    if (watchId) return watchId

    const embedMatch = parsed.pathname.match(/\/embed\/([^/?]+)/)
    if (embedMatch?.[1]) return embedMatch[1]

    const shortsMatch = parsed.pathname.match(/\/shorts\/([^/?]+)/)
    if (shortsMatch?.[1]) return shortsMatch[1]
  } catch {
    return null
  }

  return null
}

export function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`
}

export function getYouTubeWatchUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`
}
