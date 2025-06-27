# app.py
from flask import Flask, request, jsonify
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Only needed for local testing if your frontend is served from another port

@app.route('/submit-contact', methods=['POST'])
def submit_contact():
    try:
        data = request.form

        conn = sqlite3.connect('contact.db')
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO contacts (first_name, last_name, email, phone, subject, message)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (
            data['firstName'],
            data['lastName'],
            data['email'],
            data.get('phone', ''),
            data['subject'],
            data['message']
        ))
        conn.commit()
        conn.close()

        return jsonify({"status": "success", "message": "Form submitted successfully!"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
