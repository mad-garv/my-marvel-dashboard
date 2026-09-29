import { useEffect, useState } from "react"
import { getCompiledData } from "./services/data"
import {
  getCategories,
  getGroups,
  getContent,
} from "./utils/organizeData"
import CategoryCarousel from "./components/CategoryCarousel"
import Group from "./components/Group"

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

  return (
    <div className="app">
      <CategoryCarousel
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <main className="dashboard-content">
        {selectedCategory && (
          <>
            <h1 className="selected-category">
              {selectedCategory}
            </h1>

            <div className="groups">
              {getGroups(data, selectedCategory).map(group => (
                <Group
                  key={group}
                  name={group}
                  content={getContent(
                    data,
                    selectedCategory,
                    group
                  )}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default App