from flask import request, jsonify
from config import app, db
from models import Event


# get
@app.route("/events", methods=["GET"])
def get_events():
    events = Event.query.all()
    json_events = list(map(lambda x: x.to_json(), events))
    return jsonify({"events": json_events}) # this also returns by default response code 200, no need to write it

# create
"""
Creates a new python class object corresponding to that entry we want to add.
Then we add this to the database session.
Then we commit - actually writes to the database permanently
"""
@app.route("/create_event", methods=["POST"])
def create_event():
    event_title = request.json.get("eventTitle")
    event_description = request.json.get("eventDescription")
    event_date = request.json.get("eventDate")

    if not event_title or not event_description or not event_date: # returns error message and error code 400 - 'bad request'
        return (
            jsonify({"message": "You must include a title, description and date"}),
            400,
        )

    new_event = Event(event_title = event_title, event_description = event_description, event_date = event_date)

    try:
        db.session.add(new_event)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "Event Created"}), 201 # status code 201 stands for created

# Update
@app.route("/update_event/<int:event_id>", methods=["PATCH"]) # here we pass the id of the user we want to update
def update_event(event_id):
    event = Event.query.get(event_id) # quering for the user with that id

    if not event:
        return jsonify({"message": "Event not found"}), 404 # 404 status code here for - not found event

    data = request.json
    event.event_title = data.get("eventTitle", event.event_title) # assigns the event_title of the event to the value
    event.event_description = data.get("eventDescription", event.event_description) # of the fisrName key that was found in the data (given in the json file)
    event.event_date = data.get("eventDate", event.event_date) # .get method return what was found in the "eventTitle" field otherwise keeps event.event_title not changed

    db.session.commit()

    return jsonify({"message": "Event updated"}), 200

# Delete
@app.route("/delete_event/<int:event_id>", methods=["DELETE"]) # here we pass the id of the user we want to delete
def delete_event(event_id):
    event = Event.query.get(event_id) # quering for the user with that id

    if not event:
        return jsonify({"message": "Event not found"}), 404 # 404 status code here for - not found event

    db.session.delete(event) # delete the event
    db.session.commit()

    return jsonify({"message": "Event deleted"}), 200

if __name__ == "__main__":
    with app.app_context(): # If we don't have the database then create it
        db.create_all()

    app.run(debug=True)
