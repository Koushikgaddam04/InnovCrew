from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    prompt = data.get("prompt", "")
    
    llama_api_url = "http://localhost:11434/api/generate"  # Llama 3.2 API URL
    payload = {
        "model": "llama3.2",
        "prompt": prompt,
        "stream": False
    }

    try:
        response = requests.post(llama_api_url, json=payload)
        if response.status_code == 200:
            model_reply = response.json().get("response", "No response received")
        else:
            model_reply = f"Error from Llama: {response.status_code}"
    except Exception as e:
        model_reply = f"API request failed: {str(e)}"

    return jsonify({"reply": model_reply})

if __name__ == "__main__":
    app.run(debug=True)
