from flask import Blueprint, jsonify

question_routes = Blueprint('question_routes', __name__)

# Sample questions
sample_questions = [
    {"question": "What is the capital of France?", "options": ["Paris", "London", "Berlin", "Madrid"], "correct_answer": "Paris"},
    {"question": "Who wrote 'To Kill a Mockingbird'?", "options": ["Harper Lee", "J.K. Rowling", "Ernest Hemingway", "Jane Austen"], "correct_answer": "Harper Lee"}
]

@question_routes.route('/questions', methods=['GET'])
def get_questions():
    return jsonify(sample_questions)
