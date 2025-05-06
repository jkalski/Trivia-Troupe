# 🎉 Trivia Troupe

![Trivia Troupe Logo](./assets/TriviaTroupeLogo.png)

A fun, browser-based trivia app built by college students! Play games in different categories or make your own trivia sets to challenge friends.

---

## 📚 Table of Contents
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

## 🔍 Overview

Trivia Troupe is a web trivia game where users can:
- Play questions in categories like Math, Science, History, and Pop Culture
- Create their own categories and questions
- Track scores and play against the clock
- Use the app on desktop or mobile

---

## ✨ Features

### User Features
- Sign up / log in
- Play trivia with multiple-choice questions
- View scores after each game
- Create your own trivia sets
- Toggle dark mode

### Developer Features
- Responsive design
- REST API with Flask
- MongoDB for data storage

---

## 🧰 Tech Stack

**Frontend**: HTML, CSS, JavaScript  
**Backend**: Python, Flask, MongoDB, PyMongo

---

## 🚀 Getting Started

### Prereqs
- Python 3.8+
- MongoDB
- Web browser

### Backend Setup
```bash
git clone https://github.com/yourusername/trivia-troupe.git
cd trivia-troupe
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install flask pymongo flask-cors python-dotenv bcrypt
