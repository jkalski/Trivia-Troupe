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
            "2.5 billion years",
            "6.8 million years",
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
    {
        "question": "What is the smallest unit of matter called?",
        "options": ["Atom", "Molecule", "Elements", "Compound"],
        "correct_answer": "Atom",
        "category": "Science",
    },
    {
        "question": "What is the unit for measuring electricity?",
        "options": ["Joule", "Ohm", "Ampere", "Watt"],
        "correct_answer": "Watt",
        "category": "Science",
    },
    {
        "question": "What does a Geiger counter measure?",
        "options": ["Mass", "Volume", "Radiation", "Pressure"],
        "correct_answer": "Radiation",
        "category": "Science",
    },
    {
        "question": "Who discovered penicillan?",
        "options": ["Alexander Fleming", "Albert Einstein", "Issac Newton", "Charles Darwin"],
        "correct_answer": "Alexander Fleming",
        "category": "Science",
    },
    {
        "question": "Which planet in our solar system has the most moons?",
        "options": ["Jupiter", "Saturn", "Uranus", "Neptune"],
        "correct_answer": "Saturn",
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
    {
        "question": "How many years did the 100 years war last?",
        "options": ["100", "116", "99", "110"],
        "correct_answer": "110",
        "category": "History",
    },
    {
        "question": "How many days in a week were there in ancient Roman times?",
        "options": ["8", "7", "5", "6"],
        "correct_answer": "8",
        "category": "History",
    },
    {
        "question": "How many U.S. presidents have been assassinated?",
        "options": ["5", "4", "3", "0"],
        "correct_answer": "4",
        "category": "History",
    },
    {
        "question": "Who was shot outside the Hilton Hotel in Washington on March 30th, 1981?",
        "options": ["Abraham Lincoln", "William McKinley", "John F. Kennedy",  "Ronald Reagon"],
        "correct_answer": "Ronald Reagon",
        "category": "History",
    },
    {
        "question": "Which King of England was executed in 1649 during the English Civil War?",
        "options": ["Charles II", "Charles III", "Charles IV", "Charles I"],
        "correct_answer": "Charles I",
        "category": "History",
    },
    {
        "question": "Who was the first man to walk on the moon?" ,
        "options": ["Neil Armstrong", "Buzz Aldrin", "James Irwin", "Alan Shepard"],
        "correct_answer": "Neil Armstrong",
        "category": "History",
    },
    {
        "question": "What year did the war of 1812 end?" ,
        "options": ["1813", "1815", "1817", "1814"],
        "correct_answer": "1815",
        "category": "History",
    },
    {
        "question": "The ancient city of Rome was built on how many hills?" ,
        "options": ["5", "0", "7", "4"],
        "correct_answer": "7",
        "category": "History",
    },
    {
        "question": "Who built the first car in America?" ,
        "options": ["William Durant", "Ransom Olds", "The Dodge Brothers", "Henry Ford"],
        "correct_answer": "Henry Ford",
        "category": "History",
    },
    {
        "question": "Which war took place between 1950 and 1953?",
        "options": ["Vietnam War", "Korean War", "World War II", "The Gulf War"],
        "correct_answer": "Korean War",
        "category": "History",
    },
    {
        "question": "What was the first human civilization?",
        "options": ["Mesopotamia", "Ancient Egypt", "Ancient China", "Indus Valley Civilization"],
        "correct_answer": "Mesopotamia",
        "category": "History",
    },
    {
        "question": "Which century did the French Revolution take place?",
        "options": ["The 19th", "The 17th", "The 15th", "The 18th"],
        "correct_answer": "The 18th",
        "category": "History",
    },
    {
        "question": "In which war did the Battle of Bulge take place?",
        "options": ["World War I", "Civil War in America", "World War II", "Gulf War"],
        "correct_answer": "World War II",
        "category": "History",
    },
    {
        "question": "In which year did World War I begin?",
        "options": ["1914", "1920", "1910", "1918"],
        "correct_answer": "1914",
        "category": "History",
    },
    {
        "question": "Who was not a member of the Allied Powers during World War II?",
        "options": ["Britain", "Italy", "United States", "China"],
        "correct_answer": "Italy",
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
    {
        "question": "What is the smallest prime number?",
        "options": ["3", "2", "5", "1"],
        "correct_answer": "2",
        "category": "Math",
    },
    {
        "question": "What is the sum of the interior angles of any triangle?",
        "options": ["360 degrees", "270 degrees", "90 degrees", "180 degrees"],
        "correct_answer": "180 degrees",
        "category": "Math",
    },
    {
        "question": "Which field of math is concerned with cosines, sines, and tangents?",
        "options": ["Trigonometry", "Geometry", "Algebra", "Calculus"],
        "correct_answer": "Trigonometry",
        "category": "Math",
    },
    {
        "question": "What famous theorem is associated with right angled triangles?",
        "options": ["Law of Sines", "Euler's Formula", "Law of Cosines", "Pythagorean Theorem"],
        "correct_answer": "Pythagorean Theorem",
        "category": "Math",
    },
    {
        "question": "What is the derivative of of x^2?",
        "options": ["x", "2x", "2", "x^2"],
        "correct_answer": "2x",
        "category": "Math",
    },
    {
        "question": "What is the name of the sequence where each number is the sum of the two preceding ones, starting with 0 and 1?",
        "options": ["Fibonacci Sequence", "Lucas Sequence", "Arithmetic Sequence", "Recaman's Sequence"],
        "correct_answer": "Fibonacci Sequence",
        "category": "Math",
    },
    {
        "question": "What is the Roman numeral for 50?",
        "options": ["M", "D", "L", "C"],
        "correct_answer": "L",
        "category": "Math",
    },
    {
        "question": "What is the next prime number after 13?",
        "options": ["15", "19", "21", "17"],
        "correct_answer": "17",
        "category": "Math",
    },
    {
        "question": "If f(x) = 2x + 3, what is f(5)?",
        "options": ["20", "13", "10", "15"],
        "correct_answer": "13",
        "category": "Math",
    },
    {
        "question": "What number is known as the golden ratio?",
        "options": ["1.618", "3.141", "2.718", "4.967"],
        "correct_answer": "1.618",
        "category": "Math",
    },
    {
        "question": "How many edges does a cube have?",
        "options": ["10", "16", "12", "14"],
        "correct_answer": "12",
        "category": "Math",
    },
    {
        "question": "What is the name of a number that is the sum of its proper divisors (excluding itself)?",
        "options": ["Perfect Number", "Prime Number", "Composite Number", "Natural Number"],
        "correct_answer": "Perfect Number",
        "category": "Math",
    },
    {
        "question": "How many diagonals does a regular hexagon have?",
        "options": ["10", "9", "7", "6"],
        "correct_answer": "9",
        "category": "Math",
    },
    {
        "question": "What is the term for a number that is not a fraction or a decimal?",
        "options": ["Integer", "Rational Number", "Irrational Number", "Whole Number"],
        "correct_answer": "Whole Number",
        "category": "Math",
    },
    {
        "question": "What is the sum of the interior angles in a pentagon?",
        "options": ["700 degrees", "590 degrees", "540 degrees", "650 degrees"],
        "correct_answer": "540 degrees",
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
    {

        "question": "Which year did the the Sony Playstation Release in North America?",
        "options": ["1985", "1990", "2002", "1995"],
        "correct_answer": "1995",
        "category": "Pop Culture",
    },
    {
        "question": "What year was the first iPhone released in the United States?",
        "options": ["2000", "1999", "2005", "2007"],
        "correct_answer": "2007",
        "category": "Pop Culture",
    },
    {
        "question": "Tom Kenny voices which popular TV cartoon character?",
        "options": ["Bart Simpson", "Peter Griffin", "Sonic the Hedgehog", "Spongebob Squarepants"],
        "correct_answer": "Spongebob Squarepants",
        "category": "Pop Culture",
    },
    {
        "question": "Which year was Twitter launched?",
        "options": ["2005", "2006", "2008", "2009"],
        "correct_answer": "2006",
        "category": "Pop Culture",
    },
    {
        "question": "“Phone a Friend” is an option for contestants of what popular 2000's game show?",
        "options": ["Who Wants to Be a Millionaire", "Let's Make a Deal", "Wheel of Fortune", "Jeopardy"],
        "correct_answer": "Who Wants to Be a Millionaire",
        "category": "Pop Culture",
    },
    {
        "question": "In Lord of the Rings, the role of Gandalf is played by which actor?",
        "options": ["Elijah Wood", "Orlando Bloom", "Ian McKellen", "Ian Holm"],
        "correct_answer": "Ian McKellen",
        "category": "Pop Culture",
    },
    {
        "question": "What Steven Spielber movie for Best Picture in 2022?",
        "options": ["The Post", "Ready Player One", "The Fabelmans", "West Side Story"],
        "correct_answer": "West Side Story",
        "category": "Pop Culture",
    },
    {
        "question": "Beyonce was born in what Texas city?",
        "options": ["Dallas", "Houston", "Austin", "San Antonio"],
        "correct_answer": "Houstan",
        "category": "Pop Culture",
    },
    {
        "question": "What is the highest grossing film of all time?",
        "options": ["Avatar", "Avengers: Endgame", "Titanic", "The Lion King"],
        "correct_answer": "Avatar",
        "category": "Pop Culture",
    },
    {
        "question": "Which actor played Batman in the 1989 film directed by Tim Burton?",
        "options": ["Ben Affleck", "George Clooney", "Adam West", "Michael Keaton"],
        "correct_answer": "Michael Keaton",
        "category": "Pop Culture",
    },
    {
        "question": "Which social media platform was founded by Mark Zuckerberg in 2004 and has since become one of the most popular and influential platforms worldwide?",
        "options": ["Twitter", "Instagram", "Facebook", "TikTok"],
        "correct_answer": "Facebook",
        "category": "Pop Culture",
    },
    {
        "question": "What is the name of the NFL quarterback who won seven Super Bowl titles with the New England Patriots?",
        "options": ["Peyton Manning", "Tom Brady", "Aaron Rodgers", "Drew Brees"],
        "correct_answer": "Tom Brady",
        "category": "Pop Culture",
    },
    {
        "question": "Who famously interrupted Taylor Swift's acceptance speech at the 2009 MTV Video Music Awards, sparking controversy and backlash?",
        "options": ["Kanye West", "Eminem", "Nicki Minaj", "Jay-Z"],
        "correct_answer": "Kanye West",
        "category": "Pop Culture",
    },
    {
        "question": "What is the name of the social media app that allows users to create short-form videos set to music?",
        "options": ["Vine", "Instagram", "Tiktok", "Twitter"],
        "correct_answer": "TikTok",
        "category": "Pop Culture",
    },
    {
        "question": "Which legendary musician was known as the “King of Pop”?",
        "options": ["Elvis Presley", "Elton John", "Queen", "Michael Jackson"],
        "correct_answer": "Michael Jackson",
        "category": "Pop Culture",
    },
    {
        "question": "Who won the Best Actor Oscar for his role in The Revenant in 2016?",
        "options": ["Tom Hardy", "Leonardo DiCaprio", "Will Poulter", "Paul Anderson"],
        "correct_answer": "Leonardo DiCaprio",
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
