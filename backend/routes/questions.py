from flask import Blueprint, jsonify
from pymongo import MongoClient
from dotenv import load_dotenv
import os


load_dotenv()

question_routes = Blueprint('question_routes', __name__)

# Get MongoDB URI from environment variables
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI) 
db = client["trivia_db"]
questions_collection = db["questions"]  

@question_routes.route('/questions', methods=['GET'])
def get_questions():
    questions = list(questions_collection.find({}, {"_id": 0}))  # Fetch questions, exclude MongoDB _id field
    return jsonify(questions)
