from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

# Get MongoDB connection
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client["trivia_db"]
questions_collection = db["questions"]


# trivia questions matching the categories
sample_questions = [
    # Science
    {
        "question": "What is the chemical symbol for gold?",
        "options": ["Go", "Gd", "Au", "Ag"],
        "correct_answer": "Au",
        "category": "Science",
    },
    {
        "question": "What gas do humans need to breathe?",
        "options": ["Hydrogen", "Carbon Dioxide", "Oxygen", "Nitrogen"],
        "correct_answer": "Oxygen",
        "category": "Science",
    },
    {
        "question": "What is the largest mammal in the world?",
        "options": ["Elephant", "Blue Whale", "Hippopotamus", "Giraffe"],
        "correct_answer": "Blue Whale",
        "category": "Science",
    },
    {
        "question": "Which country has the most active volcanoes?",
        "options": ["Indonesia", "United States", "Japan", "Chile"],
        "correct_answer": "Indonesia",
        "category": "Science",
    },
    {
        "question": "What is the largest organ on the human body?",
        "options": ["Brain", "Lungs", "Heart", "Skin"],
        "correct_answer": "Skin",
        "category": "Science",
    },
    {
        "question": "How many elements are on the periodic table?",
        "options": ["120", "118", "116", "117"],
        "correct_answer": "118",
        "category": "Science",
    },
    {
        "question": "What percentage of Earth is covered in water?",
        "options": ["75%", "80%", "71%", "68%"],
        "correct_answer": "71%",
        "category": "Science",
    },
    {
        "question": "Whose gravity causes Earth's ocean tides?",
        "options": ["The Moon's", "The Sun's", "Jupiter's", "Mars'"],
        "correct_answer": "The Moon's",
        "category": "Science",
    },
    {
        "question": "How old is our Sun?",
        "options": [
            "5.2 million years",
            "4.6 billion years",
            "2.5 billion",
            "6.8 million",
        ],
        "correct_answer": "4.6 billion years",
        "category": "Science",
    },
    {
        "question": "How many bones are found in the human body?",
        "options": ["190", "220", "206", "210"],
        "correct_answer": "206",
        "category": "Science",
    },
    {
        "question": "What is the strongest muscle in the human body?",
        "options": ["The soleus (below the calf)", "The jaw", "The heart", "Biceps"],
        "correct_answer": "The jaw",
        "category": "Science",
    },
    {
        "question": "What part of your body helps you keep your balance?",
        "options": ["Eyes", "Feet", "Arms", "Ears"],
        "correct_answer": "Ears",
        "category": "Science",
    },
    # History
    {
        "question": "In which year did World War II end?",
        "options": ["1943", "1945", "1947", "1950"],
        "correct_answer": "1945",
        "category": "History",
    },
    {
        "question": "Who was the first president of the United States?",
        "options": [
            "John Adams",
            "Thomas Jefferson",
            "George Washington",
            "Abraham Lincoln",
        ],
        "correct_answer": "George Washington",
        "category": "History",
    },
    # Math
    {
        "question": "What is 2+2?",
        "options": ["1", "2", "3", "4"],
        "correct_answer": "4",
        "category": "Math",
    },
    {
        "question": "What is 10 / 2?",
        "options": ["2", "3", "5", "10"],
        "correct_answer": "5",
        "category": "Math",
    },
    # Pop Culture
    {
        "question": "Who played Iron Man in the Marvel movies?",
        "options": ["Chris Evans", "Tom Holland", "Mark Ruffalo", "Robert Downey Jr."],
        "correct_answer": "Robert Downey Jr.",
        "category": "Pop Culture",
    },
    {
        "question": "Which singer is known for the song 'Shake It Off'?",
        "options": ["Katy Perry", "Taylor Swift", "Ariana Grande", "Selena Gomez"],
        "correct_answer": "Taylor Swift",
        "category": "Pop Culture",
    },
]

# check if questions already exist to avoid duplicates
existing_questions = list(questions_collection.find({}, {"question": 1}))
existing_questions_text = [q["question"] for q in existing_questions]

# filter out questions that already there
new_questions = [
    q for q in sample_questions if q["question"] not in existing_questions_text
]

if new_questions:
    # insert the new questions
    result = questions_collection.insert_many(new_questions)
    print(f"Inserted {len(result.inserted_ids)} new questions")
else:
    print("No new questions to insert")

# verify/check the questions in the database
all_questions = list(questions_collection.find({}, {"_id": 0}))
print(f"Total questions in database: {len(all_questions)}")
for i, q in enumerate(all_questions, 1):
    category = q.get("category", "Unknown")
    print(f"{i}. {q['question']} (Category: {category})")
