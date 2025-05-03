from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


app = Flask(__name__) # Creats the app
# CORS(app)
# CORS(app, resources={r"/*": {"origins": "*"}})
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})


app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydatabase.db" # Specifies the database
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app) # Creates database instance
