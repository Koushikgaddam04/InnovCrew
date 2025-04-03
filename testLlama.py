import requests
import json

def chat_with_llama(prompt, chat_history, model="llama3.2"):
    """
    Send a prompt along with the conversation history to the Ollama API 
    and get a response from the Llama 3.2 model.
    """
    url = "http://localhost:11434/api/generate"
    
    # Combine the previous conversation with the new prompt
    # Format: each message on a new line
    conversation = "\n".join(chat_history + [f"User: {prompt}"])
    
    data = {
        "model": model,
        "prompt": conversation,
        "stream": False
    }
    
    response = requests.post(url, json=data)
    
    if response.status_code == 200:
        return response.json()["response"]
    else:
        return f"Error: {response.status_code}, {response.text}"

def main():
    print("Llama 3.2 Chat (powered by Ollama)")
    print("Type 'exit' to quit")
    
    # Initialize chat history
    chat_history = []
    
    while True:
        user_input = input("You: ")
        if user_input.lower() in ["exit", "quit"]:
            print("Goodbye!")
            break
        
        # Get the model's response, including full conversation history
        response_text = chat_with_llama(user_input, chat_history)
        print(f"Llama 3.2: {response_text}")
        
        # Append new messages to the conversation history
        chat_history.append(f"User: {user_input}")
        chat_history.append(f"Llama 3.2: {response_text}")

if __name__ == "__main__":
    main()
