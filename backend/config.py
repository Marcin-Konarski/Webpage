from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_session import Session
from dotenv import load_dotenv
import redis
import os

load_dotenv()

app = Flask(__name__) # Creats the app
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "http://localhost:5173"}})

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydatabase.db" # Specifies the database
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
# app.config['SECRET_KEY'] = "U9CA2Dng5aqRYE9pqzh96esYDDtFAm26+Y3BdEllM"
app.config["SECRET_KEY"] = os.environ["SECRET_KEY"]
app.config["UPLOADED_IMAGES_DEST"] = "./images/"
app.config["WTF_CSRF_ENABLED"] = False # CSRF authentication tokens disabled (at least for now)
app.config["SQLALCHEMY_ECHO"] = True
app.config["SESSION_TYPE"] = "redis"
app.config["SESSION_PERMAMENT"] = False
app.config["SESSION_USE_SIGNER"] = True
app.config["SESSION_REDIS"] = redis.from_url("redis://127.0.0.1:6379") # "redis://127.0.0.1:6379" # "redis://172.17.29.126:6379"

bcrypt = Bcrypt(app)
server_session = Session(app)

db = SQLAlchemy(app) # Creates database instance
