import os
import pymongo
from dotenv import load_dotenv

# Ensure .env file is loaded correctly
load_dotenv(dotenv_path="../.env")  

# Read mongo URI from .env
MONGO_URI = os.getenv("MONGO_URI")

if not MONGO_URI:
    print(" Error: MONGO_URI not found in .env file")
    exit(1)

try:
    # Create mongo client
    client = pymongo.MongoClient(MONGO_URI)

    # Selects the database
    db = client["trivia_db"]  

    # Test duh connection
    client.admin.command("ping")  
    print(" Successfully connected to MongoDB Atlas!")

except Exception as e:
    print(f" MongoDB Connection Error: {e}")
    db = None  
