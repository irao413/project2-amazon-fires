from flask import Flask, render_template, jsonify
from flask_pymongo import PyMongo

app = Flask(__name__)

# Use PyMongo to establish Mongo connection
mongo = PyMongo(app, uri="mongodb://localhost:27017/brazil_db")

# Route to render index.html template using data from Mongo
@app.route("/")

def welcome():
    return(
        f"Welcome to my home page!<br/>"
        f"Available Routes:<br/>"
        f"/get_db_data<br/>"
    )

@app.route('/get_db_data')
def get_data():
    # get_data_from_db is a custom function you write to query your database
    db = mongo.db.cattle_milk

    db_data = []
    for item in db.find():
        item.pop('_id')
        db_data.append(item)

    # return jsonify(db_data)
    return jsonify(db_data)

if __name__ == "__main__":
    app.run(debug=True)