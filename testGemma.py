from langchain.chat_models import ChatOllama
from langchain.schema import AIMessage, HumanMessage

# Load Gemma model
chat = ChatOllama(model="gemma")

# Store chat history
chat_history = []

def chat_with_gemma(user_input):
    global chat_history

    # Store user message
    chat_history.append(HumanMessage(content=user_input))

    # Send entire conversation history to Gemma
    response = chat.invoke(chat_history)

    # Store Gemma's response
    chat_history.append(AIMessage(content=response.content))

    return response.content

# Example chat loop
while True:
    user_input = input("You: ")
    if user_input.lower() in ["exit", "quit"]:
        break
    print("Gemma:", chat_with_gemma(user_input))
