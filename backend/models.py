from config import db
from datetime import datetime, timezone


class Event(db.Model):
    __tablename__ = 'events'
    id = db.Column(db.Integer, primary_key=True)
    event_title = db.Column(db.String(50), unique=True, nullable=False)
    event_description = db.Column(db.String(1000), nullable=False)
    event_date = db.Column(db.DateTime(timezone=True), default = lambda: datetime.now(datetime.timezone.utc), nullable=False)
    event_location = db.Column(db.String(150), nullable=False)
    event_category = db.Column(db.String(50), nullable=False)
    is_finished = db.Column(db.Boolean, default=False, nullable=False)
    event_image_path  = db.Column(db.String(150), nullable=True) # TODO: make the image path not nullable
    created_by = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False) # Just an ID of a user who created it
    created_by_user = db.relationship('User', backref='created_events') # This is the User object not just ID
    participants = db.relationship('User', secondary='event_participants', back_populates='events')

    def to_json(self):
        return{
            "id": self.id,
            "eventTitle": self.event_title,
            "eventDescription": self.event_description,
            "eventDate": self.event_date.astimezone(timezone.utc).isoformat(),
            "eventLocation": self.event_location,
            "eventCategory": self.event_category,
            "isFinished": self.is_finished,
            "imagePath": self.event_image_path,
            "createdBy": self.created_by,
            "participants": [user.id for user in self.participants]
        }


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(20), nullable = False)
    user_surname = db.Column(db.String(40), nullable = False)
    user_email = db.Column(db.String(100), unique = True, nullable = False)
    password_hash = db.Column(db.String(64), nullable = False)
    events = db.relationship('Event', secondary='event_participants', back_populates='participants')

    def to_json(self):
        return{
            "id": self.id,
            "userName": self.user_name,
            "userSurname": self.user_surname,
            "userEmail": self.user_email,
        }

event_participants = db.Table(
    'event_participants',
    db.Column('event_id', db.Integer, db.ForeignKey('events.id'), primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True)
)


# ## Exmple:
# event = Event.query.first()
# user = event.created_by_user   # Go from Event to User

# user.created_events            # Go from User to all their Events