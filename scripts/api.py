import os
from dotenv import load_dotenv

load_dotenv(".env.local")

API_TOKEN = os.getenv("VITE_TMDB_TOKEN")

HEADERS = {
    "Authorization": f"Bearer {API_TOKEN}",
    "accept": "application/json"
}