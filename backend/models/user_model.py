from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["trivia_db"]
users_collection = db["users"]

# Sample for user scores
user_schema = {
    "username": str,
    "score": int
}
