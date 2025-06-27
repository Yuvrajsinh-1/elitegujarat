from flask import Flask, render_template

app = Flask(__name__)

# Home page
@app.route('/')
def home():
    return render_template('index.html')

# Dynamic route to serve any other HTML file
@app.route('/<page>')
def other_pages(page):
    try:
        return render_template(f'{page}.html')
    except:
        return render_template('404.html'), 404

# Optional: 404 page
@app.errorhandler(404)
def not_found(e):
    return render_template('404.html'), 404
