const BASE_URL = "https://api.themoviedb.org/3"

const headers = {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    accept: "application/json",
}

const cache = new Map()

export async function getTMDBContent(tmdbID, mediaType) {
    const cacheKey = `${mediaType}-${tmdbID}`

    if (cache.has(cacheKey)) {
        return cache.get(cacheKey)
    }

    const response = await fetch(
        `${BASE_URL}/${mediaType}/${tmdbID}`,
        { headers }
    )

    if (!response.ok) {
        throw new Error(
            `Failed to fetch TMDB content: ${tmdbID}`
        )
    }

    const data = await response.json()

    cache.set(cacheKey, data)

    return data
}