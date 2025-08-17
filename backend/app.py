from flask import Flask, request, jsonify
from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Get MongoDB URI from environment variables
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)

# Databases & Collections
db = client.test
collection = db.database1     # For /submit route
todos = db.todos              # For /submittodoitem route


# Route 1: Handle form submissions
@app.route('/submit', methods=['POST'])
def submit_data():
    try:
        name = request.form.get('name')
        email = request.form.get('email')

        print(f"Received: name={name}, email={email}")

        # Validation (fix: use OR instead of AND)
        if not name or not email:
            return jsonify({'error': 'Both fields are required'}), 400

        result = collection.insert_one({'name': name, 'email': email})
        print(f"Inserted ID: {result.inserted_id}")

        return jsonify({'message': 'Data submitted successfully'}), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500


# Route 2: Handle To-Do submissions
@app.route("/submittodoitem", methods=["POST"])
def submit_todo_item():
    try:
        data = request.get_json()
        itemName = data.get("itemName")
        itemDescription = data.get("itemDescription")

        if not itemName or not itemDescription:
            return jsonify({"error": "Both fields are required"}), 400

        todos.insert_one({"itemName": itemName, "itemDescription": itemDescription})
        return jsonify({"message": "To-Do Item saved successfully!"}), 201

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500


# Run the Flask app in debug mode if the script is executed directly
if __name__ == '__main__':
    app.run(port=5001, debug=True)
