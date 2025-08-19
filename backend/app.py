from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import os
from dotenv import load_dotenv
import json

# Load .env and initialize app
load_dotenv()
app = Flask(__name__)
CORS(app)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()
    job_text = data.get("text", "")
    print("🔹 Received Text:", job_text)

    prompt = f"""
You are an expert HR analyst. From the job description below, extract and categorize key skills into:
1. Hard Skills (e.g. programming, tools, certifications)
2. Soft Skills (e.g. communication, teamwork)

Return in JSON format:
{{
  "hard_skills": [...],
  "soft_skills": [...]
}}

Job Description:
\"\"\"{job_text}\"\"\"
    """

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3,
        )

        content = response.choices[0].message.content
        print("✅ GPT Output:", content)

        try:
            # Try to parse content as JSON
            parsed = json.loads(content)
            return jsonify(parsed)
        except json.JSONDecodeError:
            return jsonify({"result": content})

    except Exception as e:
        print("❌ Error:", str(e))
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=10000, host="0.0.0.0")
