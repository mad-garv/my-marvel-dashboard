import requests
import csv
from pathlib import Path
from datetime import datetime
from api import HEADERS

DATA_DIR = Path(__file__).parent.parent / "data"
DATA_DIR.mkdir(exist_ok=True)

filename = DATA_DIR / "mcu_movies.csv"

def get_mcu_phase(release_date_str):
    
    if not release_date_str:
        return "Unknown / Upcoming"
    
    try:
        release_date = datetime.strptime(release_date_str, "%Y-%m-%d").date()
                
        if release_date <= datetime(2012, 5, 4).date(): # Up to Avengers
            return "Phase 1"
        elif release_date <= datetime(2015, 7, 17).date(): # Up to Ant-Man
            return "Phase 2"
        elif release_date <= datetime(2019, 7, 2).date(): # Up to Far from home
            return "Phase 3"
        elif release_date <= datetime(2022, 11, 11).date(): # Up to Black Panther
            return "Phase 4"
        elif release_date <= datetime(2025, 5, 14).date():  # Up to Thunderbolts
            return "Phase 5"
        else:
            return "Phase 6"
    except ValueError:
        return "Unknown Format"

def save_mcu_movies_to_csv():
    url = "https://api.themoviedb.org/3/discover/movie"
    
    # 420 = Marvel Studios, 7505 = Marvel Entertainment
    # Keyword 180547 = Marvel Cinematic Universe (MCU)
    params = {
        "with_companies": "420|7505",
        "with_keywords": "180547", # Limits strictly to MCU content
        "with_runtime.gte": "70",
        "page": 1,
        "language": "en-US",
        "sort_by": "release_date.asc"
    }    
    
    with open(filename, mode="w", newline="", encoding="utf-8") as file:
        writer = csv.writer(file)
        
        writer.writerow(["TMDB ID", "Title", "Release Date", "Group"])
        
        movie_count = 0
        
        while True:
            response = requests.get(url, headers=HEADERS, params=params)
            
            if response.status_code != 200:
                print(f"Error fetching data: {response.status_code}")
                break
                
            data = response.json()
            results = data.get("results", [])

            print("Results this page:", len(results))
            print("Total results:", data.get("total_results"))
            print("Total pages:", data.get("total_pages"))
            
            for item in results:
                
                movie_id = item.get("id")
                title = item.get("title")
                release_date = item.get("release_date")
                phase = get_mcu_phase(release_date)
                
                writer.writerow([movie_id, title, release_date, phase])
                movie_count += 1
                
            print(f"Saved page {params['page']} of {data.get('total_pages', 1)}...")
            
            if params["page"] >= data.get("total_pages", 1):
                break
                
            params["page"] += 1
            
    print(f"\nSuccess! Saved {movie_count} MCU movies to '{filename}'.")

if __name__ == "__main__":
    save_mcu_movies_to_csv()
