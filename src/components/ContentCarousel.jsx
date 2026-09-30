import { useEffect, useRef, useState } from "react"
import ContentCard from "./ContentCard"

function ContentCarousel({ content }) {
    const [currentIndex, setCurrentIndex] = useState(0)

    const carouselRef = useRef(null)

    useEffect(() => {
        const carousel = carouselRef.current

        if (!carousel) return

        function updateCurrentItem() {
            const slides = carousel.querySelectorAll(".content-slide")

            const carouselCenter =
                carousel.getBoundingClientRect().left +
                carousel.offsetWidth / 2

            let closestIndex = 0
            let closestDistance = Infinity

            slides.forEach((slide, index) => {
                const rect = slide.getBoundingClientRect()

                const slideCenter =
                    rect.left + rect.width / 2

                const distance = Math.abs(
                    slideCenter - carouselCenter
                )

                if (distance < closestDistance) {
                    closestDistance = distance
                    closestIndex = index
                }
            })

            setCurrentIndex(closestIndex)
        }

        carousel.addEventListener("scroll", updateCurrentItem)

        updateCurrentItem()

        return () => {
            carousel.removeEventListener(
                "scroll",
                updateCurrentItem
            )
        }
    }, [content.length])

    return (
        <div
            className="content-carousel"
            ref={carouselRef}
        >
            {content.map((item, index) => (
                <div
                    className={`content-slide ${index === currentIndex
                            ? "current"
                            : index < currentIndex
                                ? "previous"
                                : "next"
                        }`}
                    key={`${item.media_type}-${item.tmdbID}`}
                    onClick={() => {
                        const slide = carouselRef.current?.children[index]

                        slide?.scrollIntoView({
                            behavior: "smooth",
                            inline: "center",
                            block: "nearest",
                        })
                    }}
                >
                    <ContentCard item={item} />
                </div>
            ))}
        </div>
    )
}

export default ContentCarousel