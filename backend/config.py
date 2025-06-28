from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_session import Session
from flask_login import LoginManager
from dotenv import load_dotenv
from datetime import datetime
from flask_migrate import Migrate
import redis
import os

try:
    load_dotenv()
except:
    print("Error loading .env file")

app = Flask(__name__)

CORS(app, 
     supports_credentials=True, 
     origins=[
         "https://venuo.mk0x.com", 
         "https://api-venuo.mk0x.com",
         "http://localhost:5173",
         "http://localhost:5000"
     ],
     allow_headers=["Content-Type", "Authorization", "X-Requested-With"],
     methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
     expose_headers=["Content-Type", "Authorization"]
)

# Rest of your configuration...
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydatabase.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY")
app.config["SECURITY_PASSWORD_SALT"] = os.environ.get("SECURITY_PASSWORD_SALT")
app.config["UPLOADED_IMAGES_DEST"] = "./images/"

# Session configuration
app.config["WTF_CSRF_ENABLED"] = False
app.config["SQLALCHEMY_ECHO"] = True
app.config["SESSION_TYPE"] = "filesystem"
app.config["SESSION_PERMAMENT"] = False
app.config["SESSION_USE_SIGNER"] = True
app.config["SESSION_FILE_DIR"] = "flask_session"

# SendGrid email configuration
app.config["MAIL_SERVER"] = "smtp.sendgrid.net"
app.config["MAIL_PORT"] = 587
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USE_SSL"] = False
app.config["MAIL_USERNAME"] = "apikey"
app.config["MAIL_PASSWORD"] = os.environ.get("SENDGRID_API_KEY")
app.config["MAIL_DEFAULT_SENDER"] = os.environ.get("EMAIL_USER")

# Initialize Flask Login
login_manager = LoginManager(app)
login_manager.login_view = 'login'
login_manager.login_message_category = 'info'

# Cookie Settings for production
app.config["SESSION_COOKIE_SECURE"] = True
app.config["SESSION_COOKIE_HTTPONLY"] = True
app.config["SESSION_COOKIE_SAMESITE"] = "None"
app.config["SESSION_COOKIE_DOMAIN"] = ".mk0x.com"
app.config["SESSION_COOKIE_PATH"] = "/"
app.config["SESSION_PERMANENT"] = True
app.config['PERMANENT_SESSION_LIFETIME'] = 86400
app.config["SESSION_COOKIE_NAME"] = "session"

# Initialize extensions
bcrypt = Bcrypt(app)
server_session = Session(app)
db = SQLAlchemy(app)
migrate = Migrate(app, db)


