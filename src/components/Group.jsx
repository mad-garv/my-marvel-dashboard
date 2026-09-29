import ContentCarousel from "./ContentCarousel"

function Group({ name, content }) {
    return (
        <section className="group">
            <h2 className="group-title">{name}</h2>

            <ContentCarousel content={content} />
        </section>
    )
}

export default Group