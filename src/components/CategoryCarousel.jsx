import { useEffect, useRef } from "react"

function CategoryCarousel({
    categories,
    selectedCategory,
    onSelectCategory,
}) {
    const carouselRef = useRef(null)

    useEffect(() => {
        const selectedElement = carouselRef.current?.querySelector(".category.active")

        if (selectedElement) {
            selectedElement.scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "nearest",
            })
        }
    }, [selectedCategory])

    return (
        <div className="category-carousel" ref={carouselRef}>
            {categories.map(category => (
                <button
                    key={category}
                    className={
                        category === selectedCategory
                            ? "category active"
                            : "category"
                    }
                    onClick={() => onSelectCategory(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    )
}

export default CategoryCarousel