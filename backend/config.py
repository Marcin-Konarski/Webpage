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
    print("""
.env file is required in order for app to run
The structure of the .env file is as follows:
```
SECRET_KEY=<secret key here this is just a placeholder>
SECURITY_PASSWORD_SALT=<security password salt here this is just a placeholder>
EMAIL_USER=venuo.mail@gmail.com
EMAIL_PASSWORD=<16 characters google app password here this is just a placeholder>
```

I also needed to run following commands in powershell to make it work:
```
$env:EMAIL_USER = "venuo.mail@gmail.com"
$env:EMAIL_PASSWORD = "<16 characters google app password inside quotes>"
```
""")

app = Flask(__name__) # Creats the app
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "http://localhost:5173"}})


app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydatabase.db" # Specifies the database
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
# app.config['SECRET_KEY'] = "U9CA2Dng5aqRYE9pqzh96esYDDtFAm26+Y3BdEllM"
app.config["SECRET_KEY"] = os.environ["SECRET_KEY"]
app.config["SECURITY_PASSWORD_SALT"] = os.environ["SECURITY_PASSWORD_SALT"]
app.config["UPLOADED_IMAGES_DEST"] = "./images/"
app.config["WTF_CSRF_ENABLED"] = False # CSRF authentication tokens disabled (at least for now)
app.config["SQLALCHEMY_ECHO"] = True
app.config["SESSION_TYPE"] = "filesystem" # "redis"
app.config["SESSION_PERMAMENT"] = False
app.config["SESSION_USE_SIGNER"] = True
app.config["SESSION_FILE_DIR"] = "flask_session"
# app.config["SESSION_REDIS"] = redis.from_url("redis://localhost:6379") # "redis://172.17.29.126:6379"

# For sending emails and email verification
app.config["MAIL_DEFAULT_SENDER"] = "noreply@flask.com"
app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 465
app.config["MAIL_USE_TLS"] = False
app.config["MAIL_USE_SSL"] = True
app.config["MAIL_DEBUG"] = False
app.config["MAIL_USERNAME"] = os.environ["EMAIL_USER"]
app.config["MAIL_PASSWORD"] = os.environ["EMAIL_PASSWORD"]

# Initialize Flask Login
login_manager = LoginManager(app)
login_manager.login_view = 'login' # Route the redirect when login is required
login_manager.login_message_category = 'info'

# Cookie Settings
app.config["SESSION_COOKIE_SECURE"] = True # True in production
app.config["SESSION_COOKIE_HTTPONLY"] = True
app.config["SESSION_COOKIE_SAMESITE"] = "None" # 'None' in production other option is 'Lax' 
app.config["SESSION_COOKIE_DOMAIN"] = None
app.config["SESSION_COOKIE_PATH"] = "/"
app.config["SESSION_PERMANENT"] = True
app.config['PERMANENT_SESSION_LIFETIME'] = 86400  # 24 hours        # datetime.timedelta(days=1)
app.config["SESSION_COOKIE_NAME"] = "session"


# @app.after_request
# def add_partitioned_cookie_attribute(response):
#     if 'Set-Cookie' in response.headers:
#         cookies = response.headers.getlist('Set-Cookie')
#         modified_cookies = []
#         for cookie in cookies:
#             if 'session=' in cookie and 'Partitioned' not in cookie:
#                 modified_cookies.append(cookie + '; Partitioned')
#             else:
#                 modified_cookies.append(cookie)
#         response.headers.pop('Set-Cookie')
#         for cookie in modified_cookies:
#             response.headers.add('Set-Cookie', cookie)
#     return response

bcrypt = Bcrypt(app)
server_session = Session(app)
db = SQLAlchemy(app) # Creates database instance
migrate = Migrate(app, db)


# .env file is required in order for app to run
# The structure of the .env file is as follows:
# SECRET_KEY=<secret key here this is just a placeholder>
# SECURITY_PASSWORD_SALT=<security password salt here this is just a placeholder>
# EMAIL_USER=venuo.mail@gmail.com
# EMAIL_PASSWORD=<16 characters google app password here this is just a placeholder>
