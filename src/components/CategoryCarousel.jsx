import { useEffect, useRef, useState } from "react"

function CategoryCarousel({
    categories,
    selectedCategory,
    onSelectCategory,
}) {
    const [currentIndex, setCurrentIndex] = useState(
        categories.indexOf(selectedCategory)
    )

    const carouselRef = useRef(null)

    useEffect(() => {
        const carousel = carouselRef.current

        if (!carousel) return

        function updateCurrentCategory() {
            const slides =
                carousel.querySelectorAll(".category-item")

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

            onSelectCategory(categories[closestIndex])
        }

        carousel.addEventListener(
            "scroll",
            updateCurrentCategory
        )

        updateCurrentCategory()

        return () => {
            carousel.removeEventListener(
                "scroll",
                updateCurrentCategory
            )
        }
    }, [categories, onSelectCategory])

    return (
        <div
            className="category-carousel"
            ref={carouselRef}
        >
            {categories.map((category, index) => (
                <button
                    className={`category-item ${
                        index === currentIndex
                            ? "current"
                            : ""
                    }`}
                    key={category}
                    onClick={() => {
                        const slide = carouselRef.current?.children[index]
                    
                        slide?.scrollIntoView({
                            behavior: "smooth",
                            inline: "center",
                            block: "nearest",
                        })
                    }}
                >
                    {category}
                </button>
            ))}
        </div>
    )
}

export default CategoryCarousel