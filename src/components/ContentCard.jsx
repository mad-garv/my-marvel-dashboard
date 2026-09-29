function ContentCard({ item }) {
    return (
        <article className="content-card">
            <div className="content-card-placeholder">
                {item.tmdbID}
            </div>

            <h3>{item.tmdbID}</h3>

            <p>{item.media_type}</p>
        </article>
    )
}

export default ContentCard