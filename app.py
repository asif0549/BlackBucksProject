from flask import Flask, render_template, request
from chatbot_logic import get_response

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/get")
def get_bot_response():
    user_input = request.args.get('msg')
    return get_response(user_input)

if __name__ == "__main__":
    app.run(debug=True)
