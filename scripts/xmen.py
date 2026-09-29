import requests
import csv
from pathlib import Path
from api import HEADERS

DATA_DIR = Path(__file__).parent.parent / "data"
DATA_DIR.mkdir(exist_ok=True)

filename = DATA_DIR / "xmen_movies.csv"

def get_xmen_collection(collection_id):
    if collection_id == 748:
        return "X-MEN"
    else:
        return "DEADPOOL&WOLVERINE"

# TMDB collection IDs
COLLECTION_IDS = [
    748, 453993, 448150
]

def save_xmen_movies_to_csv():

    movies = {}

    for collection_id in COLLECTION_IDS:

        url = f"https://api.themoviedb.org/3/collection/{collection_id}"

        params = {
            "language": "en-US"
        }

        response = requests.get(
            url,
            headers=HEADERS,
            params=params
        )

        if response.status_code != 200:
            print(
                f"Error fetching collection "
                f"{collection_id}: {response.status_code}"
            )
            continue

        data = response.json()

        collection_name = data.get("name", "Unknown Collection")

        print(
            f"\nCollection: {collection_name}"
        )

        collection_movies = data.get("parts", [])

        print(
            f"Found {len(collection_movies)} movies"
        )

        for movie in collection_movies:

            movie_id = movie.get("id")

            # Prevent duplicates if a movie appears
            # in multiple collections
            if movie_id not in movies:
                movies[movie_id] = {
                    "TMDB ID": movie_id,
                    "Title": movie.get("title"),
                    "Release Date": movie.get("release_date"),
                    "Group": get_xmen_collection(collection_id)
                }

    # Sort chronologically
    movie_list = list(movies.values())

    movie_list.sort(
        key=lambda movie: movie["Release Date"] or "9999-99-99"
    )

    with open(
        filename,
        mode="w",
        newline="",
        encoding="utf-8"
    ) as file:

        writer = csv.DictWriter(
            file,
            fieldnames=[
                "TMDB ID",
                "Title",
                "Release Date",
                "Group"
            ]
        )

        writer.writeheader()
        writer.writerows(movie_list)

    print(
        f"\nSuccess! Saved {len(movie_list)} "
        f"unique X-Men universe movies to '{filename}'."
    )


if __name__ == "__main__":
    save_xmen_movies_to_csv()