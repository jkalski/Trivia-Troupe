from pymongo import MongoClient
from bson.objectid import ObjectId

# Connect to MongoDB (ensure you have the correct URI in .env)
client = MongoClient("mongodb://localhost:27017/")
db = client["trivia_db"]
questions_collection = db["questions"]

# Updated structure for a trivia question
question_schema = {
    "question_text": str,
    "options": list,  # example: ["A) answer 1", "B) answer 2", "C) answer 3"]
    "correct_answer": str,  # example: "B) answer 2"
    "category": str,  # example: "science"
    "creator": str,  # Username of creator (None or "system" for default questions)
    "custom_category_id": str  # ObjectId reference to custom category (None for default)
}