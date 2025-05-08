# Trivia Troupe

![Trivia Troupe Logo](./assets/TriviaTroupeLogo.png)

A fun, browser-based trivia app built by college students! Play games in different categories or make your own trivia sets to challenge friends.

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [How to Use](#how-to-use)
- [Folder Breakdown](#folder-breakdown)
- [API Info](#api-info)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Trivia Troupe is a web trivia game where users can:
- Play questions in categories like Math, Science, History, and Pop Culture
- Create their own categories and questions
- Track scores and play against the clock
- Use the app on desktop or mobile

---

## Features

### User Features
- Sign up / log in  
  ![Login Screen](./assets/loginScreen.jpg)  
  *Simple and clean login screen*

- Choose from categories like Science, Math, Pop Culture, or create your very own category! 
  ![Category Screen](./assets/CategoryScreen.jpg)  
  *A look at how users pick trivia categories*

- Answer multiple-choice questions in timed challenges  
  ![Pop Culture Example](./assets/PopcultureexampleScreen.jpg)  
  *Sample questions from the Pop Culture category*

- View scores after each game
  ![Score Screen](./assets/ScoreScreen.png)
  
- Create your own trivia sets
  ![CreateScreen](./assets/CategoryCreate.png)
  ![createQuestion](./assets/QuestionCreate.png)
  
- Toggle dark mode
  ![DarkMode](./assets/DarkModeToggle.png)
  ![darkModeMain](./assets/DarkModeMainScreen.png)

### Developer Features
- Responsive design
- REST API with Flask
- MongoDB for data storage

---

## Tech Stack

**Frontend**: HTML, CSS, JavaScript  
**Backend**: Python, Flask, MongoDB, PyMongo

---

## Getting Started


### Requirements
- Python 3.8+
- MongoDB
- A web browser

### Backend Setup
```bash
git clone https://github.com/yourusername/trivia-troupe.git
cd trivia-troupe
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install flask pymongo flask-cors python-dotenv bcrypt
```

Perfect — here is the **rest of the Getting Started section**, continuing exactly where your snippet left off:

### Environment Variables
```bash
Create a `.env` file in the root of the project and add the following:

MONGO\_URI=mongodb://localhost:27017/

```

### Seed the Database
````

To load some sample trivia questions into your MongoDB:

```bash
cd backend
python seed_questions.py
````

### Start the Backend Server

Run the Flask backend server:

```bash
python server.py
```

### Frontend

Open `src/index.html` in your web browser.
For a smoother experience, you can also use a local development server like Live Server (VS Code extension) or Python’s built-in HTTP server.


## Folder Breakdown
```bash
├── assets
├── backend
│   ├── config.py
│   ├── database.py
│   ├── models
│   │   ├── question_model.py
│   │   └── user_model.py
│   ├── routes
│   │   ├── custom_categories.py
│   │   ├── questions.py
│   │   └── users.py
│   ├── seed_questions.py
│   └── server.py
└── src
    ├── about.html
    ├── add-questions.html
    ├── category.html
    ├── create-category.html
    ├── finalScore.html
    ├── history.html
    ├── index.html
    ├── mainScreen.html
    ├── manage-categories.html
    ├── questionPage.html
    ├── scripts
    ├── settings.html
    ├── styles
    └── team.html

```
