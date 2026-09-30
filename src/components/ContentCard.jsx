import { useEffect, useState } from "react"
import { getTMDBContent } from "../services/tmdb"

function ContentCard({ item }) {
    const [content, setContent] = useState(null)
    const [error, setError] = useState(false)

    useEffect(() => {
        async function loadContent() {
            try {
                const result = await getTMDBContent(
                    item.tmdbID,
                    item.media_type
                )

                setContent(result)
            } catch {
                setError(true)
            }
        }

        loadContent()
    }, [item.tmdbID, item.media_type])

    if (error) {
        return (
            <article className="content-card">
                <div className="content-card-placeholder error">
                    Failed to load
                </div>
            </article>
        )
    }

    if (!content) {
        return (
            <article className="content-card">
                <div className="content-card-placeholder" />
            </article>
        )
    }

    const title =
        item.media_type === "movie"
            ? content.title
            : content.name

    const releaseDate =
        item.media_type === "movie"
            ? content.release_date
            : content.first_air_date

    return (
        <article className="content-card">
            <div className="poster-wrapper">
                <img
                    src={`https://image.tmdb.org/t/p/w342${content.poster_path}`}
                    alt={title}
                />

                <div className="poster-overlay" />
            </div>

            <h3>{title}</h3>

            <p>{releaseDate?.slice(0, 4)}</p>
        </article>
    )
}

export default ContentCard