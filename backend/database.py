import os
import pymongo
from dotenv import load_dotenv

# Load environment .env
load_dotenv()

# Read .env file
MONGO_URI = os.getenv("MONGO_URI")

if not MONGO_URI:
    print("Error: MONGO_URI not found in .env file")
    exit(1)

# Create MongoDB client
client = pymongo.MongoClient(MONGO_URI)

# Select the database 
db = client["trivia_db"]  

try:
    print(client.server_info())  # This Checks if connection succeeds
    print("Connected successfully!")
except Exception as e:
    print(f"MongoDB Connection Error: {e}")
