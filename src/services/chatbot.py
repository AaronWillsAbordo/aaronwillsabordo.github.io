import pandas as pd
import torch
import torch.nn as nn
import numpy as np

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import pickle
import re

class ChatbotModel(nn.Module):
    def __init__(self, input_size, hidden_size, num_classes):
        super(ChatbotModel, self).__init__()
        self.fc1 = nn.Linear(input_size, hidden_size)
        self.fc2 = nn.Linear(hidden_size, hidden_size)
        self.fc3 = nn.Linear(hidden_size, num_classes)
        self.relu = nn.ReLU()
        self.dropout = nn.Dropout(0.3)
        
    def forward(self, x):
        x = self.relu(self.fc1(x))
        x = self.dropout(x)
        x = self.relu(self.fc2(x))
        x = self.dropout(x)
        x = self.fc3(x)
        return x

class Chatbot:
    def __init__(self):
        self.model = None
        self.vectorizer = None
        self.label_encoder = None
        self.responses = {
            'ask_about_person': "Aaron is maangas."
        }
    
    def preprocess_text(self, text):
        """Clean and preprocess text"""
        text = text.lower()
        text = re.sub(r'[^\w\s]', '', text)  # Remove punctuation
        text = re.sub(r'\s+', ' ', text).strip()  # Remove extra whitespace
        return text
    
    def train_model(self, csv_path="./chatbot_inputs.csv"):
        """Train the chatbot model"""
        # Load data
        try:
            df = pd.read_csv(csv_path)
        except FileNotFoundError:
            print(f"Error: Could not find {csv_path}")
            return False
            
        if not all(col in df.columns for col in ['question', 'intent']):
            raise ValueError("CSV must contain 'question' and 'intent' columns.")
        
        print(f"Loaded {len(df)} training examples")
        
        # Preprocess questions
        df['processed_question'] = df['question'].apply(self.preprocess_text)
        
        # Prepare features (TF-IDF)
        self.vectorizer = TfidfVectorizer(max_features=1000, stop_words='english')
        X = self.vectorizer.fit_transform(df['processed_question']).toarray()
        
        # Prepare labels
        self.label_encoder = LabelEncoder()
        y = self.label_encoder.fit_transform(df['intent'])
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42, stratify=y
        )
        
        # Convert to PyTorch tensors
        X_train = torch.FloatTensor(X_train)
        X_test = torch.FloatTensor(X_test)
        y_train = torch.LongTensor(y_train)
        y_test = torch.LongTensor(y_test)
        
        # Initialize model
        input_size = X_train.shape[1]
        hidden_size = 128
        num_classes = len(np.unique(y))
        
        self.model = ChatbotModel(input_size, hidden_size, num_classes)
        
        # Training setup
        criterion = nn.CrossEntropyLoss()
        optimizer = torch.optim.Adam(self.model.parameters(), lr=0.001)
        
        # Training loop
        epochs = 100
        self.model.train()
        
        print("Training model...")
        for epoch in range(epochs):
            optimizer.zero_grad()
            outputs = self.model(X_train)
            loss = criterion(outputs, y_train)
            loss.backward()
            optimizer.step()
            
            if (epoch + 1) % 20 == 0:
                print(f'Epoch [{epoch+1}/{epochs}], Loss: {loss.item():.4f}')
        
        # Evaluate model
        self.model.eval()
        with torch.no_grad():
            test_outputs = self.model(X_test)
            _, predicted = torch.max(test_outputs.data, 1)
            accuracy = (predicted == y_test).sum().item() / len(y_test)
            print(f'Test Accuracy: {accuracy:.2%}')
        
        print("Model training completed!")
        return True
    
    def predict_intent(self, text, confidence_threshold=0.85):
        """Predict intent for given text with confidence checking"""
        if self.model is None or self.vectorizer is None:
            return "unknown"
        
        # Preprocess and vectorize
        processed_text = self.preprocess_text(text)
        text_vector = self.vectorizer.transform([processed_text]).toarray()
        text_tensor = torch.FloatTensor(text_vector)
        
        # Check if input is too different from training data
        # Simple similarity check - if most TF-IDF values are zero, it's likely unrelated
        if np.sum(text_vector > 0) < 2:  # Less than 2 meaningful words
            return "unknown"
        
        # Predict
        self.model.eval()
        with torch.no_grad():
            output = self.model(text_tensor)
            probabilities = torch.softmax(output, dim=1)
            max_prob, predicted = torch.max(probabilities, 1)
            
            # Debug info (you can remove this later)
            print(f"Debug - Text: '{text}' | Confidence: {max_prob.item():.4f}")
            
            # Check confidence
            if max_prob.item() < confidence_threshold:
                return "unknown"
            
            predicted_label = self.label_encoder.inverse_transform([predicted.item()])[0]
        
        return predicted_label
    
    def generate_response(self, input_text):
        """
        Generate response based on input text
        input_text: str - The input text for which a response is to be generated.
        Returns a generated response based on the input text.
        """
        intent = self.predict_intent(input_text, confidence_threshold=0.95)
        
        if intent == "unknown":
            return "Message unrecognized. Will need further development..."
        elif intent in self.responses:
            return self.responses[intent]
        else:
            return "Message unrecognized. Will need further development..."
    
    def save_model(self, model_path="chatbot_model.pkl"):
        """Save the trained model and components"""
        model_data = {
            'model_state_dict': self.model.state_dict() if self.model else None,
            'vectorizer': self.vectorizer,
            'label_encoder': self.label_encoder,
            'responses': self.responses,
            'model_architecture': {
                'input_size': self.vectorizer.get_feature_names_out().shape[0] if self.vectorizer else None,
                'hidden_size': 128,
                'num_classes': len(self.label_encoder.classes_) if self.label_encoder else None
            }
        }
        
        with open(model_path, 'wb') as f:
            pickle.dump(model_data, f)
        print(f"Model saved to {model_path}")
    
    def load_model(self, model_path="chatbot_model.pkl"):
        """Load a pre-trained model"""
        try:
            with open(model_path, 'rb') as f:
                model_data = pickle.load(f)
            
            self.vectorizer = model_data['vectorizer']
            self.label_encoder = model_data['label_encoder']
            self.responses = model_data['responses']
            
            # Reconstruct model
            arch = model_data['model_architecture']
            if all(arch.values()):
                self.model = ChatbotModel(
                    arch['input_size'], 
                    arch['hidden_size'], 
                    arch['num_classes']
                )
                self.model.load_state_dict(model_data['model_state_dict'])
                self.model.eval()
                print(f"Model loaded from {model_path}")
                return True
        except FileNotFoundError:
            print(f"Model file {model_path} not found")
        return False

if __name__ == "__main__":
    # Initialize chatbot
    bot = Chatbot()
    
    # Train the model
    if bot.train_model("./chatbot_inputs.csv"):
        # Save the model
        bot.save_model()
        
        # Test the chatbot
        print("\n" + "="*50)
        print("TESTING CHATBOT")
        print("="*50)
        
        test_questions = [
            "Who is Aaron?",
            "Tell me about Aaron Wills R Abordo",
            "What do you know about Aaron?",
            "Who exactly is Aaron Abordo?",
            "What's the weather like today?",
            "How do I cook pasta?",
            "Tell me about machine learning"
        ]
        
        for question in test_questions:
            response = bot.generate_response(question)
            print(f"Q: {question}")
            print(f"A: {response}")
            print("-" * 30)