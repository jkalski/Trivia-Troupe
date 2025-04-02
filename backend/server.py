from flask import Flask, jsonify
from routes.questions import question_routes  # Import routes
from routes.users import user_routes  # Import routes
from database import db  # Import MongoDB connection

app = Flask(__name__)

# Register routes
app.register_blueprint(question_routes)
app.register_blueprint(user_routes)

@app.route('/')
def home():
    #Check MongoDB connection
    if db is not None:
        return jsonify({"message": "Trivia-Troupe backend is running!", "database": "Connected"})
    return jsonify({"message": "Trivia-Troupe backend is running!", "database": "Not Connected"})


if __name__ == '__main__':
    app.run(debug=True)
