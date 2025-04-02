from flask import Blueprint, jsonify
from pymongo import MongoClient
from dotenv import load_dotenv
import os
from flask import Blueprint, jsonify, request


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

    if category:
        questions = list(questions_collection.find({"category": category}, {"_id": 0}))
    else:
        questions = list(questions_collection.find({}, {"_id": 0})) 

    return jsonify(questions)
