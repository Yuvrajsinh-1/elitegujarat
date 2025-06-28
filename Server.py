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
        return render_template(f'{page}')
    except:
        return render_template('404.html'), 404

@app.route('/submit-contact', methods=['POST'])
def submit_contact():
    first_name = request.form.get('firstName')
    last_name = request.form.get('lastName')
    email = request.form.get('email')
    phone = request.form.get('phone')
    subject = request.form.get('subject')
    message = request.form.get('message')

    print("Contact form submitted:")
    print("Name:", first_name, last_name)
    print("Email:", email)
    print("Phone:", phone)
    print("Subject:", subject)
    print("Message:", message)

    # ✅ You can store in a database or send an email here

    return redirect(url_for('contact'))  # Redirect after form submission
