import { useEffect, useState } from "react"
import { getCompiledData } from "./services/data"
import {
  getCategories,
  getGroups,
  getContent,
} from "./utils/organizeData"
import CategoryCarousel from "./components/CategoryCarousel"
import Group from "./components/Group"
import categoryConfig from "./data/categoryConfig"

function App() {
  const [data, setData] = useState([])
  const [error, setError] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  useEffect(() => {
    async function loadData() {
      try {
        const results = await getCompiledData()
        setData(results)

        const categories = getCategories(results)
        if (categories.length > 0) {
          setSelectedCategory(categories[0])
        }
      } catch (error) {
        setError(error.message)
      }
    }
    loadData()
  }, [])

  if (error) {
    return <p>{error}</p>
  }

  const categories = getCategories(data)

  // 1. Get the config for the active category, falling back to a default if missing
  const currentCategoryConfig = categoryConfig[selectedCategory] || {}
  const theme = currentCategoryConfig.theme || {}

  return (
    <div
      className="app"
      style={{
        "--page-background": theme.background || "#000000",
        "--page-gradient": theme.backgroundGradient || "none",
        "--page-text": theme.text || "#ffffff",
        "--page-muted-text": theme.mutedText || "#888888",
        "--page-accent": theme.accent || "#ffffff",
        "--page-accent-soft": theme.accentSoft || "rgba(255, 255, 255, 0.2)",
        "--page-divider": theme.divider || "#222222",
        "--page-carousel-fade": theme.carouselFade || "rgba(255, 255, 255, 0.1)",
        "--page-font": theme.font || "Arial, sans-serif",
        "--page-surface": theme.surface || "rgba(16, 16, 16, .8)",
        "--page-theme": theme.name || "default",
      }}
      data-theme={theme.name || "default"}
    >
      <CategoryCarousel
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <main className="dashboard-content">
        {selectedCategory && (
          <div className="groups">
            {getGroups(data, selectedCategory).map(group => (
              <Group
                key={group}
                name={group}
                content={getContent(data, selectedCategory, group)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default App
