from flask import Blueprint, request, jsonify
from pymongo import MongoClient
from dotenv import load_dotenv
import os
import bcrypt

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
        "password": hashed_pw
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