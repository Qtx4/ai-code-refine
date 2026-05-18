from flask import Flask, request, jsonify, render_template
from groq import Groq
from dotenv import load_dotenv
import os
import json
import re

load_dotenv()

app = Flask(__name__)
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.json
    code = data.get("code", "")
    language = data.get("language", "Python")

    prompt = (
        f"You are an expert code reviewer. Analyze this {language} code carefully.\n\n"
        "Return ONLY a raw JSON object, no markdown, no backticks, no explanation outside JSON.\n\n"
        "Format:\n"
        "{\n"
        '  "issues": [\n'
        '    {"title": "short bug title", "description": "clear explanation"}\n'
        "  ],\n"
        '  "fixedCode": "the complete corrected code",\n'
        '  "explanation": "friendly explanation of all changes made and why"\n'
        "}\n\n"
        "If no bugs found, return empty issues array and original code as fixedCode.\n\n"
        f"Code to review:\n{code}"
    )

    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}]
        )
        raw = response.choices[0].message.content
        clean = re.sub(r"```json|```", "", raw).strip()
        result = json.loads(clean)
        return jsonify({"success": True, "result": result})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)