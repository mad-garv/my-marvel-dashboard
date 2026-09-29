import ContentCard from "./ContentCard"

function ContentCarousel({ content }) {
    return (
        <div className="content-carousel">
            {content.map(item => (
                <ContentCard
                    key={`${item.media_type}-${item.tmdbID}`}
                    item={item}
                />
            ))}
        </div>
    )
}

export default ContentCarousel