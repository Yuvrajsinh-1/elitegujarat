from flask import Flask, render_template
import os

# Tell Flask to look for templates in the current directory
app = Flask(__name__, template_folder='.')

@app.route('/')
def index():
    return render_template('index.html')
