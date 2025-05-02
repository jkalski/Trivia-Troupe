from flask import Blueprint, jsonify, request
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

question_routes = Blueprint('question_routes', __name__)

# Get mongo from environment variables
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI) 
db = client["trivia_db"]
questions_collection = db["questions"]  

@question_routes.route('/questions', methods=['GET'])
def get_questions():
    category = request.args.get('category')
    custom_category_id = request.args.get('custom_category_id')

    if custom_category_id:
        # Get custom questions by category_id
        questions = list(questions_collection.find({"custom_category_id": custom_category_id}, {"_id": 0}))
    elif category:
        # Get standard category questions (custom_category_id is None)
        questions = list(questions_collection.find({
            "category": category,
            "custom_category_id": {"$exists": False}
        }, {"_id": 0}))
    else:
        # Get all standard questions (no custom categories)
        questions = list(questions_collection.find({
            "custom_category_id": {"$exists": False}
        }, {"_id": 0}))

    return jsonify(questions)