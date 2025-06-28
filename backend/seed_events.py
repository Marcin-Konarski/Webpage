import json
from datetime import datetime
from config import db, app
from models import Event, User

# Read events from file
with open("events.json", "r") as f:
    events_data = json.load(f)

with app.app_context():
    creator = User.query.first()
    if not creator:
        print("No user found in DB. Create one first.")
        exit()

    for e in events_data:
        event = Event(
            event_title=e["title"],
            event_description=e["description"],
            event_date=datetime.strptime(e["date"], "%Y-%m-%d %H:%M"),
            event_location=e["location"],
            event_category=e["category"],
            event_image_path=None,
            created_by=creator.id,
            created_by_user=creator
        )
        db.session.add(event)

    db.session.commit()
    print("Events added.")

