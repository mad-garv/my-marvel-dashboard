export async function getCompiledData() {
    const response = await fetch("/data/compiled_data.csv")

    if (!response.ok) {
        throw new Error("Failed to load compiled data")
    }

    const csvText = await response.text()

    const lines = csvText.trim().split("\n")
    const headers = lines[0].split(",").map(header => header.trim())

    const data = lines.slice(1).map(line => {
        const values = line.split(",").map(value => value.trim())

        return headers.reduce((row, header, index) => {
            row[header] = values[index]
            return row
        }, {})
    })

    return data
}