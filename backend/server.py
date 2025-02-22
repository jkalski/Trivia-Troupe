from flask import Flask, jsonify
from routes.questions import question_routes  # Import routes

app = Flask(__name__)

# Register routes
app.register_blueprint(question_routes)

@app.route('/')
def home():
    return jsonify({"message": "Trivia-Troupe backend is running!"})

if __name__ == '__main__':
    app.run(debug=True)
