import requests
import csv
from pathlib import Path
from api import HEADERS

DATA_DIR = Path(__file__).parent.parent / "data"
DATA_DIR.mkdir(exist_ok=True)

filename = DATA_DIR / "mcu_tv.csv"

def save_mcu_shows_to_csv():
    url = "https://api.themoviedb.org/3/discover/tv"
    
    # Keyword 180547 = Marvel Cinematic Universe (MCU)
    params = {
        "with_companies": "420", 
        "with_keywords": "180547", # Limits strictly to Marvel content
        "with_networks": "2739",
        "without_genres": "99,10767",
        "page": 1,
        "language": "en-US",
        "sort_by": "first_air_date.asc"
    }    
    
    with open(filename, mode="w", newline="", encoding="utf-8") as file:
        writer = csv.writer(file)
    
        writer.writerow(["TMDB ID", "Title", "Release Date", "Group"])
        
        show_count = 0
        
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
                show_id = item.get("id")
                title = item.get("name")
                release_date = item.get("first_air_date")
                group = "Diney+ Era"

                writer.writerow([show_id, title, release_date, group])
                show_count += 1
                
            print(f"Saved page {params['page']} of {data.get('total_pages', 1)}...")
            
            if params["page"] >= data.get("total_pages", 1):
                break
                
            params["page"] += 1
            
    print(f"\nSuccess! Saved {show_count} MCU TV Shows to '{filename}'.")

if __name__ == "__main__":
    save_mcu_shows_to_csv()
