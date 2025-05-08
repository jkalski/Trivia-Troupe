from flask import Blueprint, request, jsonify
from pymongo import MongoClient
from dotenv import load_dotenv
import os
import bcrypt
from datetime import datetime

load_dotenv()

user_routes = Blueprint('user_routes', __name__)

MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client["trivia_db"]
users_collection = db["users"]

@user_routes.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if users_collection.find_one({"username": username}):
        return jsonify({"error": "Username already exists"}), 409

    hashed_pw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    users_collection.insert_one({
        "username": username,
        "email": email,
        "password": hashed_pw,
        "game_history": []  
    })

    return jsonify({"message": "User registered successfully"}), 201

@user_routes.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    user = users_collection.find_one({"username": username})
    if not user:
        return jsonify({"error": "Invalid username or password"}), 401

    if bcrypt.checkpw(password.encode('utf-8'), user['password']):
        return jsonify({"message": "Login successful", "username": username}), 200
    else:
        return jsonify({"error": "Invalid username or password"}), 401

# routes for settings functionality

@user_routes.route('/update-password', methods=['POST'])
def update_password():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    
    # Validate input
    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400
    
    # Find the user
    user = users_collection.find_one({"username": username})
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    # Hash the new password
    hashed_pw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    
    # Update the user's password
    result = users_collection.update_one(
        {"username": username},
        {"$set": {"password": hashed_pw}}
    )
    
    if result.modified_count == 1:
        return jsonify({"message": "Password updated successfully"}), 200
    else:
        return jsonify({"error": "Failed to update password"}), 500

@user_routes.route('/update-username', methods=['POST'])
def update_username():
    data = request.json
    current_username = data.get("current_username")
    new_username = data.get("new_username")
    
    # Validate input
    if not current_username or not new_username:
        return jsonify({"error": "Current and new username are required"}), 400
    
    # Check if new username already exists
    if users_collection.find_one({"username": new_username}):
        return jsonify({"error": "Username already exists"}), 409
    
    # Find the user
    user = users_collection.find_one({"username": current_username})
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    # Update the username
    result = users_collection.update_one(
        {"username": current_username},
        {"$set": {"username": new_username}}
    )
    
    if result.modified_count == 1:
        return jsonify({"message": "Username updated successfully"}), 200
    else:
        return jsonify({"error": "Failed to update username"}), 500

# New routes for history functionality

@user_routes.route('/history', methods=['GET'])
def get_history():
    username = request.args.get('username')
    
    if not username:
        return jsonify({"error": "Username is required"}), 400
    
    user = users_collection.find_one({"username": username})
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    # Return game history if it exists, otherwise return empty array
    history = user.get("game_history", [])
    
    # Calculate stats
    games_played = len(history)
    max_score = max([game.get("score", 0) for game in history]) if history else 0
    
    # Parse time strings and find the minimum
    best_time = "99:99"
    if history:
        for game in history:
            time_str = game.get("time", "99:99")
            if time_str < best_time:  # String comparison works for "MM:SS" format
                best_time = time_str
        
        if best_time == "99:99":
            best_time = "00:00"  # Default if no valid times found
    else:
        best_time = "00:00"
    
    return jsonify({
        "games_played": games_played,
        "max_score": max_score,
        "best_time": best_time,
        "history": history
    }), 200

@user_routes.route('/history', methods=['POST'])
def add_history():
    data = request.json
    username = data.get("username")
    category = data.get("category", "Unknown") 
    score = data.get("score")
    time = data.get("time")
    
    if not username or score is None or not time:
        return jsonify({"error": "Username, score, and time are required"}), 400
    
    # Convert score to integer if it's a string
    try:
        score = int(score)
    except (ValueError, TypeError):
        return jsonify({"error": "Score must be a valid number"}), 400
    
    # Create history record
    history_record = {
        "category": category,
        "score": score,
        "time": time,
        "date": datetime.now()
    }
    
    # Update user's history
    result = users_collection.update_one(
        {"username": username},
        {"$push": {"game_history": history_record}}
    )
    
    if result.modified_count == 1:
        return jsonify({"message": "History added successfully"}), 200
    else:
        return jsonify({"error": "Failed to add history"}), 500