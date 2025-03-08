import os
from dotenv import load_dotenv
from pymongo import MongoClient

# Load environment variables
load_dotenv()

# Get MongoDB URI from .env file
MONGO_URI = os.getenv("MONGO_URI")

# Connect to MongoDB
client = MongoClient(MONGO_URI)
db = client["trivia_db"]  # Explicitly specify the database name

# Collections
questions_collection = db["questions"]
users_collection = db["users"]

# Test connection
try:
    client.admin.command('ping')  
    print("Connected to MongoDB successfully!")
except Exception as e:
    print(f"MongoDB Connection Error: {e}")
