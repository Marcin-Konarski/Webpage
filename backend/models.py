from config import db

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    event_title = db.Column(db.String(80), unique=True, nullable=False) # 80 stands for max length of the string
    event_description = db.Column(db.String(300), unique=False, nullable=False)
    event_date = db.Column(db.String(120), unique=False, nullable=False)

    def to_json(self):
        return{
            "id": self.id,
            "eventTitle": self.event_title,
            "eventDescription": self.event_description,
            "eventDate": self.event_date
        }