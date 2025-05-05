from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


app = Flask(__name__) # Creats the app
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "http://localhost:5173"}})

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydatabase.db" # Specifies the database
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['SECRET_KEY'] = "dhfehfuwhgurgburghrurjgiroehg" # Not specified in the tutorial tho I bellieve that I need to keep this in a file, not hardcoded
app.config["UPLOADED_IMAGES_DEST"] = "./images/"
app.config["WTF_CSRF_ENABLED"] = False # CSRF authentication tokens disabled (at least for now)

db = SQLAlchemy(app) # Creates database instance
