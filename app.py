from flask import Flask, request, jsonify, render_template
from groq import Groq
from dotenv import load_dotenv
import os
import json
import re

# =========================
# LOAD ENVIRONMENT VARIABLES
# =========================
load_dotenv()

# =========================
# FLASK APP
# =========================
app = Flask(__name__)

# =========================
# GROQ CLIENT
# =========================
client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/analyze", methods=["POST"])
def analyze():


    data = request.json

    code = data.get("code", "")

  
    language = data.get("language", "Python")


    prompt = f"""
You are an expert AI code reviewer.

Analyze this {language} code carefully.

Return ONLY a valid raw JSON object.

Do NOT return markdown.
Do NOT use backticks.
Do NOT write anything outside JSON.

JSON FORMAT:

{{
  "issues": [
    {{
      "title": "Bug title",
      "description": "Bug explanation"
    }}
  ],
  "fixedCode": "Complete corrected code",
  "explanation": "Friendly explanation of all fixes"
}}

If there are no bugs:
- return empty issues array
- return original code in fixedCode

CODE:
{code}
"""

    try:

     
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.3
        )

 
        raw_response = response.choices[0].message.content

        # REMOVE ```json ```
        cleaned_response = re.sub(
            r"```json|```",
            "",
            raw_response
        ).strip()

      
        result = json.loads(cleaned_response)

     
        return jsonify({
            "success": True,
            "result": result
        })

    except Exception as e:

       
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


if __name__ == "__main__":
    app.run(debug=True)