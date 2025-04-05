import json
import os
import time
import re
from datetime import datetime
import ollama

def load_submissions(file_path):
    """Load student submissions from a JSON file."""
    if os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as file:
            return json.load(file)
    return []

def save_grading_response(response, file_path="GradingResponse.json"):
    """Save graded responses to a file."""
    if os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as file:
            data = json.load(file)
    else:
        data = []
    
    data.append(response)
    with open(file_path, "w", encoding="utf-8") as file:
        json.dump(data, file, indent=4)

def extract_json(text):
    """Extract JSON from model response using regex."""
    match = re.search(r'\{.*\}', text, re.DOTALL)  # Extract content inside {}
    if match:
        try:
            return json.loads(match.group())  # Convert to JSON
        except json.JSONDecodeError:
            return None
    return None

def get_model_response(submission, retry=1):
    """Send student submission to the model and return a valid JSON response."""
    prompt = (
        "Your task is to grade student test submissions in a strict and meaningful manner. Grade the points at a scale of 0-10. If answer does not match with the question even a bit, do not hesitate to give a zero "
        "When you receive a submission, respond ONLY with a valid JSON object in this format:\n"
        "{\n"
        "  \"testTitle\": \"<string>\",\n"
        "  \"testId\": \"<ObjectId as string>\",\n"
        "  \"studentId\": \"<ObjectId as string>\",\n"
        "  \"responses\": [\n"
        "    {\n"
        "      \"question\": \"<string>\",\n"
        "      \"studentAnswer\": \"<string>\",\n"
        "      \"grade\": \"<string>\",\n"
        "      \"feedback\": \"<string>\"\n"
        "    }\n"
        "  ],\n"
        "  \"overallGrade\": \"<string>\",\n"
        "  \"overallFeedback\": \"<string>\",\n"
        "  \"createdAt\": \"<ISO date string>\"\n"
        "}\n"
        "Do NOT include any extra explanation, markdown, or text. Only return valid JSON."
    )
    
    test_prompt = f"Now grade this submission:\n{json.dumps(submission, indent=4)}"
    full_prompt = prompt + "\n\n" + test_prompt
    
    response = ollama.chat(model="gemma", messages=[{"role": "user", "content": full_prompt}])

    raw_content = response["message"]["content"]
    
    graded_response = extract_json(raw_content)
    if graded_response:
        return graded_response

    if retry > 0:
        print("❌ Invalid JSON response. Retrying...")
        return get_model_response(submission, retry - 1)

    print("❌ Failed to get valid JSON after retry.")
    return None

def main():
    """Main function to process all student submissions."""
    submissions = load_submissions("submission.json")
    
    for submission in submissions:
        graded_response = get_model_response(submission)
        if graded_response:
            save_grading_response(graded_response)
            print(f"✅ Grading for student {submission['studentId']} completed!")

        time.sleep(1)  # Delay to avoid overwhelming the model

if __name__ == "__main__":
    main()
