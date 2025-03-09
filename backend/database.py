import os
import pymongo
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Read MongoDB URI from .env file
MONGO_URI = os.getenv("MONGO_URI")

if not MONGO_URI:
    print("Error: MONGO_URI not found in .env file")
    exit(1)

# Create MongoDB client
client = pymongo.MongoClient(MONGO_URI)

# Select the database (Change 'trivia_db' to your actual database name)
db = client["trivia_db"]  # <-- This line is important!

try:
    print(client.server_info())  # Check if connection succeeds
    print("Connected successfully!")
except Exception as e:
    print(f"MongoDB Connection Error: {e}")
