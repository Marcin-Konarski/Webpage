from flask import request, jsonify
from config import app, db
from models import Contact

# CRUD - Create Update Delete
# - first_name
# - last_name
# - email


# get
@app.route("/contacts", methods=["GET"])
def get_contacts():
    contacts = Contact.query.all()
    json_contacts = list(map(lambda x: x.to_json(), contacts))
    return jsonify({"contacts": json_contacts}) # this also returns by default response code 200, no need to write it

# create
"""
Creates a new python class object corresponding to that entry we want to add.
Then we add this to the database session.
Then we commit - actually writes to the database permanently
"""
@app.route("/create_contact", methods=["POST"])
def create_contact():
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    email = request.json.get("email")

    if not first_name or not last_name or not email: # returns error message and error code 400 - 'bad request'
        return (
            jsonify({"message": "You must include a first name, last name and email"}),
            400,
        )

    new_contact = Contact(first_name = first_name, last_name = last_name, email = email)

    try:
        db.session.add(new_contact)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "User Created"}), 201 # status code 201 stands for created

# Update
@app.route("/update_contact/<int:user_id>", methods=["PATCH"]) # here we pass the id of the user we want to update
def update_contact(user_id):
    contact = Contact.query.get(user_id) # quering for the user with that id

    if not contact:
        return jsonify({"message": "User not found"}), 404 # 404 status code here for - not found contact

    data = request.json
    contact.first_name = data.get("firstName", contact.first_name) # assigns the first_name of the contact to the value
    contact.last_name = data.get("lastName", contact.last_name) # of the fisrName key that was found in the data (given in the json file)
    contact.email = data.get("email", contact.email) # .get method return what was found in the "firstName" field otherwise keeps contact.first_name not changed

    db.session.commit()

    return jsonify({"message": "User updated"}), 200

# Delete
@app.route("/delete_contact/<int:user_id>", methods=["DELETE"]) # here we pass the id of the user we want to delete
def delete_contact(user_id):
    contact = Contact.query.get(user_id) # quering for the user with that id

    if not contact:
        return jsonify({"message": "User not found"}), 404 # 404 status code here for - not found contact

    db.session.delete(contact) # delete the contact
    db.session.commit()

    return jsonify({"message": "User deleted"}), 200

if __name__ == "__main__":
    with app.app_context(): # If we don't have the database then create it
        db.create_all()

    app.run(debug=True)
