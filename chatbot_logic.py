import json
import random

with open('intents.json', encoding='utf-8') as file:
    data = json.load(file)

def get_response(user_input):
    user_input = user_input.lower()
    for intent in data['intents']:
        if any(pattern.lower() in user_input for pattern in intent['patterns']):
            return random.choice(intent['responses'])
    return "I'm not sure I understand. Can you rephrase?"
