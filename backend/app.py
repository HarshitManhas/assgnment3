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
# Initialize MongoClient
client = MongoClient(MONGO_URI)
# Select the database named 'test'
db = client.test
# Select the collection named 'database1' within the 'test' database
collection = db.database1


# Route for handling form submissions
@app.route('/submit', methods=['POST'])
def submit_data():
    try:
        name = request.form.get('name')
        email = request.form.get('email')

        print(f"Received: name={name}, email={email}")

        if not name and not email:
            return jsonify({'error': 'Both fields are required'}), 400

        result = collection.insert_one({'name': name, 'email': email})
        print(f"Inserted ID: {result.inserted_id}")

        return jsonify({'message': 'Data submitted successfully'}), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500


# Run the Flask app in debug mode if the script is executed directly
if __name__ == '__main__':
    app.run(port=5001, debug=True)