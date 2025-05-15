from config import app, db
from models import Event, User

with app.app_context():
    events = Event.query.all()
    for event in events:
        print(event.to_json())

    users = User.query.all()
    for user in users:
        print({
            "id": user.id,
            "name": user.user_name,
            "surname": user.user_surname,
            "email": user.user_email,
            "active": user.is_confirmed,
        })
