# Create a new route file: routes/custom_categories.py
from flask import Blueprint, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId
from dotenv import load_dotenv
import os
from datetime import datetime

load_dotenv()

custom_category_routes = Blueprint('custom_category_routes', __name__)

MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client["trivia_db"]
custom_categories_collection = db["custom_categories"]
questions_collection = db["questions"]

@custom_category_routes.route('/custom-categories', methods=['GET'])
def get_custom_categories():
    username = request.args.get('username')
    include_public = request.args.get('include_public', 'true') == 'true'
    
    # Filter criteria
    filter_criteria = {}
    if username:
        if include_public:
            # Get user's categories and public categories
            filter_criteria = {"$or": [{"creator": username}, {"is_public": True}]}
        else:
            # Get only user's categories
            filter_criteria = {"creator": username}
    
    categories = list(custom_categories_collection.find(filter_criteria, {"_id": 1, "name": 1, "creator": 1, "description": 1, "is_public": 1}))
    
    # Convert ObjectId to string for JSON serialization
    for category in categories:
        category["_id"] = str(category["_id"])
    
    return jsonify(categories)

@custom_category_routes.route('/custom-categories', methods=['POST'])
def create_custom_category():
    data = request.json
    name = data.get("name")
    creator = data.get("creator")
    description = data.get("description", "")
    is_public = data.get("is_public", False)
    
    # Validate required fields
    if not name or not creator:
        return jsonify({"error": "Name and creator are required"}), 400
    
    # Check if category name already exists for this user
    existing = custom_categories_collection.find_one({"name": name, "creator": creator})
    if existing:
        return jsonify({"error": "You already have a category with this name"}), 409
    
    # Create new category
    new_category = {
        "name": name,
        "creator": creator,
        "description": description,
        "is_public": is_public,
        "created_at": datetime.now()
    }
    
    result = custom_categories_collection.insert_one(new_category)
    
    return jsonify({
        "message": "Category created successfully",
        "category_id": str(result.inserted_id)
    }), 201

@custom_category_routes.route('/custom-categories/<category_id>/questions', methods=['POST'])
def add_question_to_category(category_id):
    data = request.json
    question_text = data.get("question")
    options = data.get("options")
    correct_answer = data.get("correct_answer")
    creator = data.get("creator")
    
    # Validate input
    if not question_text or not options or not correct_answer or not creator:
        return jsonify({"error": "Question, options, correct answer and creator are required"}), 400
    
    if len(options) < 2:
        return jsonify({"error": "At least 2 options are required"}), 400
    
    if correct_answer not in options:
        return jsonify({"error": "Correct answer must be one of the options"}), 400
    
    # Verify category exists
    try:
        category = custom_categories_collection.find_one({"_id": ObjectId(category_id)})
        if not category:
            return jsonify({"error": "Category not found"}), 404
        
        # Check if user is the creator of the category
        if category["creator"] != creator:
            return jsonify({"error": "You can only add questions to your own categories"}), 403
    except:
        return jsonify({"error": "Invalid category ID"}), 400
    
    # Create the question
    question = {
        "question": question_text,
        "options": options,
        "correct_answer": correct_answer,
        "category": category["name"],
        "creator": creator,
        "custom_category_id": category_id
    }
    
    result = questions_collection.insert_one(question)
    
    return jsonify({
        "message": "Question added successfully",
        "question_id": str(result.inserted_id)
    }), 201