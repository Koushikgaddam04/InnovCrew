import requests
import json

def chat_with_llama(prompt, model="llama3.2"):
    """
    Send a prompt to the Ollama API and get a response from the Llama 3.2 model
    """
    url = "http://localhost:11434/api/generate"
    
    data = {
        "model": model,
        "prompt": prompt,
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
    
    
    while True:
        user_input = input("\nYou: ")
        
        if user_input.lower() == "exit":
            print("Goodbye!")
            break
        
        print("\nLlama 3.2: ", end="")
        response = chat_with_llama(user_input)
        print(response)

if __name__ == "__main__":
    main()