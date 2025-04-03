import ollama
import pymongo
import json

# MongoDB setup
MONGO_URI = "mongodb://localhost:27017/"  # Update if needed
db_client = pymongo.MongoClient(MONGO_URI)
db = db_client["education_db"]  # Database name
collection = db["student_assignments"]  # Collection name

def chat_with_gemma(prompt):
    """
    Sends a prompt to the Gemma model via Ollama and ensures response follows the required JSON schema.
    """
    response = ollama.chat(
        model="gemma",
        messages=[{"role": "user", "content": prompt}],
    )
    
    response_text = response['message']['content']
    
    try:
        # Ensure the response is valid JSON
        formatted_response = json.loads(response_text)
        
        # Validate if response follows the required schema
        required_keys = {"student_id", "name", "assignments", "feedback", "gradeArray"}
        if not all(key in formatted_response for key in required_keys):
            raise ValueError("Response does not match required schema.")
        
        # Insert into MongoDB
        collection.insert_one(formatted_response)
        print("Response saved to MongoDB.")
    
    except (json.JSONDecodeError, ValueError) as e:
        print("Invalid response format:", e)
        return None
    
    return formatted_response

# Chat loop
while True:
    user_input = input("You: ")
    if user_input.lower() in ["exit", "quit"]:
        print("Goodbye!")
        break
    
    # Send user input to Gemma
    gemma_response = chat_with_gemma(user_input)
    
    if gemma_response:
        print("Gemma Response:", json.dumps(gemma_response, indent=4))
