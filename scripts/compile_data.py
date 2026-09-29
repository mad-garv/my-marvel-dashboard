import csv
from pathlib import Path

DATA_DIR = Path(__file__).parent.parent / "data"

SOURCE_FILES = {
    "fantastic4_movies.csv": {
        "category": "Fantastic Four",
        "media_type": "movie",
    },
    "xmen_movies.csv": {
        "category": "X-Men",
        "media_type": "movie",
    },
    "mcu_movies.csv": {
        "category": "MCU",
        "media_type": "movie",
    },
    "marvel_tv.csv": {
        "category": "Marvel Television",
        "media_type": "tv",
    },
    "mcu_tv.csv": {
        "category": "MCU Television",
        "media_type": "tv",
    },
}

OUTPUT_FILE = Path(__file__).parent.parent / "public" / "data" / "compiled_data.csv"

rows = []

for filename, info in SOURCE_FILES.items():
    file_path = DATA_DIR / filename

    with open(file_path, "r", newline="", encoding="utf-8") as file:
        reader = csv.DictReader(file)

        for row in reader:
            rows.append({
                "tmdbID": row["TMDB ID"],
                "category": info["category"],
                "group": row.get("Group", ""),
                "media_type": info["media_type"],
            })

# Sort alphabetically by category
rows.sort(key=lambda row: row["category"].lower())

with open(OUTPUT_FILE, "w", newline="", encoding="utf-8") as file:
    fieldnames = ["tmdbID", "category", "group", "media_type"]

    writer = csv.DictWriter(file, fieldnames=fieldnames)

    writer.writeheader()
    writer.writerows(rows)

print(f"Created {OUTPUT_FILE}")
print(f"Total rows: {len(rows)}")