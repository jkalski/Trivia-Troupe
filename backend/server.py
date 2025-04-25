from flask import Flask, jsonify
from routes.questions import question_routes  # Import routes
from routes.users import user_routes  # Import routes
from routes.custom_categories import custom_category_routes  # Import routes
from database import db  # Import MongoDB connection
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Register routes
app.register_blueprint(question_routes)
app.register_blueprint(user_routes)
app.register_blueprint(custom_category_routes)

@app.route('/')
def home():
    #Check MongoDB connection
    if db is not None:
        return jsonify({"message": "Trivia-Troupe backend is running!", "database": "Connected"})
    return jsonify({"message": "Trivia-Troupe backend is running!", "database": "Not Connected"})


if __name__ == '__main__':
    app.run(debug=True)
