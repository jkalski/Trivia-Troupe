from pymongo import MongoClient
from datetime import datetime

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["trivia_db"]
users_collection = db["users"]

# Updated schema for users with game history
user_schema = {
    "username": str,
    "email": str,
    "password": bytes,  # This is for bcrypt hashed passwords
    "game_history": list  # Will store history of games played
}

# Schema for a single game history record
game_history_schema = {
    "category": str,      # Category played (e.g., "Science", "History")
    "score": int,         # Final score
    "time": str,          # Time taken in MM:SS format
    "date": datetime      # When the game was played
}