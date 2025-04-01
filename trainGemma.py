import ollama
import os
import json

HISTORY_FILE = "chat_history.json"

# Load previous chat history (if exists)
if os.path.exists(HISTORY_FILE):
    with open(HISTORY_FILE, "r", encoding="utf-8") as file:
        try:
            chat_history = json.load(file)  # Load existing chat history
        except json.JSONDecodeError:
            chat_history = []  # If file is corrupted, reset history
else:
    chat_history = []  # Initialize empty history if no file exists

print("Chat history loaded. Start your conversation! (Type 'exit' or 'quit' to save and stop)")

while True:
    user_input = input("You: ")

    if user_input.lower() in ["exit", "quit"]:
        # Save history back to JSON file (appending new chats to old ones)
        with open(HISTORY_FILE, "w", encoding="utf-8") as file:
            json.dump(chat_history, file, indent=4)
        print("Chat history updated and saved. Exiting...")
        break

    # Append user input to history
    chat_history.append({"role": "user", "content": user_input})

    # Get response from Ollama (Gemma model)
    response = ollama.chat(model="gemma", messages=chat_history)

    # Extract response text and print
    response_text = response['message']['content']
    print(response_text)

    # Append response to history
    chat_history.append({"role": "assistant", "content": response_text})
