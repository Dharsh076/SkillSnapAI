
from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
CORS(app)

openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.json
    job_text = data.get("text", "")

    if not job_text:
        return jsonify({"error": "No job description provided"}), 400

    prompt = f"""You are an AI assistant that analyzes job descriptions to identify skills.

Given the following job description text, extract and categorize the relevant skills into two categories:
1. Hard Skills – Technical or job-specific skills (e.g., Python, project management, AWS, SQL, etc.)
2. Soft Skills – Interpersonal or behavioral skills (e.g., communication, leadership, time management, etc.)

Return the results in the following JSON format:

{{
  "hard_skills": ["..."],
  "soft_skills": ["..."]
}}

Job Description:
"""{job_text}"""
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2
    )

    reply = response.choices[0].message["content"]
    return jsonify({"result": reply, "timestamp": datetime.now().isoformat()})
