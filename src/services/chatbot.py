import pandas as pd
import torch
import numpy as np

from torch.utils.data import Dataset, DataLoader
from transformers import BertTokenizer, BertForSequenceClassification
from transformers.optimization import AdamW
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
import joblib

# Load your CSV
chat_df = pd.read_csv("./chatbot_inputs.csv")
if not all(col in chat_df.columns for col in ['question', 'intent']):
    raise ValueError("CSV must contain 'question' and 'intent' columns.")

# Encode labels
label_encoder = LabelEncoder()
chat_df["label"] = label_encoder.fit_transform(chat_df["intent"])

# Tokenizer and device
tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Dataset class
class ChatDataset(Dataset):
    def __init__(self, texts, labels):
        self.encodings = tokenizer(texts, truncation=True, padding=True, max_length=64)
        self.labels = labels

    def __getitem__(self, idx):
        item = {k: torch.tensor(v[idx]) for k, v in self.encodings.items()}
        item['labels'] = torch.tensor(self.labels[idx])
        return item

    def __len__(self):
        return len(self.labels)

# Split and create dataset
train_texts, val_texts, train_labels, val_labels = train_test_split(chat_df["question"], chat_df["label"], test_size=0.2, random_state=42)
train_dataset = ChatDataset(train_texts.tolist(), train_labels.tolist())
val_dataset = ChatDataset(val_texts.tolist(), val_labels.tolist())

train_loader = DataLoader(train_dataset, batch_size=4, shuffle=True)
val_loader = DataLoader(val_dataset, batch_size=4)

# Load model
model = BertForSequenceClassification.from_pretrained("bert-base-uncased", num_labels=len(label_encoder.classes_))
model.to(device)

# Optimizer
optimizer = AdamW(model.parameters(), lr=5e-5)

# Training loop
model.train()
for epoch in range(3):
    total_loss = 0
    for batch in train_loader:
        batch = {k: v.to(device) for k, v in batch.items()}
        outputs = model(**batch)
        loss = outputs.loss
        loss.backward()
        optimizer.step()
        optimizer.zero_grad()
        total_loss += loss.item()
    print(f"Epoch {epoch+1} - Loss: {total_loss:.4f}")

# Save model and label encoder
model.save_pretrained("./chatbot_intent_model")
tokenizer.save_pretrained("./chatbot_intent_model")
joblib.dump(label_encoder, "./chatbot_intent_model/label_encoder.pkl")

class Chatbot:
    def __init__(self, model_path, device):
        self.tokenizer = BertTokenizer.from_pretrained(model_path)
        self.model = BertForSequenceClassification.from_pretrained(model_path)
        self.model.to(device)
        self.device = device
        self.label_encoder = joblib.load(f"{model_path}/label_encoder.pkl")

    def generate_response(self, input_text):
        inputs = self.tokenizer(input_text, return_tensors="pt", truncation=True, padding=True).to(self.device)
        with torch.no_grad():
            outputs = self.model(**inputs)
            predicted_label_id = torch.argmax(outputs.logits, dim=1).item()
            intent = self.label_encoder.inverse_transform([predicted_label_id])[0]

        # Return response based on predicted intent
        if intent == "ask_about_person":
            return "Aaron is maangas."
        else:
            return f"I'm not sure how to respond to that."

class chatbot:
    def __init__(self, model, tokenizer, device):
        self.model = model
        self.tokenizer = tokenizer
        self.device = device

    def generate_response(self, input_text):
        """
        input_text: str - The input text for which a response is to be generated.
        Returns a generated response based on the input text.

        generated response should be, when user's input 'intent' is 'ask_about_person':
        response should be "Aaron is maangas."
        """
        # Tokenize the input text
        inputs = self.tokenizer.encode(input_text, return_tensors='pt').to(self.device)

        # Generate a response using the model
        with torch.no_grad():
            outputs = self.model.generate(inputs, max_length=50, num_return_sequences=1)

        # Decode the generated response
        response = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        return response