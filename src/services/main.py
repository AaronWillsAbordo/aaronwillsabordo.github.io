from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

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
    bot_response = my_model_generate_response(user_message)
    
    return {"response": bot_response}

def my_model_generate_response(message):
    # Replace with actual model logic
    return f"Returned: {message}"
