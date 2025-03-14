from pymongo import MongoClient

# Connect to MongoDB (ensure you have the correct URI in .env)
client = MongoClient("mongodb://localhost:27017/")
db = client["trivia_db"]
questions_collection = db["questions"]

# Sample structure for a trivia question
question_schema = {
    "question_text": str,
    "options": list,  # example: ["A) anser 1", "B) answer 2", "C) answer 3"]
    "correct_answer": str,  # example: "B) answer 2"
    "category": str  # example: "science"
}
