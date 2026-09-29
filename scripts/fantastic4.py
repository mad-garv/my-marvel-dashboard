import requests
import csv
from pathlib import Path
from api import HEADERS

DATA_DIR = Path(__file__).parent.parent / "data"
DATA_DIR.mkdir(exist_ok=True)

filename = DATA_DIR / "fantastic4_movies.csv"

MOVIE_IDS = [
    9738,
    1979,
    166424,
    617126
]

def save_fantastic_four_movies():

    movies = []

    for movie_id in MOVIE_IDS:

        url = f"https://api.themoviedb.org/3/movie/{movie_id}"

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
                f"Error fetching TMDB ID {movie_id}: "
                f"{response.status_code}"
            )
            continue

        movie = response.json()

        movies.append({
            "TMDB ID": movie.get("id"),
            "Title": movie.get("title"),
            "Release Date": movie.get("release_date")
        })

        print(
            f"Found: {movie.get('title')} "
            f"({movie.get('release_date')}) "
            f"→ TMDB ID {movie.get('id')}"
        )

    # Sort by release date
    movies.sort(
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
                "Release Date"
            ]
        )

        writer.writeheader()
        writer.writerows(movies)

    print(
        f"\nSuccess! Saved {len(movies)} "
        f"Fantastic Four movies to '{filename}'."
    )


if __name__ == "__main__":
    save_fantastic_four_movies()