export function getCategories(data) {
    return [...new Set(data.map(item => item.category))]
        .sort((a, b) => a.localeCompare(b))
}

export function getGroups(data, category) {
    return [...new Set(
        data
            .filter(item => item.category === category)
            .map(item => item.group)
    )]
        .filter(group => group)
        .sort((a, b) => a.localeCompare(b))
}

export function getContent(data, category, group) {
    return data
        .filter(
            item =>
                item.category === category &&
                item.group === group
        )
        .sort(
            (a, b) =>
                new Date(a.release_date) -
                new Date(b.release_date)
        )
}