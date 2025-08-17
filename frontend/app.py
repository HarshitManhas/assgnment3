from flask import Flask, render_template, request, redirect, url_for
import requests

app = Flask(__name__)

BACKEND_URL = 'http://localhost:5001/submit'

@app.route('/')
def index():
    return render_template('form.html')

@app.route('/submit', methods=['POST'])
def submit_form():
    name = request.form.get('name')
    email = request.form.get('email')

    try:
        response = requests.post(BACKEND_URL, data={'name': name, 'email': email})

        if response.status_code == 200:
            return redirect(url_for('success'))
        else:
            return redirect(url_for('error'))

    except requests.exceptions.RequestException as e:
        return redirect("form.html", error=str(e))

@app.route('/success')
def success():
    return 'Data submitted successfully!'

@app.route('/error')
def error():
    return 'Error submitting data.'

if __name__ == '__main__':
    app.run(port=5000, debug=True)






