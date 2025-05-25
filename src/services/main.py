from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from chatbot import Chatbot 

app = FastAPI()

# Allow access from your React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for testing; restrict in production
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/chat")
async def chat_endpoint(req: Request):
    data = await req.json()
    user_message = data["message"]
    chatbot = Chatbot()
    chatbot.load_model("chatbot_model.pkl")
    bot_response = chatbot.generate_response(user_message)
    return {"response": bot_response}

